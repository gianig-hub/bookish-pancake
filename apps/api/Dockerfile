# TODO: Replace this placeholder with a real multi-stage Dockerfile once the Express app is initialised.
# See apps/api/README.md for planned structure.
#
# Example multi-stage build:
#
# FROM node:20-alpine AS base
# WORKDIR /app
#
# FROM base AS deps
# COPY package*.json ./
# RUN npm ci --omit=dev
#
# FROM base AS builder
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build
#
# FROM base AS runner
# ENV NODE_ENV=production
# COPY --from=deps /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# EXPOSE 4000
# CMD ["node", "dist/index.js"]
