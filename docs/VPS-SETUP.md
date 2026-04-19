# VPS Setup Guide for EK Marketplace on Ubuntu 24.04 LTS

> **Estimated setup time:** 2–3 hours (experienced) / 4–6 hours (beginner)  
> **Target OS:** Ubuntu 24.04 LTS  
> **Target providers:** DigitalOcean, Linode, AWS Lightsail, Hetzner, OVH

---

## Overview

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| vCPUs | 2 | 4 |
| RAM | 2 GB | 4–8 GB |
| Storage | 40 GB SSD | 80–160 GB SSD |
| Bandwidth | 2 TB/month | 4 TB/month |

### Cost Estimate (Monthly)

| Provider | Plan | Approximate Cost |
|----------|------|-----------------|
| DigitalOcean | 2 vCPU / 4 GB | ~$24/month |
| Hetzner | CX21 (3 vCPU / 4 GB) | ~€5–8/month |
| Linode | Shared 4 GB | ~$24/month |
| AWS Lightsail | 4 GB RAM | ~$20/month |

> **Tip:** Start with 2–4 GB RAM. You can upgrade the VPS later without rebuilding.

---

## Part 1: Initial VPS Setup

### 1.1 SSH Key Setup (No Passwords)

Generate an SSH key on your **local machine** if you don't have one:

```bash
ssh-keygen -t ed25519 -C "your@email.com"
# Accept defaults or set a passphrase
cat ~/.ssh/id_ed25519.pub
```

Copy the output (your public key) and add it to your VPS provider's SSH key panel before creating the server, or manually append it to `~/.ssh/authorized_keys` on the server.

Connect to your server:

```bash
ssh root@YOUR_SERVER_IP
```

### 1.2 System Update & Security Basics

```bash
# Update and upgrade all packages
apt update && apt upgrade -y

# Install essential tools
apt install -y curl wget git unzip ufw fail2ban htop ncdu logrotate

# Set the timezone
timedatectl set-timezone Europe/London

# Enable automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure --priority=low unattended-upgrades
```

### 1.3 Create a Deploy User

> ⚠️ **Never run your application as root.** Create a dedicated deploy user.

```bash
# Create the deploy user
adduser deploy

# Grant sudo privileges
usermod -aG sudo deploy

# Copy root's SSH keys to deploy user
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy/

# Verify SSH access before closing the root session
# Open a NEW terminal and test:
# ssh deploy@YOUR_SERVER_IP
```

### 1.4 Sudo Without Password for Deploy Tasks

```bash
# Edit the sudoers file
visudo
```

Add one of the following lines at the end of the file:

**Option A — Unrestricted (convenient, less secure):**
```
deploy ALL=(ALL) NOPASSWD:ALL
```

**Option B — Restricted to deployment commands (recommended):**
```
deploy ALL=(ALL) NOPASSWD: /usr/bin/docker, /usr/local/bin/docker-compose, /bin/systemctl restart ekmarket, /bin/systemctl start ekmarket, /bin/systemctl stop ekmarket, /usr/sbin/nginx
```

> ⚠️ **Security note:** Option A is convenient for automated deployments but grants full root equivalent access. Use Option B in production environments where you want to limit the blast radius of a compromised deploy key.

### 1.5 Disable Root Login & Password Authentication

```bash
nano /etc/ssh/sshd_config
```

Find and set the following values:

```
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
```

Restart SSH:

```bash
systemctl restart sshd
```

### 1.6 SSH Config for Easy Access (Local Machine)

Add this to `~/.ssh/config` on your **local machine**:

```
Host ekmarket
    HostName YOUR_SERVER_IP
    User deploy
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60
```

Now you can connect simply with:

```bash
ssh ekmarket
```

---

## Part 2: Infrastructure Services

### 2.1 Docker & Docker Compose

```bash
# Switch to deploy user
su - deploy

# Install Docker from the official script
curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
sudo sh /tmp/get-docker.sh

# Add deploy user to the docker group
sudo usermod -aG docker deploy

# Apply group membership without logging out
newgrp docker

# Verify Docker installation
docker --version
docker run --rm hello-world
```

Install Docker Compose (standalone binary):

```bash
# Get the latest version
DOCKER_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name"' | cut -d'"' -f4)

sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

Enable Docker on boot:

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

### 2.2 Node.js via NVM

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load NVM into the current session
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Install Node.js LTS
nvm install --lts
nvm use --lts
nvm alias default node

# Verify
node --version
npm --version

# Install global npm tools
npm install -g pm2 typescript tsx
```

Add NVM to your shell profile (add to `~/.bashrc` or `~/.zshrc`):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

### 2.3 PostgreSQL 16

```bash
# Add PostgreSQL official APT repository
sudo apt install -y gnupg2
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgresql.gpg

sudo apt update
sudo apt install -y postgresql-16 postgresql-client-16

# Enable and start PostgreSQL
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Verify
sudo -u postgres psql -c "SELECT version();"
```

Create the application database and user:

```bash
sudo -u postgres psql <<EOF
-- Create application user
CREATE USER ekuser WITH PASSWORD 'CHANGE_THIS_STRONG_PASSWORD';

-- Create the database
CREATE DATABASE ekmarket OWNER ekuser;

-- Grant full privileges
GRANT ALL PRIVILEGES ON DATABASE ekmarket TO ekuser;

-- Create a read-only backup user
CREATE USER ekbackup WITH PASSWORD 'CHANGE_THIS_BACKUP_PASSWORD';
GRANT CONNECT ON DATABASE ekmarket TO ekbackup;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO ekbackup;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO ekbackup;

\q
EOF
```

> ⚠️ **Security:** Replace `CHANGE_THIS_STRONG_PASSWORD` and `CHANGE_THIS_BACKUP_PASSWORD` with strong, unique passwords **before** running these commands.

Set up a `.pgpass` file so backup scripts can connect without exposing the password in process listings:

```bash
# Create the pgpass file for the deploy user
echo "127.0.0.1:5432:ekmarket:ekbackup:CHANGE_THIS_BACKUP_PASSWORD" >> ~/.pgpass
chmod 600 ~/.pgpass
```

Configure PostgreSQL to allow local connections:

```bash
# Find your PostgreSQL version config path
sudo nano /etc/postgresql/16/main/pg_hba.conf
```

Ensure these lines exist (they usually do by default):

```
# Database administrative login by Unix domain socket
local   all             postgres                                peer

# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

Restart PostgreSQL after changes:

```bash
sudo systemctl restart postgresql
```

Test the connection:

```bash
psql -U ekuser -d ekmarket -h 127.0.0.1 -W
```

### 2.4 Redis

```bash
# Install Redis
sudo apt install -y redis-server

# Configure persistence (Append-Only File)
sudo nano /etc/redis/redis.conf
```

Find and update these values in `redis.conf`:

```
# Bind to localhost only
bind 127.0.0.1 -::1

# Require a password
requirepass CHANGE_THIS_REDIS_PASSWORD

# Enable AOF persistence
appendonly yes
appendfsync everysec

# Set max memory policy for cache usage
maxmemory 256mb
maxmemory-policy allkeys-lru
```

Enable and restart Redis:

```bash
sudo systemctl enable redis-server
sudo systemctl restart redis-server

# Verify
redis-cli -a CHANGE_THIS_REDIS_PASSWORD ping
# Expected response: PONG
```

### 2.5 Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Enable and start Nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Verify Nginx is running
curl -s http://localhost | grep -i nginx
```

---

## Part 3: Web Server (Nginx Configuration)

### 3.1 Directory Structure

```bash
# Create directories for each site
sudo mkdir -p /var/www/ekmarketplace.co.uk
sudo mkdir -p /var/www/api.ekmarketplace.co.uk
sudo mkdir -p /var/www/admin.ekmarketplace.co.uk

# Set ownership
sudo chown -R deploy:www-data /var/www/
sudo chmod -R 755 /var/www/
```

### 3.2 Nginx Site Configurations

#### Main Site: ekmarketplace.co.uk

```bash
sudo nano /etc/nginx/sites-available/ekmarketplace.co.uk
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ekmarketplace.co.uk www.ekmarketplace.co.uk;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ekmarketplace.co.uk www.ekmarketplace.co.uk;

    # SSL — managed by Certbot
    ssl_certificate /etc/letsencrypt/live/ekmarketplace.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ekmarketplace.co.uk/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_disable "MSIE [1-6]\.";

    # Proxy to Next.js app (port 3000)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Static file caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    access_log /var/log/nginx/ekmarketplace.co.uk.access.log;
    error_log /var/log/nginx/ekmarketplace.co.uk.error.log;
}
```

#### API: api.ekmarketplace.co.uk

```bash
sudo nano /etc/nginx/sites-available/api.ekmarketplace.co.uk
```

> **Note:** Add the `limit_req_zone` directive to `/etc/nginx/nginx.conf` inside the `http {}` block (only once, not per server block):
>
> ```nginx
> # In /etc/nginx/nginx.conf, inside the http { } block:
> limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;
> ```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.ekmarketplace.co.uk;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.ekmarketplace.co.uk;

    ssl_certificate /etc/letsencrypt/live/api.ekmarketplace.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.ekmarketplace.co.uk/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rate limiting (limit_req_zone must be defined in nginx.conf http block)
    limit_req zone=api burst=10 nodelay;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    access_log /var/log/nginx/api.ekmarketplace.co.uk.access.log;
    error_log /var/log/nginx/api.ekmarketplace.co.uk.error.log;
}
```

#### Admin Panel: admin.ekmarketplace.co.uk

```bash
sudo nano /etc/nginx/sites-available/admin.ekmarketplace.co.uk
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name admin.ekmarketplace.co.uk;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name admin.ekmarketplace.co.uk;

    ssl_certificate /etc/letsencrypt/live/admin.ekmarketplace.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.ekmarketplace.co.uk/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Restrict to trusted IPs only (replace with your IP)
    # allow YOUR_OFFICE_IP;
    # deny all;

    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    access_log /var/log/nginx/admin.ekmarketplace.co.uk.access.log;
    error_log /var/log/nginx/admin.ekmarketplace.co.uk.error.log;
}
```

#### Status Page: status.ekmarketplace.co.uk

```bash
sudo nano /etc/nginx/sites-available/status.ekmarketplace.co.uk
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name status.ekmarketplace.co.uk;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name status.ekmarketplace.co.uk;

    ssl_certificate /etc/letsencrypt/live/status.ekmarketplace.co.uk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/status.ekmarketplace.co.uk/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    access_log /var/log/nginx/status.ekmarketplace.co.uk.access.log;
    error_log /var/log/nginx/status.ekmarketplace.co.uk.error.log;
}
```

Enable the sites:

```bash
sudo ln -s /etc/nginx/sites-available/ekmarketplace.co.uk /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.ekmarketplace.co.uk /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/admin.ekmarketplace.co.uk /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/status.ekmarketplace.co.uk /etc/nginx/sites-enabled/

# Remove the default site
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 3.3 SSL Certificates with Let's Encrypt

```bash
# Install Certbot and the Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificates for all subdomains
sudo certbot --nginx \
  -d ekmarketplace.co.uk \
  -d www.ekmarketplace.co.uk \
  -d api.ekmarketplace.co.uk \
  -d admin.ekmarketplace.co.uk \
  -d status.ekmarketplace.co.uk \
  --agree-tos \
  --no-eff-email \
  --email admin@ekmarketplace.co.uk

# Test automatic renewal
sudo certbot renew --dry-run
```

Certbot automatically creates a cron job for renewal. Verify it:

```bash
sudo systemctl status certbot.timer
# or check the cron entry
sudo cat /etc/cron.d/certbot
```

---

## Part 4: Firewall & Security

### 4.1 UFW Configuration

```bash
# Enable UFW with sensible defaults
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (IMPORTANT: do this before enabling UFW)
sudo ufw allow 22/tcp comment 'SSH'

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# Enable UFW
sudo ufw enable

# Check status
sudo ufw status verbose
```

> ⚠️ **Warning:** Always allow port 22 before enabling UFW, or you will lock yourself out of the server.

### 4.2 Restrict Database and Cache Ports

PostgreSQL and Redis should **never** be exposed to the internet. They are accessible only from `localhost` by default:

```bash
# Verify PostgreSQL is not listening on public interfaces
sudo ss -tlnp | grep 5432
# Should show: 127.0.0.1:5432 only

# Verify Redis is not listening on public interfaces
sudo ss -tlnp | grep 6379
# Should show: 127.0.0.1:6379 only
```

If you need remote database access for tools like pgAdmin, use an **SSH tunnel** instead of opening the port:

```bash
# On your local machine, create an SSH tunnel to PostgreSQL
ssh -L 5432:127.0.0.1:5432 deploy@YOUR_SERVER_IP -N
# Then connect your local pgAdmin to localhost:5432
```

### 4.3 Fail2ban Setup

Fail2ban protects against brute-force attacks by banning IPs with too many failed attempts.

```bash
# Install Fail2ban (already installed in step 1.2)
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Create a local configuration
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

Key settings to configure in `jail.local`:

```ini
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

# Ban IP globally across all jails
banaction = ufw

[sshd]
enabled  = true
port     = 22
logpath  = %(sshd_log)s
maxretry = 3
bantime  = 24h

[nginx-http-auth]
enabled  = true

[nginx-limit-req]
enabled  = true
port     = http,https
logpath  = /var/log/nginx/*error.log
```

Restart Fail2ban:

```bash
sudo systemctl restart fail2ban

# Check status
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

### 4.4 Additional Security Best Practices

```bash
# Disable IPv6 if not needed (optional)
# Add to /etc/sysctl.conf:
# net.ipv6.conf.all.disable_ipv6 = 1

# Prevent IP spoofing
echo "net.ipv4.conf.all.rp_filter = 1" | sudo tee -a /etc/sysctl.conf
echo "net.ipv4.conf.default.rp_filter = 1" | sudo tee -a /etc/sysctl.conf

# Ignore ICMP ping broadcasts
echo "net.ipv4.icmp_echo_ignore_broadcasts = 1" | sudo tee -a /etc/sysctl.conf

# Apply settings
sudo sysctl -p
```

---

## Part 5: Application Deployment

### 5.1 Directory Structure

```bash
# Create application directory structure
sudo mkdir -p /opt/ekmarket
sudo chown deploy:deploy /opt/ekmarket

# Create runtime directories
sudo mkdir -p /var/lib/ekmarket/uploads
sudo mkdir -p /var/log/ekmarket
sudo mkdir -p /backups/db
sudo mkdir -p /backups/files

sudo chown -R deploy:deploy /var/lib/ekmarket
sudo chown -R deploy:deploy /var/log/ekmarket
sudo chown -R deploy:deploy /backups
```

### 5.2 Clone the Repository

```bash
cd /opt/ekmarket

# Clone the repository
git clone https://github.com/gianig-hub/bookish-pancake.git .

# Or if using a deploy key:
# GIT_SSH_COMMAND='ssh -i ~/.ssh/deploy_key' git clone git@github.com:gianig-hub/bookish-pancake.git .
```

### 5.3 Environment Variables

```bash
# Create the production environment file
nano /opt/ekmarket/.env.production
```

Fill in the `.env.production` file (see template below). Set restrictive permissions:

```bash
chmod 600 /opt/ekmarket/.env.production
```

Generate secrets before editing the file:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

#### `.env.production` Template

```dotenv
# === Application ===
NODE_ENV=production
APP_NAME=EK Marketplace
APP_URL=https://ekmarketplace.co.uk

# === Next.js ===
NEXTAUTH_URL=https://ekmarketplace.co.uk
NEXTAUTH_SECRET=REPLACE_WITH_OUTPUT_OF__openssl_rand_-base64_32

# === Database ===
DATABASE_URL=postgresql://ekuser:CHANGE_THIS_STRONG_PASSWORD@127.0.0.1:5432/ekmarket
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# === Redis ===
REDIS_URL=redis://:CHANGE_THIS_REDIS_PASSWORD@127.0.0.1:6379

# === API ===
API_PORT=4000
API_URL=https://api.ekmarketplace.co.uk

# === File Uploads ===
UPLOAD_DIR=/var/lib/ekmarket/uploads
MAX_FILE_SIZE_MB=10

# === Email (e.g. SendGrid or Postmark) ===
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=<your_sendgrid_api_key>
EMAIL_FROM=noreply@ekmarketplace.co.uk

# === AWS S3 (for production file storage) ===
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=eu-west-2
# AWS_S3_BUCKET=ekmarket-uploads

# === Monitoring ===
# SENTRY_DSN=

# === Feature Flags ===
FEATURE_AI_SEARCH=false
FEATURE_PAYMENTS=false
```

> **Security:** Never commit `.env.production` to git. It is already listed in `.gitignore`.

### 5.4 Build Docker Images

```bash
cd /opt/ekmarket

# Copy environment file for Docker Compose
cp .env.production .env

# Build and start all containers
docker-compose -f docker-compose.prod.yml up -d --build

# Check running containers
docker ps

# Check logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 5.5 Database Migrations

```bash
# Run Prisma migrations in the web container
docker-compose -f docker-compose.prod.yml exec web npx prisma migrate deploy

# Seed initial data (if applicable)
docker-compose -f docker-compose.prod.yml exec web npx prisma db seed

# Verify migration status
docker-compose -f docker-compose.prod.yml exec web npx prisma migrate status
```

### 5.6 Systemd Service for Auto-Start

Create a systemd service so Docker Compose starts on boot and restarts on failure:

```bash
sudo nano /etc/systemd/system/ekmarket.service
```

```ini
[Unit]
Description=EK Marketplace Application
Requires=docker.service
After=docker.service network-online.target
Wants=network-online.target

[Service]
Type=oneshot
RemainAfterExit=yes
User=deploy
WorkingDirectory=/opt/ekmarket
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up -d
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
ExecReload=/usr/local/bin/docker-compose -f docker-compose.prod.yml pull
TimeoutStartSec=120
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable ekmarket
sudo systemctl start ekmarket

# Check status
sudo systemctl status ekmarket
```

### 5.7 Health Checks

```bash
# Check if the web app is responding
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Expected: 200

# Check if the API is responding
curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/health
# Expected: 200

# Check database connectivity
docker-compose -f docker-compose.prod.yml exec web npx prisma db execute --stdin <<< "SELECT 1;"

# Check Redis connectivity
redis-cli -a CHANGE_THIS_REDIS_PASSWORD ping
```

---

## Part 6: Ongoing Operations

### 6.1 Deployment Flow

#### Standard Deploy (Zero-Downtime)

```bash
cd /opt/ekmarket

# 1. Pull the latest code
git pull origin main

# 2. Build new images without stopping the old ones
docker-compose -f docker-compose.prod.yml build --no-cache web api

# 3. Run database migrations
docker-compose -f docker-compose.prod.yml exec web npx prisma migrate deploy

# 4. Roll out new containers one at a time (zero-downtime)
docker-compose -f docker-compose.prod.yml up -d --no-deps web
docker-compose -f docker-compose.prod.yml up -d --no-deps api

# 5. Verify health
curl -s http://localhost:3000/api/health
```

#### Deploy Script

Create `/opt/ekmarket/scripts/deploy.sh`:

```bash
#!/bin/bash
set -e

echo "=== EK Marketplace Deploy ==="
echo "Started at: $(date)"

cd /opt/ekmarket

echo "Pulling latest code..."
git pull origin main

echo "Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "Restarting containers..."
docker-compose -f docker-compose.prod.yml up -d --remove-orphans

echo "Waiting for services to be healthy..."
sleep 10

echo "Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T web npx prisma migrate deploy

echo "Checking web health..."
curl -sf http://localhost:3000/api/health || (echo "ERROR: Web health check failed!" && exit 1)

echo "=== Deploy complete at: $(date) ==="
```

```bash
chmod +x /opt/ekmarket/scripts/deploy.sh
```

#### Rollback Procedure

```bash
# List recent git commits
git --no-pager log --oneline -10

# Roll back to a specific commit
git checkout <commit-sha>

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# If a migration needs to be rolled back
docker-compose -f docker-compose.prod.yml exec web npx prisma migrate reset --force
```

### 6.2 Monitoring & Logging

#### Docker Container Logs

```bash
# Follow all logs
docker-compose -f docker-compose.prod.yml logs -f

# Follow logs for a specific service
docker-compose -f docker-compose.prod.yml logs -f web
docker-compose -f docker-compose.prod.yml logs -f api

# View last 100 lines
docker-compose -f docker-compose.prod.yml logs --tail=100 web
```

#### System Resource Monitoring

```bash
# Interactive process viewer
htop

# Disk usage
df -h
du -sh /opt/ekmarket /var/lib/ekmarket /backups

# Memory usage
free -h

# Docker container resource usage
docker stats
```

#### Nginx Log Monitoring

```bash
# Real-time access log
sudo tail -f /var/log/nginx/ekmarketplace.co.uk.access.log

# Real-time error log
sudo tail -f /var/log/nginx/ekmarketplace.co.uk.error.log

# Most visited pages (last 1000 requests)
sudo awk '{print $7}' /var/log/nginx/ekmarketplace.co.uk.access.log | sort | uniq -c | sort -rn | head -20
```

### 6.3 Database Backups

#### Daily Automated Backup Script

Create `/opt/ekmarket/scripts/backup-db.sh`:

```bash
#!/bin/bash
set -e

BACKUP_DIR="/backups/db"
DATE=$(date +%Y-%m-%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/ekmarket_$DATE.sql.gz"
DB_NAME="ekmarket"
DB_USER="ekbackup"
RETENTION_DAYS=30

# Create backup
# Uses ~/.pgpass for credentials (avoids exposing the password in process listings)
# Format: hostname:port:database:username:password
# Example: echo "127.0.0.1:5432:ekmarket:ekbackup:CHANGE_THIS_BACKUP_PASSWORD" >> ~/.pgpass && chmod 600 ~/.pgpass
echo "Starting database backup: $BACKUP_FILE"
pg_dump \
  -h 127.0.0.1 \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --format=plain \
  --verbose \
  | gzip > "$BACKUP_FILE"

echo "Backup complete: $(du -sh $BACKUP_FILE | cut -f1)"

# Remove backups older than retention period
find "$BACKUP_DIR" -name "ekmarket_*.sql.gz" -mtime +$RETENTION_DAYS -delete
echo "Old backups removed (kept last $RETENTION_DAYS days)"

# Optional: Upload to S3
# aws s3 cp "$BACKUP_FILE" "s3://ekmarket-backups/db/$(basename $BACKUP_FILE)"
```

```bash
chmod +x /opt/ekmarket/scripts/backup-db.sh
```

Add to crontab:

```bash
crontab -e
```

```cron
# Daily database backup at 2:00 AM
0 2 * * * /opt/ekmarket/scripts/backup-db.sh >> /var/log/ekmarket/backup-db.log 2>&1

# Weekly file uploads backup at 3:00 AM on Sundays
0 3 * * 0 /opt/ekmarket/scripts/backup-files.sh >> /var/log/ekmarket/backup-files.log 2>&1
```

#### Weekly File Uploads Backup

Create `/opt/ekmarket/scripts/backup-files.sh`:

```bash
#!/bin/bash
set -e

BACKUP_DIR="/backups/files"
DATE=$(date +%Y-%m-%d)
BACKUP_FILE="$BACKUP_DIR/uploads_$DATE.tar.gz"
SOURCE_DIR="/var/lib/ekmarket/uploads"
RETENTION_WEEKS=12

# Create backup
echo "Starting files backup: $BACKUP_FILE"
tar -czf "$BACKUP_FILE" -C "$(dirname $SOURCE_DIR)" "$(basename $SOURCE_DIR)"
echo "Backup complete: $(du -sh $BACKUP_FILE | cut -f1)"

# Remove backups older than retention period
find "$BACKUP_DIR" -name "uploads_*.tar.gz" -mtime +$((RETENTION_WEEKS * 7)) -delete
echo "Old file backups removed (kept last $RETENTION_WEEKS weeks)"
```

```bash
chmod +x /opt/ekmarket/scripts/backup-files.sh
```

#### Restore from Backup

```bash
# Restore the most recent database backup
LATEST_BACKUP=$(ls -t /backups/db/ekmarket_*.sql.gz | head -1)
echo "Restoring from: $LATEST_BACKUP"

# Decompress and restore
gunzip -c "$LATEST_BACKUP" | psql -h 127.0.0.1 -U ekuser -d ekmarket

# Restore files backup
LATEST_FILES=$(ls -t /backups/files/uploads_*.tar.gz | head -1)
tar -xzf "$LATEST_FILES" -C /var/lib/ekmarket/
```

### 6.4 Log Rotation

```bash
sudo nano /etc/logrotate.d/ekmarket
```

```
/var/log/ekmarket/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        systemctl reload nginx 2>/dev/null || true
    endscript
}

/var/log/nginx/ekmarketplace.co.uk*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 $(cat /var/run/nginx.pid)
    endscript
}
```

### 6.5 Security Updates

```bash
# Apply security updates automatically (already configured in step 1.2)
# Review pending updates
sudo apt list --upgradable

# Apply only security updates manually
sudo apt-get update
sudo apt-get upgrade -y

# Full system upgrade (do this periodically, test first)
sudo apt-get dist-upgrade -y

# Check if reboot is required
[ -f /var/run/reboot-required ] && echo "Reboot required!" || echo "No reboot needed"
```

### 6.6 SSL Certificate Renewal

Certbot automatically renews certificates via a systemd timer. To verify and test:

```bash
# Check timer status
sudo systemctl status certbot.timer

# Test renewal (dry run — won't actually renew)
sudo certbot renew --dry-run

# Force renewal if needed
sudo certbot renew --force-renewal

# After renewal, reload Nginx
sudo systemctl reload nginx
```

---

## Part 7: Troubleshooting

### Docker Container Won't Start

```bash
# Check container status
docker ps -a

# View container logs
docker logs <container_name>

# View last 50 lines of logs
docker logs --tail=50 <container_name>

# Inspect container for error details
docker inspect <container_name>

# Restart a specific container
docker restart <container_name>

# Rebuild and restart a service
docker-compose -f docker-compose.prod.yml up -d --build --force-recreate web
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-16-main.log

# Test connection manually
psql -h 127.0.0.1 -U ekuser -d ekmarket -W

# Check if the port is open
sudo ss -tlnp | grep 5432

# Reset the database user password
sudo -u postgres psql -c "ALTER USER ekuser PASSWORD 'new_password';"

# Check pg_hba.conf for authentication issues
sudo cat /etc/postgresql/16/main/pg_hba.conf
```

### Nginx 502 Bad Gateway

```bash
# Check Nginx error logs
sudo tail -50 /var/log/nginx/ekmarketplace.co.uk.error.log

# Verify the upstream application is running
curl -s http://localhost:3000
curl -s http://localhost:4000/health

# Check if port is listening
sudo ss -tlnp | grep 3000
sudo ss -tlnp | grep 4000

# Test Nginx config syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Check if Docker containers are running
docker ps
```

### Memory Issues

```bash
# Check current memory usage
free -h
cat /proc/meminfo | head -20

# Check which processes are using the most memory
ps aux --sort=-%mem | head -20

# Check Docker container memory usage
docker stats --no-stream

# Clear Docker unused images and containers (free up disk/memory)
docker system prune -af

# Add swap space if needed (emergency)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Disk Space Issues

```bash
# Check overall disk usage
df -h

# Find largest directories
du -sh /* 2>/dev/null | sort -rh | head -20
du -sh /var/* 2>/dev/null | sort -rh | head -10

# Clean up Docker resources
docker system prune -af --volumes

# Clean up old logs
sudo journalctl --vacuum-time=7d
sudo find /var/log -name "*.gz" -mtime +14 -delete

# Check PostgreSQL table sizes
sudo -u postgres psql -d ekmarket -c "
SELECT schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS total_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC
LIMIT 10;"
```

### Port Conflicts

```bash
# Find what's using a specific port
sudo ss -tlnp | grep :3000
sudo lsof -i :3000

# Kill the process using the port
sudo kill -9 <PID>

# Check all listening ports
sudo ss -tlnp
```

### SSL Certificate Issues

```bash
# Check certificate expiry
sudo certbot certificates

# Check if certificate files exist
ls -la /etc/letsencrypt/live/ekmarketplace.co.uk/

# Test SSL configuration
openssl s_client -connect ekmarketplace.co.uk:443 -showcerts

# Force certificate renewal
sudo certbot renew --force-renewal --cert-name ekmarketplace.co.uk
sudo systemctl reload nginx
```

---

## Quick Reference Cheatsheet

| Task | Command |
|------|---------|
| Deploy latest code | `cd /opt/ekmarket && ./scripts/deploy.sh` |
| View all container logs | `docker-compose -f docker-compose.prod.yml logs -f` |
| Restart application | `sudo systemctl restart ekmarket` |
| Check container status | `docker ps` |
| Reload Nginx | `sudo systemctl reload nginx` |
| Check SSL certs | `sudo certbot certificates` |
| Run DB backup now | `/opt/ekmarket/scripts/backup-db.sh` |
| Check disk usage | `df -h && docker system df` |
| Check memory | `free -h && docker stats --no-stream` |
| View Fail2ban bans | `sudo fail2ban-client status sshd` |
| Unban an IP | `sudo fail2ban-client set sshd unbanip <IP>` |

---

## Subdomain Summary

| Subdomain | Purpose | Port |
|-----------|---------|------|
| `ekmarketplace.co.uk` | Main web app (Next.js) | 3000 |
| `www.ekmarketplace.co.uk` | Alias to main site | 3000 |
| `api.ekmarketplace.co.uk` | Backend API | 4000 |
| `admin.ekmarketplace.co.uk` | Admin panel | 3001 |
| `status.ekmarketplace.co.uk` | Status/uptime page | 3002 |
| `mail.ekmarketplace.co.uk` | Email service (future) | — |

---

## Success Criteria Checklist

- [ ] Server boots and stays running
- [ ] `ssh ekmarket` connects without a password prompt
- [ ] Docker containers start automatically on boot
- [ ] SSL/TLS working for all subdomains (`https://` with green lock)
- [ ] Database backups running daily (check `/backups/db/`)
- [ ] Logs centralised and rotating (`/var/log/ekmarket/`)
- [ ] Fail2ban active and monitoring SSH
- [ ] UFW blocking all unnecessary ports
- [ ] Certbot auto-renewing certificates
- [ ] Deployment completes in under 5 minutes via deploy script

---

*Last updated: April 2026 | Guide version: 1.0*
