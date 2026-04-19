# TODO: Replace this placeholder with a real multi-stage Dockerfile once the Next.js app is initialised.
# See apps/web/README.md for planned structure.
#
# Example multi-stage build:
#
# FROM node:20-alpine AS base
# WORKDIR /app
#
# FROM base AS deps
# COPY package*.json ./
# RUN npm ci
#
# FROM base AS builder
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build
#
# FROM base AS runner
# ENV NODE_ENV=production
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# COPY --from=builder /app/public ./public
# EXPOSE 3000
# CMD ["node", "server.js"]
