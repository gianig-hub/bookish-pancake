# EK Marketplace — VPS Setup Guide

> Deploy EK Marketplace to a production Ubuntu VPS (OVH or similar).

---

## Prerequisites

- Ubuntu 24.04 LTS VPS (minimum 2 vCPU, 4GB RAM, 40GB SSD)
- Domain configured: `koldmarket.co.uk` (+ subdomains)
- SSH access to VPS as root or sudo user
- GitHub repository with the project

---

## Step 1: Initial Server Setup

```bash
# Update system
apt update && apt upgrade -y

# Install essentials
apt install -y curl git ufw fail2ban

# Create deploy user
adduser deploy
usermod -aG sudo deploy

# Copy SSH keys to deploy user
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Switch to deploy user for remaining steps
su - deploy
```

---

## Step 2: Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Add deploy user to docker group
sudo usermod -aG docker $USER

# Restart session to apply group
newgrp docker

# Verify
docker --version
docker compose version
```

---

## Step 3: Firewall Setup

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Step 4: DNS Configuration

In your domain registrar DNS settings, add:

```
Type  Name  Value               TTL
A     @     <your-vps-ip>       300
A     www   <your-vps-ip>       300
A     app   <your-vps-ip>       300
A     api   <your-vps-ip>       300
```

Allow up to 24 hours for DNS propagation.

---

## Step 5: Clone Repository

```bash
# Clone project
git clone https://github.com/gianig-hub/bookish-pancake.git /opt/ek-marketplace
cd /opt/ek-marketplace

# Create environment file
cp .env.example .env
nano .env
```

Edit `.env` with production values:

```bash
NODE_ENV=production
APP_URL=https://www.koldmarket.co.uk
API_URL=https://api.koldmarket.co.uk

# Use strong random values!
NEXTAUTH_SECRET=<generate with: openssl rand -hex 32>
JWT_SECRET=<generate with: openssl rand -hex 32>

DATABASE_URL=postgresql://ekuser:<strong-password>@postgres:5432/ekmarketplace
POSTGRES_PASSWORD=<strong-password>
```

---

## Step 6: Start Services

```bash
# Build and start all services
docker compose up -d --build

# Run database migrations
docker compose exec api npm run db:migrate

# Seed initial data (categories)
docker compose exec api npm run db:seed

# Verify services are running
docker compose ps
```

---

## Step 7: SSL Certificates with Let's Encrypt

Install Certbot:

```bash
sudo apt install -y certbot

# Stop Nginx temporarily to get certificates
docker compose stop nginx

# Get certificates for all subdomains
sudo certbot certonly --standalone \
  -d koldmarket.co.uk \
  -d www.koldmarket.co.uk \
  -d app.koldmarket.co.uk \
  -d api.koldmarket.co.uk
```

Update Nginx config for HTTPS:

1. Edit `infra/nginx/conf.d/koldmarket.conf`
2. Add `listen 443 ssl;` blocks
3. Add certificate paths:
   ```nginx
   ssl_certificate /etc/letsencrypt/live/koldmarket.co.uk/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/koldmarket.co.uk/privkey.pem;
   ```
4. Add HTTP→HTTPS redirect:
   ```nginx
   server {
     listen 80;
     server_name koldmarket.co.uk www.koldmarket.co.uk;
     return 301 https://$host$request_uri;
   }
   ```
5. Mount certificates in `docker-compose.yml`:
   ```yaml
   nginx:
     volumes:
       - /etc/letsencrypt:/etc/letsencrypt:ro
   ```
6. Restart Nginx: `docker compose up -d nginx`

Auto-renewal:

```bash
# Add cron job for cert renewal
echo "0 3 * * * certbot renew --quiet && docker compose -f /opt/ek-marketplace/docker-compose.yml restart nginx" | sudo crontab -
```

---

## Step 8: Deployment Script

Create `/opt/ek-marketplace/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "Deploying EK Marketplace..."

cd /opt/ek-marketplace

# Pull latest code
git pull origin main

# Rebuild and restart
docker compose up -d --build

# Run migrations
docker compose exec -T api npm run db:migrate

echo "Deployment complete."
```

```bash
chmod +x deploy.sh
```

---

## Monitoring

```bash
# View all logs
docker compose logs -f

# View specific service
docker compose logs -f api

# Check container status
docker compose ps

# Disk usage
df -h
docker system df
```

---

## Backups

Set up daily PostgreSQL backups:

```bash
cat > /opt/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker compose -f /opt/ek-marketplace/docker-compose.yml exec -T postgres \
  pg_dump -U ekuser ekmarketplace \
  | gzip > /opt/backups/ek_${DATE}.sql.gz

# Keep last 30 days only
find /opt/backups -name "ek_*.sql.gz" -mtime +30 -delete
EOF

mkdir -p /opt/backups
chmod +x /opt/backup-db.sh

# Run daily at 2am
echo "0 2 * * * /opt/backup-db.sh" | crontab -
```

---

## Recommended VPS Specs

| Resource | Phase 1 | Phase 2+ |
|----------|---------|---------|
| vCPU | 2 | 4 |
| RAM | 4GB | 8GB |
| Storage | 40GB SSD | 80GB+ SSD |
| Bandwidth | 500Mbps | Unmetered |

OVH VPS Starter (2 vCPU / 4GB) is sufficient for Phase 1.
