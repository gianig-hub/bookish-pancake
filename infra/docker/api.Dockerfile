# apps/api Dockerfile — development
# TODO: Add multi-stage production build before deployment.

FROM node:20-alpine AS base

WORKDIR /app

COPY package.json ./
COPY tsconfig.base.json ./

COPY packages/types ./packages/types
COPY apps/api ./apps/api

RUN npm install --workspace=apps/api --workspace=packages/types

WORKDIR /app/apps/api

EXPOSE 4000

CMD ["npm", "run", "dev"]
