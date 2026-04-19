#!/bin/bash
# =============================================================================
# EK Marketplace — Development Setup Script
# Run once after cloning to prepare your local dev environment.
# Usage: ./scripts/setup.sh
# =============================================================================
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "=========================================="
echo " EK Marketplace — Dev Setup"
echo "=========================================="

# ---------------------------------------------------------------------------
# 1. Check prerequisites
# ---------------------------------------------------------------------------
echo ""
echo "[1/5] Checking prerequisites..."

command -v node >/dev/null 2>&1 || { echo "❌ Node.js not found. Install Node.js 20+"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm not found."; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker not found. Install Docker Desktop."; exit 1; }

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20+ required. Found: $(node -v)"
  exit 1
fi

echo "✅ Node.js $(node -v)"
echo "✅ npm $(npm -v)"
echo "✅ Docker $(docker --version | cut -d' ' -f3 | tr -d ',')"

# ---------------------------------------------------------------------------
# 2. Set up environment file
# ---------------------------------------------------------------------------
echo ""
echo "[2/5] Setting up environment..."

if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "✅ Created .env from .env.example"
  echo "   ⚠️  Edit .env with your local values before starting services."
else
  echo "✅ .env already exists (skipped)"
fi

# ---------------------------------------------------------------------------
# 3. Install dependencies
# ---------------------------------------------------------------------------
echo ""
echo "[3/5] Installing npm dependencies..."
npm install
echo "✅ Dependencies installed"

# ---------------------------------------------------------------------------
# 4. Start Docker services
# ---------------------------------------------------------------------------
echo ""
echo "[4/5] Starting Docker services (postgres, redis)..."
docker compose up -d postgres redis
echo "✅ Database and Redis started"

# ---------------------------------------------------------------------------
# 5. Summary
# ---------------------------------------------------------------------------
echo ""
echo "=========================================="
echo " Setup complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Edit .env with your configuration"
echo "  2. Run: npm run dev"
echo "  3. Web:  http://localhost:3000"
echo "  4. API:  http://localhost:4000"
echo ""
