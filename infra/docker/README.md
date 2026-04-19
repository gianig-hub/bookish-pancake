# Docker Build Configurations

This folder contains Dockerfile examples and build notes for EK Marketplace services.

## Contents

- `web.Dockerfile` — Multi-stage build for Next.js frontend *(TODO)*
- `api.Dockerfile` — Multi-stage build for Express API *(TODO)*
- `worker.Dockerfile` — Build for BullMQ worker *(TODO)*

## Notes

- Production Dockerfiles should use multi-stage builds to minimise image size.
- Development builds use volume mounts for hot reload (see `docker-compose.yml`).
- Dockerfiles for each app live in `apps/<app>/Dockerfile`. This folder is for shared build utilities if needed.

## TODO

- [ ] Create production-ready Dockerfile for each app
- [ ] Add `.dockerignore` files to each app
- [ ] Set up Docker image tagging and versioning strategy
