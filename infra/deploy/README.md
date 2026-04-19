# infra/deploy

Deployment scripts and utilities.

## TODO

- [ ] Add `scripts/deploy.sh` — pull latest, rebuild Docker images, restart services
- [ ] Add `scripts/backup-db.sh` — PostgreSQL backup to file
- [ ] Add `scripts/restore-db.sh` — Restore from backup file
- [ ] Add `scripts/rollback.sh` — Roll back to previous Docker image tag

## Deployment Flow (Planned)

```bash
git pull origin main
docker compose build
docker compose up -d
docker compose exec api npx prisma migrate deploy
```

See `docs/deployment/VPS-SETUP.md` for full server setup guide.
