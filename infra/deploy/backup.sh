#!/bin/bash
# =============================================================================
# EK Marketplace — Database Backup Script
# Usage: ./infra/deploy/backup.sh
# Set up as a cron job for automated backups.
# =============================================================================
set -euo pipefail

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/ekmarket"
BACKUP_FILE="$BACKUP_DIR/db_${TIMESTAMP}.sql.gz"

# Load env
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
if [ -f "$PROJECT_ROOT/.env" ]; then
  # shellcheck disable=SC1091
  set -a && source "$PROJECT_ROOT/.env" && set +a
fi

POSTGRES_USER="${POSTGRES_USER:-ekmarket}"
POSTGRES_DB="${POSTGRES_DB:-ekmarket_dev}"

echo "[backup] Starting backup of database: $POSTGRES_DB"
mkdir -p "$BACKUP_DIR"

# Create compressed backup
docker-compose exec -T postgres pg_dump \
  -U "$POSTGRES_USER" \
  "$POSTGRES_DB" | gzip > "$BACKUP_FILE"

echo "[backup] ✅ Backup saved to: $BACKUP_FILE"

# Remove backups older than 30 days
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete
echo "[backup] Old backups cleaned up (>30 days)"

# TODO: Optionally upload to S3
# aws s3 cp "$BACKUP_FILE" "s3://${AWS_S3_BUCKET}/backups/$(basename $BACKUP_FILE)"
