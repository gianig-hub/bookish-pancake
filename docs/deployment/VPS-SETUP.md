# VPS Setup Guide – EK Marketplace

**Target:** Ubuntu 24.04 LTS, Docker Compose, Nginx, Node.js, PostgreSQL, Redis, UFW, Fail2ban

---

## Why This Stack

| Component | Choice | Reason |
|-----------|--------|--------|
| OS | Ubuntu 24.04 LTS | Long-term support, wide community, Docker-friendly |
| Web server | Nginx | Battle-tested reverse proxy, SSL termination, low overhead |
| Containers | Docker Compose | Dev/prod parity, easy service management, no k8s complexity at MVP |
| Runtime | Node.js 20 LTS | Matches local dev; Next.js and Express both require it |
| Database | PostgreSQL 16 | Reliable, powerful, excellent with JSON/JSONB for flexible schemas |
| Cache / Queue | Redis 7 | Session storage, BullMQ job queue, rate limiting |
| Firewall | UFW | Simple, human-readable firewall rules |
| Intrusion prevention | Fail2ban | Block brute-force SSH and HTTP attacks |

---

## Recommended Server Layout

```
/var/www/ek/          # Application files (docker-compose, configs, .env)
/etc/nginx/           # Nginx config (managed by host Nginx or Docker Nginx)
/var/backups/ek/      # Database and volume backups
/opt/ek-scripts/      # Deploy and maintenance scripts
```

---

## Suggested Subdomains

| Subdomain | Purpose |
|-----------|---------|
| `www.yourdomain.co.uk` | Public marketing site / Next.js frontend |
| `app.yourdomain.co.uk` | Authenticated marketplace app |
| `api.yourdomain.co.uk` | Express API backend |
| `cdn.yourdomain.co.uk` | Static assets / uploaded photos (Cloudflare R2 or S3) |

---

## Step-by-Step Setup

### 1. Initial Server Prep

```bash
# Update system
apt update && apt upgrade -y

# Install essentials
apt install -y curl git ufw fail2ban

# Create deploy user (avoid running as root)
adduser deploy
usermod -aG sudo deploy
# Copy your SSH key to deploy user
```

### 2. Install Docker

```bash
# Install Docker Engine
curl -fsSL https://get.docker.com | sh
usermod -aG docker deploy

# Install Docker Compose plugin (included with Docker Engine v2+)
docker compose version
```

### 3. Install Node.js (for scripts/health checks outside Docker)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version  # should be 20.x
```

### 4. Configure UFW Firewall

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

### 5. Configure Fail2ban

```bash
# Enable and start
systemctl enable fail2ban
systemctl start fail2ban

# Basic jail config at /etc/fail2ban/jail.local:
# [sshd]
# enabled = true
# maxretry = 5
# bantime = 3600
```

### 6. Set Up Nginx (host-level, for SSL termination)

```bash
apt install -y nginx certbot python3-certbot-nginx

# Copy your site config
cp infra/nginx/sites/example.conf /etc/nginx/sites-available/ekmarketplace
ln -s /etc/nginx/sites-available/ekmarketplace /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Issue SSL certificate
certbot --nginx -d www.yourdomain.co.uk -d api.yourdomain.co.uk
```

### 7. Deploy Application

```bash
# Clone repo to server
git clone https://github.com/gianig-hub/bookish-pancake.git /var/www/ek
cd /var/www/ek

# Copy and configure environment
cp .env.example .env.local
nano .env.local  # fill in production values

# Start services
docker compose up -d --build

# Verify services
docker compose ps
curl http://localhost:4000/health
```

---

## Environment Variables in Production

- Copy `.env.example` to `.env.local` and set all real values.
- Never commit `.env.local` to Git.
- Use a secrets manager (Doppler, HashiCorp Vault) in a scaled setup — TODO for Phase 4.
- Rotate `NEXTAUTH_SECRET` and `JWT_SECRET` on initial deploy.
- Use strong, unique `DB_PASSWORD`.

---

## Backups

```bash
# PostgreSQL backup (run via cron)
docker exec ek_postgres pg_dump -U ekuser ekmarketplace > /var/backups/ek/db-$(date +%Y%m%d).sql

# Compress and rotate (keep 7 days)
find /var/backups/ek/ -name "db-*.sql" -mtime +7 -delete

# TODO: add offsite backup (Backblaze B2, S3, or Hetzner Storage Box) in Phase 2
```

Add to cron (`crontab -e` as deploy user):

```cron
0 3 * * * /opt/ek-scripts/backup-db.sh
```

---

## Security Checklist

- [ ] SSH key-only login (disable password auth in `/etc/ssh/sshd_config`)
- [ ] Fail2ban enabled and monitoring SSH + Nginx
- [ ] UFW enabled; only ports 22, 80, 443 open
- [ ] `.env.local` not committed to Git
- [ ] Strong unique passwords for DB and Redis
- [ ] Nginx HTTPS only; HTTP redirects to HTTPS
- [ ] TODO: add CSP headers in Nginx or Express
- [ ] TODO: add HSTS header
- [ ] TODO: add DDoS protection (Cloudflare) post-MVP

---

## Deploy Flow (After Initial Setup)

```bash
cd /var/www/ek
git pull origin main
docker compose up -d --build
docker compose ps  # confirm all healthy
```

TODO: automate with a GitHub Actions workflow in `.github/workflows/deploy.yml`.
