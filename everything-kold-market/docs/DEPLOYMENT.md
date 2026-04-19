# Deployment Guide — Ubuntu VPS (OVH/Hetzner)

## Prerequisites

- Ubuntu 22.04 VPS
- Domain name pointed at VPS IP
- SSH access as root or sudo user

## 1. Initial Server Setup

```bash
# Update packages
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Add your user to docker group
usermod -aG docker $USER

# Install Docker Compose plugin
apt install docker-compose-plugin -y

# Install Certbot (Let's Encrypt)
apt install certbot -y
```

## 2. Clone Repository

```bash
cd /opt
git clone https://github.com/gianig-hub/bookish-pancake.git ek-marketplace
cd ek-marketplace/everything-kold-market
```

## 3. Configure Environment

```bash
cp .env.example .env.production
nano .env.production
```

Set all values. Critical ones:
- `DATABASE_URL` — use strong random password
- `NEXTAUTH_SECRET` — `openssl rand -base64 32`
- `REDIS_PASSWORD` — strong password
- `NODE_ENV=production`

## 4. Get TLS Certificate

```bash
# Stop any service on port 80 first
certbot certonly --standalone -d your-domain.co.uk -d www.your-domain.co.uk
```

Certificates are stored at `/etc/letsencrypt/live/your-domain.co.uk/`.

## 5. Update Nginx Config

Edit `infra/nginx/production.conf` and replace `your-domain.co.uk` with your actual domain.

## 6. Build and Start

```bash
# Build images
docker compose -f infra/docker-compose.prod.yml build

# Run migrations
docker compose -f infra/docker-compose.prod.yml run --rm api npx prisma migrate deploy

# Start all services
docker compose -f infra/docker-compose.prod.yml up -d
```

## 7. Verify

```bash
docker compose -f infra/docker-compose.prod.yml ps
curl https://your-domain.co.uk/health
```

## Updating the Application

```bash
cd /opt/ek-marketplace
git pull origin main

docker compose -f infra/docker-compose.prod.yml build
docker compose -f infra/docker-compose.prod.yml up -d

# Run any new migrations
docker compose -f infra/docker-compose.prod.yml run --rm api npx prisma migrate deploy
```

## Backup

```bash
# Backup PostgreSQL
docker exec ek_db pg_dump -U ekuser ekmarket > backup-$(date +%Y%m%d).sql

# Restore
docker exec -i ek_db psql -U ekuser ekmarket < backup-20240101.sql
```

## Monitoring

```bash
# View logs
docker compose logs -f web
docker compose logs -f api
docker compose logs -f worker

# Resource usage
docker stats
```

## Certificate Renewal

```bash
# Certbot auto-renews but you need to reload nginx
certbot renew --post-hook "docker exec ek_nginx nginx -s reload"
```

## TODO
- [ ] Set up GitHub Actions CI/CD pipeline
- [ ] Configure automated database backups (cron)
- [ ] Set up monitoring (Uptime Kuma or similar)
- [ ] Configure log rotation
