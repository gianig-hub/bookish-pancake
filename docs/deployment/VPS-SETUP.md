# EK Marketplace — VPS Setup Guide

**docs/deployment/VPS-SETUP.md**

---

## Why This Stack

| Component | Why |
|-----------|-----|
| **Ubuntu 24.04 LTS** | Latest stable LTS release, wide hosting support, long support window |
| **Docker Compose** | Simple multi-service orchestration without Kubernetes complexity |
| **Nginx** | Battle-tested reverse proxy, handles SSL termination, static files, and WebSockets |
| **Node.js** | Matches the TypeScript codebase — no language context switching |
| **PostgreSQL** | Reliable, feature-rich relational database — suitable for marketplace data |
| **Redis** | Fast in-memory store for sessions, caching, job queue (BullMQ) |
| **UFW** | Simple, Ubuntu-native firewall |
| **Fail2ban** | Protects against brute force attacks with automatic IP blocking |

This stack runs comfortably on a **4 vCPU / 8 GB RAM VPS** (e.g. OVH, Hetzner, Contabo) and scales vertically before requiring distributed architecture.

---

## Recommended Server Layout

```
/var/www/ekmarketplace/     ← Application root
  .env                      ← Production environment variables (never commit)
  docker-compose.yml        ← Docker Compose config
  infra/nginx/              ← Nginx config (mounted into nginx container)

/var/backups/ekmarketplace/ ← Automated backup storage
```

---

## Suggested Subdomains

| Subdomain | Purpose |
|-----------|---------|
| `www.ekmarketplace.co.uk` | Main public marketplace (Next.js) |
| `app.ekmarketplace.co.uk` | Marketplace app (alternative or future SPA route) |
| `api.ekmarketplace.co.uk` | REST API (Express) |
| `status.ekmarketplace.co.uk` | Status page (TODO: add uptime monitor) |

> Point all subdomains to the same VPS IP. Nginx handles routing by subdomain.

---

## Basic Deployment Flow

### 1. Initial Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Install Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
```

### 2. Firewall Setup (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

### 3. Fail2ban Setup

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
# Default config protects SSH. Customise /etc/fail2ban/jail.local as needed.
```

### 4. Clone Repository

```bash
cd /var/www
git clone https://github.com/gianig-hub/bookish-pancake.git ekmarketplace
cd ekmarketplace
cp .env.example .env
# Edit .env with production values
nano .env
```

### 5. Start Services

```bash
docker compose up -d
```

### 6. SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d www.ekmarketplace.co.uk -d api.ekmarketplace.co.uk
```

> Let's Encrypt auto-renews via a systemd timer. Verify with: `sudo certbot renew --dry-run`

---

## Environment Variable Handling

- **Never commit** `.env` to git (it's in `.gitignore`)
- Copy `.env.example` to `.env` on the server and fill in real values
- Rotate `JWT_SECRET` and `SESSION_SECRET` on first deploy
- Use a password manager to store production secrets securely
- TODO: Consider Doppler or AWS Secrets Manager for multi-team secret management

---

## Backup Approach

### Database Backups

```bash
# Automated daily PostgreSQL dump
docker exec ek-postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > \
  /var/backups/ekmarketplace/db_$(date +%Y%m%d).sql

# Keep last 30 days
find /var/backups/ekmarketplace/ -name "db_*.sql" -mtime +30 -delete
```

Add to cron:
```bash
0 2 * * * /var/www/ekmarketplace/scripts/backup-db.sh
```

### Uploaded Files

- Store user-uploaded images in object storage (S3-compatible: AWS S3, Cloudflare R2, OVH Object Storage)
- Do NOT store uploads on the VPS filesystem
- TODO: Configure `STORAGE_PROVIDER` in `.env` once file upload is implemented

---

## Security Basics

| Action | Status |
|--------|--------|
| SSH key-only login | TODO: Disable password auth in `/etc/ssh/sshd_config` |
| UFW firewall enabled | ✅ (see above) |
| Fail2ban installed | ✅ (see above) |
| Nginx security headers | ✅ (see `infra/nginx/nginx.conf`) |
| HTTPS enforced | TODO: After Certbot setup |
| `.env` not in git | ✅ (`.gitignore`) |
| Regular `apt upgrade` | TODO: Set up unattended-upgrades |
| Database not exposed externally | ✅ (Postgres only accessible inside Docker network) |
| Redis not exposed externally | ✅ (Redis only accessible inside Docker network) |

---

## Beginner Notes

- Run all Docker commands from `/var/www/ekmarketplace/`
- Use `docker compose logs -f api` to tail API logs
- Use `docker compose ps` to see service status
- Use `docker compose restart api` to restart a specific service
- Use `docker exec -it ek-postgres psql -U postgres` to access the database

---

## TODOs

- [ ] Set up automated daily DB backups + cron job
- [ ] Configure unattended-upgrades for security patches
- [ ] Set up uptime monitoring (Better Uptime, UptimeRobot)
- [ ] Configure object storage for file uploads
- [ ] Set up error monitoring (Sentry)
- [ ] Set up log aggregation (Logtail, Papertrail, or self-hosted ELK)
- [ ] Document rollback procedure
