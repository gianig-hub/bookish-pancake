# EK Marketplace — VPS Setup Guide

This guide covers setting up an OVH VPS running Ubuntu 24.04 to host EK Marketplace.

---

## Server Specification (Minimum Recommended)

| Item | Minimum | Recommended |
|------|---------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 4 GB | 8 GB |
| Storage | 80 GB SSD | 160 GB SSD |
| OS | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS |
| Provider | OVH VPS | OVH VPS |

---

## 1. Initial Server Setup

### 1.1 Connect via SSH

```bash
ssh root@YOUR_SERVER_IP
```

### 1.2 Update System

```bash
apt update && apt upgrade -y
apt install -y curl wget git unzip ufw fail2ban
```

### 1.3 Create a Deploy User

```bash
adduser deploy
usermod -aG sudo deploy

# Copy SSH key to deploy user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

### 1.4 Harden SSH

Edit `/etc/ssh/sshd_config`:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

```bash
systemctl restart sshd
```

---

## 2. Firewall Setup

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

---

## 3. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Add deploy user to docker group
usermod -aG docker deploy

# Enable Docker on boot
systemctl enable docker
systemctl start docker

# Install Docker Compose
apt install -y docker-compose-plugin
docker compose version
```

---

## 4. Install Nginx

```bash
apt install -y nginx
systemctl enable nginx
systemctl start nginx
```

---

## 5. Clone the Repository

Switch to deploy user:

```bash
su - deploy
```

Set up SSH key for GitHub:

```bash
ssh-keygen -t ed25519 -C "deploy@yourserver"
cat ~/.ssh/id_ed25519.pub
# Add this key to GitHub repository → Settings → Deploy Keys
```

Clone the repo:

```bash
cd /srv
git clone git@github.com:gianig-hub/bookish-pancake.git ek-marketplace
cd ek-marketplace
```

---

## 6. Configure Environment

```bash
cp .env.example .env.production
nano .env.production
```

Fill in all required values. Key variables to update:
- `DATABASE_URL` — use Docker service name: `postgresql://user:pass@postgres:5432/ekmarketplace`
- `REDIS_URL` — `redis://redis:6379`
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `https://www.koldmarket.co.uk`
- `API_BASE_URL` — `https://api.koldmarket.co.uk`
- `STRIPE_SECRET_KEY` — from Stripe dashboard
- All email credentials

---

## 7. Set Up Nginx

Copy Nginx configuration files:

```bash
sudo cp /srv/ek-marketplace/infra/nginx/nginx.conf /etc/nginx/nginx.conf
sudo cp /srv/ek-marketplace/infra/nginx/conf.d/koldmarket.conf /etc/nginx/conf.d/koldmarket.conf
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. Set Up SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificates
sudo certbot --nginx -d koldmarket.co.uk -d www.koldmarket.co.uk -d app.koldmarket.co.uk -d api.koldmarket.co.uk

# Auto-renew (add to cron)
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

After running certbot, update `koldmarket.conf` to enable the SSL server blocks (commented out by default).

---

## 9. Start the Application

```bash
cd /srv/ek-marketplace

# Start all services
docker compose -f docker-compose.yml --env-file .env.production up -d

# Check all containers are running
docker compose ps

# Check logs
docker compose logs -f
```

---

## 10. DNS Configuration

In your domain registrar / DNS provider, point all subdomains to your VPS IP:

| Record | Type | Value |
|--------|------|-------|
| `@` | A | `YOUR_VPS_IP` |
| `www` | A | `YOUR_VPS_IP` |
| `app` | A | `YOUR_VPS_IP` |
| `api` | A | `YOUR_VPS_IP` |

---

## 11. Database Migrations

```bash
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed
```

---

## 12. Monitoring & Maintenance

### Check Application Health

```bash
# Container status
docker compose ps

# API health check
curl https://api.koldmarket.co.uk/health

# Web health check
curl https://www.koldmarket.co.uk/api/health
```

### View Logs

```bash
docker compose logs api --tail=100 -f
docker compose logs web --tail=100 -f
docker compose logs worker --tail=100 -f
```

### Database Backups

```bash
# Manual backup
docker compose exec postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup-$(date +%Y%m%d).sql

# Scheduled backup (add to cron)
0 2 * * * cd /srv/ek-marketplace && docker compose exec -T postgres pg_dump -U ekuser ekmarketplace > /srv/backups/db-$(date +\%Y\%m\%d).sql
```

### Update Deployment

```bash
cd /srv/ek-marketplace
git pull origin main
docker compose pull
docker compose up -d
docker compose exec api npx prisma migrate deploy
```

---

## 13. Fail2ban (Brute Force Protection)

```bash
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status
fail2ban-client status sshd
```

---

## Security Checklist

- [ ] Root SSH login disabled
- [ ] Password SSH login disabled
- [ ] UFW firewall enabled (ports 22, 80, 443 only)
- [ ] Fail2ban running
- [ ] SSL certificates installed and auto-renewing
- [ ] `.env.production` not in git (gitignored)
- [ ] Docker containers not exposing ports externally (except via Nginx)
- [ ] Database not publicly accessible (internal Docker network only)
- [ ] Regular automated backups configured

---

> **Note:** This guide assumes a fresh Ubuntu 24.04 VPS. Adjust paths and usernames for your environment.
