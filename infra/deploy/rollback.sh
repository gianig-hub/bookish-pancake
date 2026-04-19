#!/bin/bash
# =============================================================================
# EK Marketplace — Rollback Script
# Reverts to the previous Git commit and restarts services.
# Usage: ./infra/deploy/rollback.sh
# =============================================================================
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

echo "[rollback] Starting rollback..."
cd "$PROJECT_ROOT"

PREVIOUS_COMMIT=$(git rev-parse HEAD~1)
echo "[rollback] Rolling back to commit: $PREVIOUS_COMMIT"

git checkout "$PREVIOUS_COMMIT"

echo "[rollback] Rebuilding previous version..."
docker-compose build --no-cache

echo "[rollback] Restarting services..."
docker-compose up -d --remove-orphans

echo "[rollback] ✅ Rollback complete. Running on commit: $PREVIOUS_COMMIT"
