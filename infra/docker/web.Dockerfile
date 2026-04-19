# apps/web Dockerfile — development
# TODO: Add multi-stage production build before deployment.

FROM node:20-alpine AS base

WORKDIR /app

# Copy root workspace config
COPY package.json ./
COPY tsconfig.base.json ./

# Copy packages (types)
COPY packages/types ./packages/types

# Copy web app
COPY apps/web ./apps/web

# Install dependencies
RUN npm install --workspace=apps/web --workspace=packages/types

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]
