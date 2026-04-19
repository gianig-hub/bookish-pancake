# EK Marketplace — VPS Setup Guide

Ubuntu 24.04 LTS setup for production deployment.

---

## 1. Initial Server Setup

```bash
# Update system
apt update && apt upgrade -y

# Install essentials
apt install -y curl git ufw fail2ban

# Create deploy user
adduser deploy
usermod -aG sudo deploy

# Set up firewall
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## 2. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh

# Add deploy user to docker group
usermod -aG docker deploy

# Install Docker Compose plugin
apt install -y docker-compose-plugin

# Verify
docker --version
docker compose version
```

---

## 3. Install Nginx

```bash
apt install -y nginx certbot python3-certbot-nginx
systemctl enable nginx
```

---

## 4. Clone Repository

```bash
su - deploy
git clone https://github.com/your-org/everything-kold-market.git /opt/ekmarket
cd /opt/ekmarket
```

---

## 5. Configure Environment

```bash
cp .env.example .env
nano .env  # Fill in all required values
```

Key values to set:
- `DATABASE_URL` — production database credentials
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `OPENAI_API_KEY` — if using AI features
- `APP_URL` — your domain (e.g., `https://ekmarketplace.co.uk`)

---

## 6. SSL Certificate

```bash
# Obtain Let's Encrypt certificate
certbot --nginx -d yourdomain.co.uk -d www.yourdomain.co.uk

# Auto-renewal is configured by certbot
# Test renewal: certbot renew --dry-run
```

---

## 7. Configure Nginx

```bash
# Copy production config
cp /opt/ekmarket/infra/nginx/production.conf /etc/nginx/nginx.conf

# Edit: replace YOUR_DOMAIN with your domain
sed -i 's/YOUR_DOMAIN/yourdomain.co.uk/g' /etc/nginx/nginx.conf

# Test and reload
nginx -t && nginx -s reload
```

---

## 8. Start Services

```bash
cd /opt/ekmarket
docker compose up -d

# Check status
docker compose ps
docker compose logs -f
```

---

## 9. Set Up Automated Backups

```bash
# Make backup script executable
chmod +x /opt/ekmarket/infra/deploy/backup.sh

# Add to crontab (runs daily at 2 AM)
crontab -e
# Add: 0 2 * * * /opt/ekmarket/infra/deploy/backup.sh >> /var/log/ek_backup.log 2>&1
```

---

## 10. Verify Deployment

```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","timestamp":"..."}
```

---

## Ongoing Maintenance

```bash
# Update to latest code
cd /opt/ekmarket
./infra/deploy/deploy.sh

# View logs
docker compose logs web
docker compose logs api
docker compose logs worker

# Monitor disk
df -h
docker system df
```
