# apps/api — EK Marketplace Backend API

## Responsibility

The `api` app is the **Express REST API backend** of EK Marketplace. It handles all business logic, database operations, authentication, and integrations (payments, email, AI in Phase 3).

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | HTTP server and routing |
| TypeScript | Type-safe server code |
| Prisma ORM | Database access (PostgreSQL) |
| Zod | Request/response validation |
| JWT | Stateless API authentication |
| BullMQ | Queue jobs (hand off to worker) |
| Redis | Queue backend + caching |

---

## Responsibilities

- **Listings CRUD** — create, read, update, delete listings
- **User auth** — register, login, JWT issuance, refresh tokens
- **Search** — filtered listing search (keyword, category, location)
- **Businesses** — business profile CRUD and directory
- **Service requests** — post and respond to service requests
- **File uploads** — accept and store listing images
- **Subscriptions** — Stripe webhook handling (Phase 2)
- **Moderation** — admin moderation queue (Phase 2)
- **AI endpoints** — AI-powered features (Phase 3)

---

## API Routes (Phase 1)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/v1/auth/register` | Create user account |
| POST | `/api/v1/auth/login` | Login, returns JWT |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/listings` | List/search listings |
| POST | `/api/v1/listings` | Create listing (auth required) |
| GET | `/api/v1/listings/:id` | Listing detail |
| PUT | `/api/v1/listings/:id` | Update listing (owner only) |
| DELETE | `/api/v1/listings/:id` | Delete listing (owner only) |
| GET | `/api/v1/categories` | Category tree |
| GET | `/api/v1/businesses` | Business directory |
| GET | `/api/v1/businesses/:id` | Business profile |
| POST | `/api/v1/upload` | Upload listing images |
| GET | `/health` | Health check endpoint |

---

## Connects To

| Target | How |
|--------|-----|
| PostgreSQL | Prisma ORM via `DATABASE_URL` |
| Redis | BullMQ queues + caching via `REDIS_URL` |
| `apps/worker` | Enqueues jobs (emails, AI tasks) |
| `packages/types` | Shared TypeScript types |
| `packages/config` | Shared constants and validation |
| `packages/ai` | AI service calls (Phase 3+) |

---

## Folder Structure

```
apps/api/
  src/
    routes/         # Express route definitions
      auth.ts
      listings.ts
      categories.ts
      businesses.ts
      upload.ts
      health.ts
    middleware/     # Express middleware
      auth.ts       # JWT validation
      validate.ts   # Zod request validation
      rateLimit.ts  # Rate limiting
      upload.ts     # Multer file uploads
    services/       # Business logic (separated from routes)
      listing.service.ts
      auth.service.ts
      business.service.ts
    lib/            # Utilities
      db.ts         # Prisma client singleton
      redis.ts      # Redis client
      logger.ts     # Pino logger
      errors.ts     # Custom error classes
    types/          # App-specific types
  prisma/
    schema.prisma   # Database schema
    migrations/     # Prisma migrations
    seed.ts         # Seed data (categories)
  Dockerfile
  package.json
  tsconfig.json
```

---

## Error Response Format

All API errors return:

```json
{
  "success": false,
  "error": "Human readable message",
  "code": "ERROR_CODE"
}
```

Success responses return:

```json
{
  "success": true,
  "data": { ... }
}
```

---

## Environment Variables

See `.env.example` at repo root.

Key variables for this app:
- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string
- `JWT_SECRET` — secret for signing tokens
- `JWT_EXPIRES_IN` — token expiry (e.g. `7d`)

---

## Running Locally

```bash
# From repo root
docker-compose up api

# Or directly (requires Node 20+)
cd apps/api
npm install
npm run dev
# → http://localhost:4000
# → http://localhost:4000/health
```

---

## Status

> **Starter shell — ready for Phase 1 implementation.**
> Next: Initialise Express app, set up Prisma with PostgreSQL, create first routes (health, listings).
