# VPS Setup Guide — EK Marketplace

Target environment: **Ubuntu 24.04 LTS** on a VPS (OVH, Hetzner, DigitalOcean, or equivalent).

This guide is written for developers who are comfortable with Linux basics. It covers the recommended server setup from a fresh VPS to a running Docker-based deployment.

---

## Why This Stack?

| Component | Reason |
|---|---|
| **Ubuntu 24.04 LTS** | Long-term support, wide compatibility, familiar for most developers |
| **Nginx** | Battle-tested reverse proxy, handles SSL termination, security headers, load distribution |
| **Docker Compose** | Consistent environments, easy to replicate, no "works on my machine" problems |
| **PostgreSQL** | Reliable relational database, strong JSON support, excellent ecosystem |
| **Redis** | Fast in-memory store for queues (BullMQ), sessions, and rate limiting |
| **UFW** | Simple, effective firewall for Ubuntu |
| **Fail2ban** | Protects against brute-force attacks on SSH and web services |
| **Node.js** | Consistent runtime for all three apps (web, api, worker) |

This stack is intentionally simple. It runs on a single VPS for MVP. Scaling options (load balancer, managed DB, CDN) come later.

---

## Recommended Server Layout

### Minimum Spec (MVP / Early Launch)
- 4 vCPU
- 8 GB RAM
- 80 GB SSD
- 1 Gbps network

### Recommended Spec (Post-Launch)
- 8 vCPU
- 16 GB RAM
- 160 GB SSD
- Nightly backup enabled

### Directory Layout on Server

```
/opt/ekmarketplace/
├── .env.production        # Production environment variables (not in git)
├── docker-compose.yml     # Deployed compose file
├── infra/
│   └── nginx/             # Nginx config files
└── backups/               # Database and file backups
```

---

## Suggested Subdomains

| Subdomain | Purpose |
|---|---|
| `www.koldmarket.co.uk` | Main public website (Next.js) |
| `app.koldmarket.co.uk` | Account / dashboard area (can be same app) |
| `api.koldmarket.co.uk` | REST API (Express) |

All subdomains are handled by Nginx. SSL is managed by Certbot (Let's Encrypt).

---

## Basic Deployment Flow

### 1. Provision the Server

- Create a VPS with Ubuntu 24.04 LTS
- Set up SSH key authentication
- Disable password login in `/etc/ssh/sshd_config`

### 2. Initial Server Setup

```bash
# Update packages
apt update && apt upgrade -y

# Install essentials
apt install -y curl git unzip ufw fail2ban

# Create a non-root deploy user
adduser deploy
usermod -aG sudo deploy
```

### 3. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Add deploy user to docker group
usermod -aG docker deploy

# Install Docker Compose plugin
apt install -y docker-compose-plugin
```

### 4. Configure UFW Firewall

```bash
# Allow SSH (always do this first to avoid locking yourself out)
ufw allow OpenSSH

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check status
ufw status verbose
```

### 5. Install Nginx (on host, not in Docker)

For production, run Nginx directly on the host (not in Docker) so SSL certificates can be managed easily.

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

### 6. Set Up SSL with Certbot

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificates for your domains
certbot --nginx -d koldmarket.co.uk -d www.koldmarket.co.uk -d api.koldmarket.co.uk

# Certbot auto-renews via cron — verify it is set up
certbot renew --dry-run
```

### 7. Configure Nginx

Copy the Nginx config files from `infra/nginx/` to `/etc/nginx/`:

```bash
cp infra/nginx/nginx.conf /etc/nginx/nginx.conf
cp infra/nginx/koldmarket.conf /etc/nginx/conf.d/koldmarket.conf
nginx -t && systemctl reload nginx
```

### 8. Configure Fail2ban

```bash
# Copy default jail config
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# Edit jail.local to set:
#   bantime = 3600
#   maxretry = 5
# under [sshd] and [nginx-http-auth]

systemctl enable fail2ban
systemctl start fail2ban
```

### 9. Deploy the Application

```bash
# As deploy user
cd /opt/ekmarketplace

# Clone repository (or pull latest)
git pull origin main

# Copy and configure production environment
cp .env.example .env.production
# Edit .env.production with real values — NEVER commit this file

# Start all services
docker compose -f docker-compose.yml --env-file .env.production up -d

# Check status
docker compose ps
docker compose logs -f
```

---

## Environment Variable Handling

- Production variables are stored in `.env.production` on the server — never in git.
- Use a password manager (Bitwarden, 1Password) to store production secrets.
- The deploy user should have read access to `.env.production` only.
- Rotate secrets if there is any suspicion of compromise.

```bash
# Permissions for .env.production
chown deploy:deploy /opt/ekmarketplace/.env.production
chmod 600 /opt/ekmarketplace/.env.production
```

---

## Backup Approach

### Database Backups

```bash
# Create a daily backup script at /opt/ekmarketplace/backups/backup.sh
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
docker exec ek_postgres pg_dump -U ekuser ekmarketplace \
  > /opt/ekmarketplace/backups/db_$TIMESTAMP.sql
# Keep last 14 days of backups
find /opt/ekmarketplace/backups/ -name "db_*.sql" -mtime +14 -delete
```

```bash
# Add to crontab (runs daily at 2am)
crontab -e
0 2 * * * /opt/ekmarketplace/backups/backup.sh
```

### File/Image Backups

- Listing images should be stored in S3-compatible storage (not on the VPS).
- If using local storage temporarily, include `/opt/ekmarketplace/uploads/` in backup script.

### Off-Server Backup

- Copy database backups to a separate storage location weekly.
- Consider using `rclone` to sync to S3, B2, or another VPS.

---

## Security Basics

- **SSH**: Key-only authentication, disable root login, change default port if needed.
- **Firewall**: UFW with only ports 22, 80, 443 open.
- **Fail2ban**: Protects against brute force on SSH and Nginx.
- **HTTPS**: All traffic served over HTTPS. HTTP redirects to HTTPS.
- **Docker**: Do not expose database or Redis ports to the public internet.
- **Secrets**: Never in git. Rotated regularly. Stored in password manager.
- **Updates**: `apt upgrade` run regularly. Docker images kept up to date.

---

## Beginner-Friendly Notes

- **Always test Nginx config before reloading**: `nginx -t`
- **Check Docker logs if something is not working**: `docker compose logs <service>`
- **Database connection issues**: Make sure `DATABASE_URL` uses the service name (`postgres`), not `localhost`, inside Docker containers.
- **Port conflicts**: If port 80 or 443 is in use, check `lsof -i :80` to find what is using it.
- **SSL renewal**: Certbot sets up auto-renewal via a systemd timer. Check with `systemctl status certbot.timer`.

---

## TODO

- [ ] Add health check endpoint monitoring (e.g., UptimeRobot)
- [ ] Add log rotation for Docker container logs
- [ ] Consider managed PostgreSQL (e.g., Supabase, RDS) for production resilience
- [ ] Set up separate staging environment

---

*See `infra/nginx/` for Nginx configuration files.*
*See `docker-compose.yml` for the full service setup.*
