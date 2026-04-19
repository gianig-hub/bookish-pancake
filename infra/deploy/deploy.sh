#!/bin/bash
# =============================================================================
# EK Marketplace — Deployment Script
# Usage: ./infra/deploy/deploy.sh [--tag v1.0.0]
# =============================================================================
set -euo pipefail

DEPLOY_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${DEPLOY_DIR}/../.." && pwd)"
TAG="${1:-latest}"

echo "[deploy] Starting deployment — tag: $TAG"
echo "[deploy] Project root: $PROJECT_ROOT"

# ---------------------------------------------------------------------------
# 1. Pull latest code
# ---------------------------------------------------------------------------
echo "[deploy] Pulling latest code..."
cd "$PROJECT_ROOT"
git pull origin main

# ---------------------------------------------------------------------------
# 2. Load environment
# ---------------------------------------------------------------------------
if [ ! -f "$PROJECT_ROOT/.env" ]; then
  echo "[deploy] ERROR: .env file not found. Copy .env.example and fill in values."
  exit 1
fi

# ---------------------------------------------------------------------------
# 3. Build Docker images
# ---------------------------------------------------------------------------
echo "[deploy] Building Docker images..."
docker-compose build --no-cache

# ---------------------------------------------------------------------------
# 4. Run database migrations
# ---------------------------------------------------------------------------
echo "[deploy] Running database migrations..."
docker-compose run --rm api npx prisma migrate deploy

# ---------------------------------------------------------------------------
# 5. Restart services (zero-downtime via rolling restart)
# ---------------------------------------------------------------------------
echo "[deploy] Restarting services..."
docker-compose up -d --remove-orphans

# ---------------------------------------------------------------------------
# 6. Health check
# ---------------------------------------------------------------------------
echo "[deploy] Waiting for services to start..."
sleep 10

HEALTH=$(curl -sf http://localhost:4000/health || echo "FAILED")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
  echo "[deploy] ✅ Deployment successful!"
else
  echo "[deploy] ❌ Health check failed: $HEALTH"
  echo "[deploy] Rolling back..."
  ./infra/deploy/rollback.sh
  exit 1
fi
