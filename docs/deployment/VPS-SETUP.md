# VPS Setup — EK Marketplace

> **Target:** Ubuntu 24.04 LTS, single VPS (OVH or Hetzner recommended)
> **Stack:** Nginx, Docker Compose, Node.js, PostgreSQL, Redis, UFW, Fail2ban

---

## Why This Stack

| Component      | Reason                                                         |
| -------------- | -------------------------------------------------------------- |
| Ubuntu 24.04   | LTS, stable, widely supported, good Docker support            |
| Docker Compose | Reproducible local + prod environment, easy service management |
| Nginx          | Battle-tested reverse proxy, SSL termination, static serving  |
| Node.js        | Matches the TypeScript codebase (Next.js + Express)            |
| PostgreSQL 16  | Reliable, feature-rich relational DB for marketplace data      |
| Redis 7        | Sessions, caching, queue broker (BullMQ)                       |
| UFW            | Simple firewall — blocks everything except 80, 443, 22        |
| Fail2ban       | Protects SSH and web apps from brute-force attempts            |

---

## Recommended Server Layout

Minimum spec for MVP:
- **2 vCPU, 4GB RAM, 80GB SSD** (Hetzner CX22 or OVH VPS Value)

Upgrade to **4 vCPU, 8GB RAM** when traffic grows or AI features are added.

```
/home/deploy/
  ek-marketplace/          ← cloned repo
    apps/web/
    apps/api/
    apps/worker/
    infra/nginx/
    docker-compose.prod.yml
    .env                   ← production env (never in git)
```

---

## Suggested Subdomains

| Subdomain             | Points to    |
| --------------------- | ------------ |
| `ekmarketplace.co.uk` | Nginx → web  |
| `www.ekmarketplace.co.uk` | Nginx → web |
| `api.ekmarketplace.co.uk` | Nginx → api |
| `app.ekmarketplace.co.uk` | Nginx → web (optional — for app vs marketing split) |

SSL via **Let's Encrypt** (Certbot).

---

## Basic Deployment Flow

### 1. Initial server setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose plugin
sudo apt install docker-compose-plugin -y

# Install Nginx (on host, for SSL termination)
sudo apt install nginx -y

# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Install Fail2ban
sudo apt install fail2ban -y

# Enable UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 2. Clone and configure

```bash
git clone https://github.com/gianig-hub/bookish-pancake /home/deploy/ek-marketplace
cd /home/deploy/ek-marketplace
cp .env.example .env
nano .env  # Fill in real values
```

### 3. SSL certificates

```bash
sudo certbot --nginx -d ekmarketplace.co.uk -d www.ekmarketplace.co.uk -d api.ekmarketplace.co.uk
```

### 4. Start services

```bash
docker compose -f docker-compose.yml up -d
```

---

## Environment Variable Handling

- Copy `.env.example` to `.env` on the server
- Fill in all real values (DB password, session secret, API keys)
- **Never commit `.env` to git** — `.gitignore` already excludes it
- Rotate secrets if they are ever exposed

```bash
# Generate a strong random secret:
openssl rand -base64 32
```

---

## Backups

### Database backup (PostgreSQL)

```bash
# Manual backup
docker exec ek-postgres pg_dump -U ekuser ekdb > backup_$(date +%Y%m%d).sql

# TODO: Set up automated daily backups with cron + offsite storage (S3, Backblaze B2)
```

### Files backup

- Uploaded images should be stored in S3 or Cloudflare R2 (not on the VPS)
- The VPS should be treated as stateless for media

---

## Security Basics

1. **SSH key only** — disable password SSH login in `/etc/ssh/sshd_config`: `PasswordAuthentication no`
2. **Non-root user** — run deploy user without sudo in production
3. **UFW** — only expose ports 22, 80, 443
4. **Fail2ban** — default SSH jail is good. Add nginx jail for rate-limit abuse
5. **HTTPS only** — Certbot auto-renews. Add HTTP→HTTPS redirect in Nginx
6. **Database not exposed** — PostgreSQL runs inside Docker network only (no port 5432 open on host)
7. **Redis not exposed** — Redis runs inside Docker network only (no port 6379 open on host)

---

## Nginx Config Location

Production Nginx config should be at `/etc/nginx/sites-available/ekmarketplace`.
Starter configs are in `infra/nginx/` in this repo.

---

## TODO

- [ ] Create `docker-compose.prod.yml` with production-specific settings
- [ ] Set up automated DB backups to offsite storage
- [ ] Set up monitoring (Uptime Robot or similar)
- [ ] Add log aggregation (Loki + Grafana, or a hosted service)
- [ ] Set up a staging environment
- [ ] Document rollback procedure
