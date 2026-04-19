# VPS Setup Guide — EK Marketplace

> Target environment: Ubuntu 24.04 LTS, Docker Compose, Nginx, Node.js, PostgreSQL, Redis, UFW, Fail2ban.
>
> This guide sets up a production-grade VPS for a Docker-based marketplace application.

---

## Why This Stack

| Component | Reason |
|-----------|--------|
| **Ubuntu 24.04 LTS** | Long-term support (5 years), widely supported, stable |
| **Docker Compose** | Consistent environment from dev to production, easy rollbacks |
| **Nginx** | High-performance reverse proxy, SSL termination, static file serving |
| **PostgreSQL 16** | Reliable relational database; excellent for marketplace/classifieds data |
| **Redis 7** | Fast in-memory store for queues (BullMQ), caching, rate limiting |
| **UFW** | Simple, effective firewall for Ubuntu |
| **Fail2ban** | Blocks repeated failed login attempts and brute-force attacks |
| **Backups** | Automated daily database + volume backups to off-server storage |

---

## Recommended Server Layout

### Minimum Viable Production VPS

| Spec | Recommendation |
|------|---------------|
| CPU | 2 vCPUs |
| RAM | 4 GB |
| Disk | 50 GB SSD |
| OS | Ubuntu 24.04 LTS |
| Provider | OVH, Hetzner, DigitalOcean, Linode |

> Scale to 4 vCPU / 8 GB RAM once traffic grows. The Docker-based setup scales horizontally by adding nodes or vertically by upgrading the VPS.

### Directory Layout on Server

```
/srv/ekmarketplace/
├── docker-compose.yml      # Production compose file
├── .env                    # Production environment file (not in git)
├── infra/nginx/            # Nginx config (synced from repo)
└── backups/                # Local backup staging area
```

---

## Suggested Subdomains

| Subdomain | Purpose |
|-----------|---------|
| `www.ekmarketplace.co.uk` | Main public site (Next.js web app) |
| `app.ekmarketplace.co.uk` | Authenticated account area (optional — can be same as www) |
| `api.ekmarketplace.co.uk` | API backend (not publicly browseable) |
| `admin.ekmarketplace.co.uk` | Admin panel (IP-restricted in Nginx) |

> Replace `ekmarketplace.co.uk` with your actual domain throughout.

---

## Initial Server Setup

### 1. Update the System

```bash
apt update && apt upgrade -y
apt install -y curl git ufw fail2ban htop unzip
```

### 2. Create a Deploy User

```bash
adduser deploy
usermod -aG sudo deploy
# Copy your SSH key to the new user
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
```

### 3. Disable Root SSH Login

Edit `/etc/ssh/sshd_config`:

```
PermitRootLogin no
PasswordAuthentication no
```

```bash
systemctl restart ssh
```

### 4. Configure UFW Firewall

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
ufw status
```

> If your provider has a separate firewall panel (e.g. OVH security groups), configure it there too.

### 5. Configure Fail2ban

Default Fail2ban config protects SSH automatically after installation:

```bash
systemctl enable fail2ban
systemctl start fail2ban
fail2ban-client status sshd
```

To add Nginx protection, create `/etc/fail2ban/jail.local`:

```ini
[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true
```

```bash
systemctl restart fail2ban
```

---

## Install Docker and Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy

# Verify
docker --version
docker compose version
```

> Log out and back in as `deploy` after adding to the docker group.

---

## Install Nginx (Host-Level)

Nginx runs on the host and proxies to Docker containers. This allows proper SSL termination and flexible routing.

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

---

## SSL Certificates (Let's Encrypt)

```bash
apt install -y certbot python3-certbot-nginx

# Issue certificates for all subdomains
certbot --nginx -d ekmarketplace.co.uk -d www.ekmarketplace.co.uk -d api.ekmarketplace.co.uk

# Test auto-renewal
certbot renew --dry-run
```

---

## Deploy the Application

### 1. Clone the Repository

```bash
sudo -u deploy bash
cd /srv
git clone https://github.com/gianig-hub/bookish-pancake.git ekmarketplace
cd ekmarketplace
```

### 2. Configure Environment

```bash
cp .env.example .env
nano .env
# Set all required production values — see .env.example for groups
# IMPORTANT: Use strong, unique secrets for NEXTAUTH_SECRET and JWT_SECRET
```

### 3. Copy Nginx Config

```bash
cp infra/nginx/nginx.conf /etc/nginx/nginx.conf
cp infra/nginx/sites/example.conf /etc/nginx/sites-available/ekmarketplace.conf
ln -s /etc/nginx/sites-available/ekmarketplace.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 4. Start Services

```bash
docker compose up -d
docker compose ps       # Verify all containers are running
docker compose logs -f  # Tail logs
```

### 5. Run Database Migrations

```bash
# TODO: Run Prisma migrations once schema is defined
docker compose exec api npx prisma migrate deploy
```

---

## Environment Variable Handling

- **Never commit `.env` to git** — it contains production secrets
- Store a master copy in a password manager (e.g. 1Password, Bitwarden)
- For team use, consider HashiCorp Vault or GitHub Actions secrets
- Rotate secrets regularly (at minimum: `NEXTAUTH_SECRET`, `JWT_SECRET`, `STRIPE_SECRET_KEY`)
- Use separate `.env` files for staging and production environments

### Required Production Values to Set

| Variable | Notes |
|----------|-------|
| `DATABASE_URL` | Use a strong password, not the dev default |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| `JWT_SECRET` | Generate: `openssl rand -base64 32` |
| `OPENAI_API_KEY` | Only required if `FEATURE_AI_ENABLED=true` |
| `STRIPE_SECRET_KEY` | Only required if `FEATURE_PAYMENTS_ENABLED=true` |
| `SMTP_*` | Use a transactional email provider (Postmark, Resend, SES) |

---

## Backup Approach

### Database Backups

Create a daily cron job to dump and upload the database:

```bash
# /srv/ekmarketplace/scripts/backup-db.sh
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/srv/ekmarketplace/backups
mkdir -p "$BACKUP_DIR"

docker compose exec -T postgres pg_dump -U ekuser ekmarketplace \
  | gzip > "$BACKUP_DIR/ekmarketplace_$TIMESTAMP.sql.gz"

# Keep only the last 14 days locally
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +14 -delete

# TODO: Upload to off-server storage (S3/R2/Backblaze)
# aws s3 cp "$BACKUP_DIR/ekmarketplace_$TIMESTAMP.sql.gz" s3://your-backup-bucket/db/
```

```bash
chmod +x /srv/ekmarketplace/scripts/backup-db.sh
# Add to cron (runs daily at 2 AM)
crontab -e
# 0 2 * * * /srv/ekmarketplace/scripts/backup-db.sh >> /var/log/ekmarketplace-backup.log 2>&1
```

### Volume Backups

```bash
# Back up uploaded files (adjust path if using cloud storage)
# TODO: Automate volume backup for api_uploads volume
docker run --rm -v ekmarketplace_api_uploads:/data -v /srv/ekmarketplace/backups:/backup \
  alpine tar czf /backup/uploads_$(date +%Y%m%d).tar.gz /data
```

---

## Security Basics

### Nginx Security Headers

The Nginx config in `infra/nginx/nginx.conf` includes:

- `X-Frame-Options: SAMEORIGIN` — prevent clickjacking
- `X-Content-Type-Options: nosniff` — prevent MIME sniffing
- `X-XSS-Protection: 1; mode=block` — basic XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` — TODO: configure per-app

### Rate Limiting (API)

- Rate limiting is handled in `apps/api` middleware (Zod + express-rate-limit)
- Nginx also applies connection limits — see `infra/nginx/nginx.conf`

### Docker Container Security

- Containers run as non-root users where possible
- No `--privileged` containers
- Volumes are mounted read-only where write access is not needed

### Monitoring

- Check `docker compose logs` regularly
- Set up uptime monitoring (UptimeRobot free tier covers basic checks)
- TODO: Add Prometheus + Grafana in Phase 4

---

## Updating the Application

```bash
cd /srv/ekmarketplace
git pull origin main
docker compose build --no-cache
docker compose up -d
docker compose exec api npx prisma migrate deploy  # if schema changed
```

> For zero-downtime deployments in Phase 4, consider adding a blue/green deployment approach.

---

## Beginner Notes

- **If a container won't start:** Check `docker compose logs <service-name>` — the error is almost always in the logs
- **If Nginx returns 502:** The container it's proxying to is not running or not on the right port — check `docker compose ps`
- **If the database is missing data after restart:** Check that `postgres_data` volume is mounted correctly in `docker-compose.yml`
- **If you get permission errors:** Make sure the `deploy` user is in the `docker` group and you've logged out/in after adding it
- **SSL not renewing:** Run `certbot renew --dry-run` to debug; check that ports 80/443 are open in UFW
