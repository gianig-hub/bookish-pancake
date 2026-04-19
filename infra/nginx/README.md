# infra/nginx — Nginx Configuration

Nginx reverse proxy configuration for EK Marketplace.

## Files

| File | Purpose |
|------|---------|
| `nginx.conf` | Local development configuration |
| `production.conf` | Production template (requires SSL) |

## Local Development

Used automatically by Docker Compose with the `--profile full` flag:

```bash
docker-compose --profile full up
```

Without the full profile, the web and API are accessible directly on their ports.

## Production Setup

1. Copy `production.conf` to your server
2. Replace `YOUR_DOMAIN` with your domain name
3. Obtain SSL certificate via Let's Encrypt:
   ```bash
   certbot certonly --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN
   ```
4. Copy to `/etc/nginx/nginx.conf`
5. Test and reload: `nginx -t && nginx -s reload`

See [VPS Setup Guide](../../docs/deployment/VPS_SETUP.md) for full instructions.
