# infra/deploy — Deployment Scripts

Deployment, rollback, and backup scripts for EK Marketplace.

## Scripts

| Script | Purpose |
|--------|---------|
| `deploy.sh` | Full deployment: pull, build, migrate, restart |
| `rollback.sh` | Revert to previous Git commit |
| `backup.sh` | Create a compressed PostgreSQL backup |

## Usage

```bash
# Deploy latest code
chmod +x infra/deploy/*.sh
./infra/deploy/deploy.sh

# Rollback if something goes wrong
./infra/deploy/rollback.sh

# Manual database backup
./infra/deploy/backup.sh
```

## Automated Backups (Cron)

Add to crontab for daily backups at 2 AM:

```bash
0 2 * * * /path/to/project/infra/deploy/backup.sh >> /var/log/ek_backup.log 2>&1
```

## See Also

- [VPS Setup Guide](../../docs/deployment/VPS_SETUP.md)
- [Monitoring Guide](../../docs/deployment/MONITORING.md)
- [Backup Strategy](../../docs/deployment/BACKUPS.md)
