# infra/docker — Dockerfiles

Dockerfiles for each service in the EK Marketplace.

## Files

| File | Service |
|------|---------|
| `Dockerfile.web` | Next.js frontend (multi-stage, production-optimised) |
| `Dockerfile.api` | Express API (multi-stage) |
| `Dockerfile.worker` | Bull worker (multi-stage) |
| `.dockerignore` | Files excluded from Docker build context |

## Building Locally

```bash
# Build all services via Docker Compose
docker-compose build

# Build individual service
docker build -f infra/docker/Dockerfile.web -t ek-web .
docker build -f infra/docker/Dockerfile.api -t ek-api .
docker build -f infra/docker/Dockerfile.worker -t ek-worker .
```

## Notes

- All Dockerfiles use multi-stage builds for smaller production images
- Non-root users are used in production stages for security
- Node.js 20 Alpine base for minimal footprint
- Build context is the monorepo root (run from root, not this directory)
