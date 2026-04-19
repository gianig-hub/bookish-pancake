FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package*.json ./
COPY apps/worker/package*.json ./apps/worker/
COPY packages/types/package*.json ./packages/types/
COPY packages/config/package*.json ./packages/config/
RUN npm install

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=apps/worker

# Run
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/apps/worker/dist ./apps/worker/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/worker/package.json ./apps/worker/package.json
WORKDIR /app/apps/worker
CMD ["node", "dist/index.js"]
