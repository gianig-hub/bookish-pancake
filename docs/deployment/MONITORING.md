# EK Marketplace — Monitoring Guide

Monitoring uptime, logs, and metrics for EK Marketplace.

---

## Health Endpoints

| Service | Endpoint | Expected |
|---------|----------|---------|
| API | `GET /health` | `{"status":"ok"}` |
| Web | `GET /` | HTTP 200 |
| Nginx | Direct port 80/443 | HTTP 200 |

---

## Docker Log Monitoring

```bash
# Follow all service logs
docker compose logs -f

# Follow specific service
docker compose logs -f api
docker compose logs -f web
docker compose logs -f worker

# Last 100 lines
docker compose logs --tail=100 api
```

---

## Nginx Logs

```bash
# Access log
tail -f /var/log/nginx/access.log

# Error log
tail -f /var/log/nginx/error.log
```

---

## Resource Monitoring

```bash
# Container resource usage
docker stats

# Disk usage
df -h
docker system df

# Memory
free -h

# CPU
top
htop  # install with: apt install htop
```

---

## Uptime Monitoring (External)

Recommended free services:
- [UptimeRobot](https://uptimerobot.com) — monitors every 5 minutes
- [BetterUptime](https://betteruptime.com) — with incident alerts

Configure to monitor:
1. `https://yourdomain.co.uk` (web)
2. `https://yourdomain.co.uk/health` (API via Nginx proxy)

---

## Error Monitoring (Optional)

Configure [Sentry](https://sentry.io) for error tracking:

1. Create a Sentry project
2. Add `SENTRY_DSN` to `.env`
3. TODO: Install Sentry SDK in API and Web apps

---

## Database Monitoring

```bash
# Connect to PostgreSQL
docker compose exec postgres psql -U ekmarket -d ekmarket_dev

# Check connections
SELECT count(*) FROM pg_stat_activity;

# Check table sizes
SELECT relname, pg_size_pretty(pg_total_relation_size(relid))
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

---

## Redis Monitoring

```bash
# Connect to Redis
docker compose exec redis redis-cli

# Check memory usage
INFO memory

# Monitor commands in real time
MONITOR
```

---

## Alerts Checklist

Set up alerts for:
- [ ] API health endpoint down
- [ ] Docker container exits unexpectedly
- [ ] Disk usage > 80%
- [ ] Database connection failures
- [ ] Redis queue depth > 1000
