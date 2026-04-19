# infra/docker

Docker-related configuration files.

## Contents

- `Dockerfile` templates for each app (TODO: add once apps are initialised)
- `.dockerignore` files

## TODO

- [ ] Add `apps/web/Dockerfile` (multi-stage Next.js build)
- [ ] Add `apps/api/Dockerfile` (multi-stage Node.js build)
- [ ] Add `apps/worker/Dockerfile`
- [ ] Add `.dockerignore` files to each app

## Notes

- All Dockerfiles use multi-stage builds (build stage + production stage)
- Production images should use `node:20-alpine` base
- Never include `node_modules` or `.env` in the image
