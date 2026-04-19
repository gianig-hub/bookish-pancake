# VPS Setup Guide — EK Marketplace

> **Target**: Ubuntu 24.04 LTS, production deployment of EK Marketplace from bare server to live application.

---

## Table of Contents

1. [Why This Stack](#why-this-stack)
2. [Recommended Server Layout](#recommended-server-layout)
3. [Basic Deployment Flow](#basic-deployment-flow)
4. [Environment Variable Handling](#environment-variable-handling)
5. [Backup Approach](#backup-approach)
6. [Security Basics](#security-basics)
7. [Step-by-Step Setup Guide](#step-by-step-setup-guide)
8. [Environment Variables (Complete List)](#environment-variables-complete-list)
9. [Beginner-Friendly Notes](#beginner-friendly-notes)
10. [Monitoring Essentials](#monitoring-essentials)
11. [Troubleshooting Checklist](#troubleshooting-checklist)
12. [Production-Aware Best Practices](#production-aware-best-practices)
13. [Next Steps After Initial Deployment](#next-steps-after-initial-deployment)

---

## Why This Stack

### Docker Compose (Over Manual Installation)

- **Reason**: Reproducible across dev/staging/production
- **Benefit**: "Works on my machine" → works on VPS
- **Time**: Setup takes hours, not days
- **Scaling**: Easy to adjust resources

### Nginx (Over Apache)

- **Reason**: Lightweight, fast, modern
- **Benefit**: Can handle 1000+ concurrent connections
- **Marketplace Use**: Handles file uploads, reverse proxy

### PostgreSQL (Over MySQL)

- **Reason**: Better for complex queries (search, filtering)
- **Benefit**: Full-text search, JSON fields, better ACID compliance
- **Marketplace Use**: Listings, users, transactions need reliability

### Redis (Over Nothing)

- **Reason**: Needed for caching and job queues
- **Benefit**: Reduces database load, enables background jobs
- **Marketplace Use**: Job queue for emails, notifications, AI processing

### UFW + Fail2ban (Over Nothing)

- **Reason**: DDoS and brute-force protection
- **Benefit**: Reduces security incidents significantly
- **Marketplace Use**: Attackers target marketplaces; need protection

---

## Recommended Server Layout

### Minimum Production Server

| Resource   | Minimum | Recommended |
|------------|---------|-------------|
| CPU        | 2 cores | 4 cores     |
| RAM        | 4 GB    | 8 GB        |
| Storage    | 20 GB   | 100 GB SSD  |
| Bandwidth  | 2 TB/mo | 5 TB/mo     |
| Cost       | ~£8/mo  | ~£15–25/mo  |

> **Providers**: DigitalOcean, Linode, AWS Lightsail, Vultr

### Folder Structure on Server

```
/home/deploy/
├── ekmarket/                    # Application directory
│   ├── docker-compose.prod.yml
│   ├── .env.production          # Secrets (never commit)
│   ├── docker/
│   │   ├── web.Dockerfile
│   │   ├── api.Dockerfile
│   │   └── worker.Dockerfile
│   └── (rest of repo cloned here)
├── backups/
│   ├── db/                      # Daily database dumps
│   └── uploads/                 # Weekly file backups
└── logs/
    └── docker/                  # Docker container logs
```

### Suggested Subdomains

| Subdomain                         | Purpose                                      |
|-----------------------------------|----------------------------------------------|
| `ekmarketplace.co.uk`             | Main marketplace (web app)                   |
| `www.ekmarketplace.co.uk`         | Alias to main                                |
| `api.ekmarketplace.co.uk`         | Backend API (internal, not exposed publicly) |
| `admin.ekmarketplace.co.uk`       | Admin dashboard (IP-restricted)              |
| `status.ekmarketplace.co.uk`      | Status page (uptime monitoring)              |

---

## Basic Deployment Flow

### Before First Deploy

1. Register domain and point DNS to VPS IP
2. Create `deploy` user on server
3. Generate SSH keys (no passwords)
4. Install Docker, Docker Compose, Nginx
5. Setup firewall (UFW)
6. Create SSL certificates (Let's Encrypt)

### Deployment Steps

1. Clone repository to `/home/deploy/ekmarket/`
2. Create `.env.production` with secrets
3. Pull latest images: `docker-compose -f docker-compose.prod.yml pull`
4. Start containers: `docker-compose -f docker-compose.prod.yml up -d`
5. Run database migrations (if needed)
6. Verify health checks passing
7. Monitor logs for errors

### Rollback (If Something Breaks)

1. Keep previous Docker images tagged
2. Stop current: `docker-compose down`
3. Change `docker-compose.prod.yml` to previous image version
4. Start previous: `docker-compose up -d`

> Rollback takes approximately 30 seconds.

---

## Environment Variable Handling

### `.env.production` (On Server Only)

- **Never** commit to Git
- Store on server at `/home/deploy/ekmarket/.env.production`
- File permissions: `chmod 600` (readable only by deploy user)
- Contains:
  - Database credentials
  - API keys (OpenAI, Stripe, etc.)
  - JWT secrets
  - Session secrets

### `docker-compose.prod.yml` (In Git)

- References `.env.production`
- Contains **no secrets**
- Can be reviewed in pull requests

### How to Update Secrets

```bash
# 1. SSH to server
ssh deploy@ekmarketplace.co.uk

# 2. Edit secrets
nano /home/deploy/ekmarket/.env.production

# 3. Restart containers
cd /home/deploy/ekmarket
docker-compose -f docker-compose.prod.yml up -d
```

---

## Backup Approach

### Database Backups

| Setting    | Value                           |
|------------|---------------------------------|
| Frequency  | Daily at 2 AM UTC               |
| Location   | `/home/deploy/backups/db/`      |
| Retention  | 30 daily backups (rolling)      |
| Automation | Cron job                        |
| Size       | ~100 MB–1 GB per backup         |

### File Backups (Uploads)

| Setting    | Value                              |
|------------|------------------------------------|
| Frequency  | Weekly on Sunday                   |
| Location   | `/home/deploy/backups/uploads/`    |
| Retention  | 12 weekly backups                  |
| Automation | Cron job                           |

### Example Cron Jobs

```bash
# Edit crontab for deploy user
crontab -e

# Daily database backup at 2 AM UTC
0 2 * * * docker exec ekmarket_db pg_dump -U ekuser -F c ekmarket > /home/deploy/backups/db/ekmarket_$(date +\%Y-\%m-\%d).dump

# Remove backups older than 30 days
30 2 * * * find /home/deploy/backups/db/ -name "*.dump" -mtime +30 -delete

# Weekly uploads backup on Sunday at 3 AM UTC
0 3 * * 0 tar -czf /home/deploy/backups/uploads/uploads_$(date +\%Y-\%m-\%d).tar.gz /var/lib/ekmarket/uploads

# Remove upload backups older than 12 weeks
30 3 * * 0 find /home/deploy/backups/uploads/ -name "*.tar.gz" -mtime +84 -delete
```

### Restore Procedure

```bash
# List available backups
ls -lah /home/deploy/backups/db/

# Restore specific backup
docker exec ekmarket_db pg_restore -U ekuser -d ekmarket /backups/db/ekmarket_YYYY-MM-DD.dump
```

### Off-Site Backup (Recommended)

- Use S3 (AWS) or Backblaze B2 for off-site copies
- Script: Sync backups to cloud weekly
- Cost: ~£1–2/month
- Protects against complete server loss

---

## Security Basics

### Access Control

| Area        | Setting                                         |
|-------------|-------------------------------------------------|
| SSH         | Keys only (passwords disabled)                  |
| Firewall    | Only ports 22, 80, 443 open externally          |
| Fail2ban    | Blocks 5+ failed logins within 10 minutes       |
| Admin panel | IP-restricted (only your office/known IPs)      |

### Data Protection

- **Database**: Password-protected user with limited permissions (not superuser)
- **API**: Rate limiting (100 requests/minute per IP)
- **Passwords**: Never logged, hashed with bcrypt
- **Secrets**: In `.env` file, never baked into Docker images

### Monitoring

- **Uptime**: Monitor with external service (check service is reachable)
- **Logs**: Review for errors daily
- **Disk space**: Alert if >80% full
- **CPU/RAM**: Monitor if approaching server limits

### SSL/TLS Certificates

- Use Let's Encrypt (free, auto-renewing)
- Auto-renew via systemd timer
- Certificates valid for 90 days; renewed automatically before expiry

---

## Step-by-Step Setup Guide

### Step 1: Server Preparation (~30 minutes)

```bash
# Connect to server as root
ssh root@YOUR_VPS_IP

# Update system packages
apt update && apt upgrade -y

# Create deploy user
adduser deploy
usermod -aG sudo deploy

# Disable root SSH login (after confirming deploy user works)
# Edit /etc/ssh/sshd_config:
# PermitRootLogin no
# PasswordAuthentication no
sudo systemctl reload ssh
```

### Step 2: Install Docker (~20 minutes)

```bash
# Install Docker using official script
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add deploy user to docker group
sudo usermod -aG docker deploy

# Enable Docker to start on boot
sudo systemctl enable docker

# Verify installation
docker --version
docker compose version
```

### Step 3: Install Nginx (~10 minutes)

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Verify
sudo systemctl status nginx
```

### Step 4: Install PostgreSQL Client (~5 minutes)

```bash
# Only client tools needed (database runs in Docker)
sudo apt install -y postgresql-client
```

### Step 5: Clone Repository (~5 minutes)

```bash
# Switch to deploy user
su - deploy

# Clone repository
cd /home/deploy
git clone https://github.com/gianig-hub/bookish-pancake.git ekmarket
cd ekmarket
```

### Step 6: Create `.env.production` (~10 minutes)

```bash
# Copy the example file
cp .env.example .env.production

# Edit with your secrets
nano .env.production

# Restrict permissions
chmod 600 .env.production
```

> Fill in all required values. See [Environment Variables (Complete List)](#environment-variables-complete-list) below.

### Step 7: Start Services (~5 minutes)

```bash
cd /home/deploy/ekmarket

# Start all containers in background
docker-compose -f docker-compose.prod.yml up -d

# Watch logs for startup errors
docker-compose -f docker-compose.prod.yml logs -f
```

> Press `Ctrl+C` to stop following logs. Containers keep running.

### Step 8: Setup Nginx (~15 minutes)

Create a reverse proxy config at `/etc/nginx/sites-available/ekmarketplace`:

```nginx
server {
    listen 80;
    server_name ekmarketplace.co.uk www.ekmarketplace.co.uk;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name ekmarketplace.co.uk www.ekmarketplace.co.uk;

    ssl_certificate /etc/letsencrypt/live/ekmarketplace.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ekmarketplace.co.uk/privkey.pem;

    # Proxy to Next.js web container
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File upload size limit
    client_max_body_size 10M;
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ekmarketplace /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

**Issue SSL certificate:**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ekmarketplace.co.uk -d www.ekmarketplace.co.uk
```

### Step 9: Setup Firewall (~10 minutes)

```bash
# Install UFW
sudo apt install -y ufw

# Set default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow required ports
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS

# Enable firewall
sudo ufw enable

# Verify rules
sudo ufw status verbose
```

**Install Fail2ban:**

```bash
sudo apt install -y fail2ban

# Create local config (overrides defaults without modifying originals)
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Enable SSH protection (already on by default)
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status sshd
```

### Step 10: Test Everything (~20 minutes)

```bash
# Check all containers are running
docker ps

# Check container logs
docker logs ekmarket_web
docker logs ekmarket_api
docker logs ekmarket_db

# Test site loads
curl -I https://ekmarketplace.co.uk
```

Manual checks:
- Visit `https://ekmarketplace.co.uk` in browser
- Sign up as a new user
- Post a test listing
- Check admin panel (`https://admin.ekmarketplace.co.uk`)
- Review logs for any errors

---

## Environment Variables (Complete List)

```bash
# ─── Database ────────────────────────────────────────────────
DATABASE_URL=postgresql://ekuser:PASSWORD@db:5432/ekmarket
REDIS_URL=redis://redis:6379

# ─── Application ─────────────────────────────────────────────
NODE_ENV=production
NEXTAUTH_URL=https://ekmarketplace.co.uk
NEXTAUTH_SECRET=                  # generate: openssl rand -base64 32

# ─── File Upload ─────────────────────────────────────────────
UPLOAD_DIR=/var/lib/ekmarket/uploads
MAX_FILE_SIZE=5242880             # 5 MB in bytes

# ─── API ─────────────────────────────────────────────────────
API_PORT=4000
API_HOST=0.0.0.0

# ─── Email (SendGrid or similar) ─────────────────────────────
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=noreply@ekmarketplace.co.uk

# ─── Payments (Stripe) ───────────────────────────────────────
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# ─── AI (OpenAI) ─────────────────────────────────────────────
OPENAI_API_KEY=

# ─── Monitoring (optional) ───────────────────────────────────
SENTRY_DSN=                       # error tracking
```

> **Security**: Set `chmod 600 .env.production`. Never commit this file. Never share its contents in logs, PRs, or Slack.

---

## Beginner-Friendly Notes

### If Docker Compose Won't Start

- Check: `docker ps` — list running containers
- Check: `docker logs ekmarket_web` — see error messages
- Fix: Most errors are caused by missing or incorrect environment variables
- **Don't**: Restart the server — it's rarely the solution

### If Database Connection Fails

- Check: `docker exec ekmarket_db psql -U ekuser -l` — list databases
- Check: `DATABASE_URL` format is correct (host should be `db`, not `localhost`)
- Check: PostgreSQL container is running: `docker ps | grep postgres`
- **Don't**: Restart the database unless it's a last resort (you may lose in-progress transactions)

### If Nginx Shows 502 Bad Gateway

- Check: API container is running: `docker ps | grep api`
- Check: Nginx config `proxy_pass` points to the correct port
- Check: API logs: `docker logs ekmarket_api`
- Restart Nginx: `sudo systemctl restart nginx`

### If SSL Certificate Won't Issue

- Check: Domain DNS points to VPS IP (`dig ekmarketplace.co.uk`)
- Check: Firewall allows port 80 (Let's Encrypt requires it for validation)
- Check: Certbot logs: `sudo cat /var/log/letsencrypt/letsencrypt.log`
- Wait: DNS propagation can take up to 24 hours after pointing records

### If Running Out of Disk Space

- Check: `df -h` — overall disk usage
- Check: `du -sh /home/deploy/ekmarket/*` — where space is used
- Cleanup Docker images: `docker image prune -a`
- Cleanup Docker system: `docker system prune`
- Review old backups: `ls -lah /home/deploy/backups/db/`

---

## Monitoring Essentials

### Daily Checks

```bash
docker ps                          # All containers running?
docker logs ekmarket_web --tail 50 # Recent errors?
df -h                              # Disk space OK?
```

- Manually verify website loads correctly

### Weekly Checks

```bash
ls -la /home/deploy/backups/db/    # Backup exists?
docker-compose -f docker-compose.prod.yml logs --tail 200  # Any patterns?
```

- Confirm logs are rotating properly
- Check no disk warnings
- Test backup restore procedure

### Monthly Checks

```bash
# Review error logs for patterns
sudo tail -100 /var/log/auth.log

# Update Docker images
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Update Ubuntu packages
sudo apt update && sudo apt upgrade -y
```

---

## Troubleshooting Checklist

| Problem | First Check | Solution |
|---------|-------------|----------|
| Website won't load | Is Docker running? | `docker ps` — if not, `docker-compose up -d` |
| Slow responses | Is Redis running? | `docker ps \| grep redis` |
| Database errors | Is database running? | `docker ps \| grep postgres` |
| Can't upload files | Does upload directory exist? | `mkdir -p /var/lib/ekmarket/uploads` |
| SSL cert expired | Check certificate date | `sudo certbot renew` |
| Firewall blocking traffic | UFW rules correct? | `sudo ufw status` |
| Out of memory | RAM usage high? | `free -h` — may need to upgrade server plan |
| Disk full | What's using space? | `df -h` — check Docker images, old backups |

---

## Production-Aware Best Practices

1. **Never SSH as root** — Use the `deploy` user
2. **Always backup before changes** — Especially before database migrations
3. **Monitor everything** — Disk, CPU, RAM, application errors
4. **Keep logs** — Review weekly for recurring patterns
5. **Test restores** — Ensure backups actually work before you need them
6. **Update regularly** — Apply security updates promptly
7. **Use strong passwords** — For the `deploy` user and database
8. **Document changes** — Write down what you changed and why
9. **Have a runbook** — Keep this guide accessible; refer to it often
10. **Ask for help** — If unsure, test in staging before touching production

---

## Next Steps After Initial Deployment

1. **Monitor for 24 hours** — Watch logs, verify uptime
2. **Load test** — Post 100+ listings, check performance under load
3. **Test payment processing** — Use Stripe test mode to verify checkout
4. **Test backup restore** — Restore a database backup to confirm it works end-to-end
5. **Setup email alerts** — Get notified if a container stops or disk fills up
6. **Scale if needed** — Increase CPU/RAM if performance degrades
7. **Add CDN** — Offload static assets (optional, Phase 2+)
8. **Enable error tracking** — Configure Sentry for real-time error visibility

---

> **Related Documentation**:
> - [`docs/deployment/`](.) — Deployment guides
> - [`docs/ai/AI-PLACEMENT-MAP.md`](../ai/AI-PLACEMENT-MAP.md) — AI module placement
> - [`ROADMAP.md`](../../ROADMAP.md) — Project roadmap
> - [`README.md`](../../README.md) — Project overview
