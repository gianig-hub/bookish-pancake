# Deployment Scripts and Notes

This folder contains deployment scripts, VPS configuration notes, and operational procedures.

## Contents

- `deploy.sh` — Deployment script for pulling and restarting services on the VPS *(TODO)*
- `healthcheck.sh` — Script to check service health after deployment *(TODO)*

## Deployment Approach

Deployment is handled via SSH + Docker Compose on a single Ubuntu VPS.

See `docs/deployment/VPS-SETUP.md` for the full setup guide.

## TODO

- [ ] Write `deploy.sh` script (git pull + docker compose up + health check)
- [ ] Write `healthcheck.sh` script
- [ ] Consider GitHub Actions deployment workflow (`.github/workflows/deploy.yml`)
- [ ] Document rollback procedure
