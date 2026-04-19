#!/bin/bash
# =============================================================================
# EK Marketplace — Development Start Script
# Starts all services for local development.
# Usage: ./scripts/dev.sh
# =============================================================================
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[dev] Starting EK Marketplace development environment..."

# Ensure Docker services are running
docker compose up -d postgres redis
echo "[dev] ✅ Postgres and Redis running"

# Start all apps via Turborepo
echo "[dev] Starting all apps..."
npm run dev
