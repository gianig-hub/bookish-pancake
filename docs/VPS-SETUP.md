# KoldMarket — VPS Setup Guide

Production deployment on Ubuntu 24.04 (OVH VPS or equivalent).

---

## Prerequisites

- Ubuntu 24.04 LTS VPS (minimum 2 vCPU, 4GB RAM, 40GB SSD)
- Domain `koldmarket.co.uk` pointing to your VPS IP
- SSH access with a non-root sudo user

---

## 1. Initial Server Setup

```bash
# Log in as root
ssh root@<your-server-ip>

# Create a deploy user
adduser deploy
usermod -aG sudo deploy

# Set up SSH key for deploy user
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys

# Switch to deploy user for remaining steps
su - deploy
```

---

## 2. System Updates and Essentials

```bash
sudo apt update && sudo apt upgrade -y

# Essential tools
sudo apt install -y \
    curl \
    git \
    ufw \
    unzip \
    htop \
    fail2ban
```

---

## 3. Firewall (UFW)

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Verify
sudo ufw status
```

---

## 4. Install Docker

```bash
# Install Docker (official method)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add deploy user to docker group
sudo usermod -aG docker deploy

# Log out and back in for group change to take effect
exit
ssh deploy@<your-server-ip>

# Verify
docker --version
docker-compose --version
```

---

## 5. Install Node.js (for local scripts, not required if using Docker only)

```bash
# Install Node.js 20 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install 20
nvm use 20
nvm alias default 20

node --version
```

---

## 6. Clone and Configure the Repository

```bash
# Clone the repo
cd /home/deploy
git clone https://github.com/gianig-hub/bookish-pancake.git koldmarket
cd koldmarket

# Set up environment variables
cp .env.example .env.local
nano .env.local
# Fill in all production values (database, secrets, OpenAI, Stripe, etc.)
```

---

## 7. SSL Certificates (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Stop Nginx if running
sudo docker-compose stop nginx

# Get certificates
sudo certbot certonly --standalone \
  -d www.koldmarket.co.uk \
  -d app.koldmarket.co.uk \
  -d api.koldmarket.co.uk \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email

# Certificates will be at:
# /etc/letsencrypt/live/www.koldmarket.co.uk/fullchain.pem
# /etc/letsencrypt/live/www.koldmarket.co.uk/privkey.pem
```

After getting certificates, update `infra/nginx/conf.d/koldmarket.conf`:
- Uncomment HTTPS server blocks
- Uncomment HTTP → HTTPS redirects
- Uncomment HSTS headers

```bash
# Auto-renewal (runs twice daily, renews if expiring within 30 days)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal
sudo certbot renew --dry-run
```

---

## 8. Start the Application

```bash
cd /home/deploy/koldmarket

# Build and start all services
docker-compose up -d --build

# Check all containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Check individual service
docker-compose logs -f api
```

---

## 9. Database Migrations

```bash
# Run migrations (once your migration system is set up)
docker-compose exec api npm run db:migrate

# Check database is accessible
docker-compose exec postgres psql -U koldmarket -d koldmarket -c "\dt"
```

---

## 10. Deployment Script

Create `/home/deploy/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "Pulling latest changes..."
cd /home/deploy/koldmarket
git pull origin main

echo "Rebuilding containers..."
docker-compose build

echo "Restarting services..."
docker-compose up -d

echo "Running migrations..."
docker-compose exec -T api npm run db:migrate

echo "Deployment complete."
```

```bash
chmod +x /home/deploy/deploy.sh
```

---

## 11. Monitoring

### View container resource usage
```bash
docker stats
```

### Check disk usage
```bash
df -h
docker system df
```

### Prune unused Docker resources (run periodically)
```bash
docker system prune -f
```

---

## 12. Backups

### PostgreSQL backup
```bash
# Manual backup
docker-compose exec postgres pg_dump -U koldmarket koldmarket > backup-$(date +%Y%m%d).sql

# Restore
cat backup-YYYYMMDD.sql | docker-compose exec -T postgres psql -U koldmarket koldmarket
```

Set up automated daily backups with a cron job:

```bash
crontab -e

# Add (runs daily at 2am, keeps 7 days of backups)
0 2 * * * cd /home/deploy/koldmarket && docker-compose exec -T postgres pg_dump -U koldmarket koldmarket > /home/deploy/backups/backup-$(date +\%Y\%m\%d).sql && find /home/deploy/backups -name "backup-*.sql" -mtime +7 -delete
```

```bash
mkdir -p /home/deploy/backups
```

---

## Checklist

- [ ] VPS created with Ubuntu 24.04
- [ ] Non-root deploy user created with SSH key
- [ ] UFW firewall enabled (SSH, 80, 443)
- [ ] Docker installed and tested
- [ ] Repository cloned
- [ ] `.env.local` configured with production values
- [ ] SSL certificates obtained (Let's Encrypt)
- [ ] Nginx HTTPS config updated
- [ ] Application started with `docker-compose up -d`
- [ ] Database migrations run
- [ ] Deployment script created
- [ ] Backup cron job configured
