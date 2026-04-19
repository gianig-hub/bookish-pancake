# EK Marketplace — Backup Strategy

Database and file backup procedures.

---

## What to Back Up

| Asset | Method | Frequency | Retention |
|-------|--------|-----------|-----------|
| PostgreSQL database | `pg_dump` + gzip | Daily | 30 days local, 90 days S3 |
| Uploaded images | S3 versioning or rsync | Daily | 30 days |
| `.env` file | Manual secure copy | On change | Indefinitely |
| Nginx config | Git (checked in) | On change | Git history |

---

## Database Backup

### Manual Backup

```bash
./infra/deploy/backup.sh
```

Backups are saved to `/var/backups/ekmarket/` as `db_YYYYMMDD_HHMMSS.sql.gz`.

### Automated Backup (Cron)

```bash
# Run daily at 2 AM
0 2 * * * /opt/ekmarket/infra/deploy/backup.sh >> /var/log/ek_backup.log 2>&1
```

### Restore from Backup

```bash
# Stop services
docker compose stop api worker web

# Restore
gunzip -c /var/backups/ekmarket/db_YYYYMMDD_HHMMSS.sql.gz | \
  docker compose exec -T postgres psql -U ekmarket ekmarket_dev

# Restart services
docker compose start
```

---

## Image Backup (Production)

When using S3 for image storage:
- Enable S3 versioning on the uploads bucket
- Configure S3 lifecycle rules:
  - Keep current version: indefinitely
  - Keep non-current versions: 30 days

When using local storage (MVP):
```bash
# Sync uploads to remote backup location
rsync -avz /opt/ekmarket/apps/web/public/uploads/ backup-server:/backups/ek-uploads/
```

---

## Disaster Recovery

### Steps to Recover

1. **Provision new server** — follow [VPS_SETUP.md](VPS_SETUP.md)
2. **Clone repository** — `git clone ...`
3. **Restore environment** — copy `.env` from secure storage
4. **Start database** — `docker compose up -d postgres`
5. **Restore database** — see "Restore from Backup" above
6. **Start all services** — `docker compose up -d`
7. **Verify** — check health endpoint and spot-check data

### RTO / RPO Targets (MVP)

| Metric | Target |
|--------|--------|
| Recovery Time Objective (RTO) | < 2 hours |
| Recovery Point Objective (RPO) | < 24 hours (last backup) |

---

## Backup Verification

Test restores monthly:
1. Spin up a test environment
2. Restore latest backup
3. Verify data integrity (record counts, recent listings visible)
4. Discard test environment
