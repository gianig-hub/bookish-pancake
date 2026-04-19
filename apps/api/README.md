# apps/api — KoldMarket Backend API

The backend REST API for the marketplace. Built with Node.js and Express.

---

## Responsibility

This app is the **data and business logic layer**. It handles:

- User registration and authentication (JWT)
- Listings CRUD (create, read, update, delete)
- Categories and taxonomy
- Business profiles
- Wanted ads
- Image upload (generates signed URLs for object storage)
- AI feature endpoints (calls `packages/ai`)
- Background job queuing (via BullMQ / Redis)
- Payment webhooks (Stripe)
- Admin endpoints for moderation

All data is persisted in PostgreSQL. Redis is used for caching and job queuing.

---

## Tech Stack

- [Node.js 20](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/) — type-safe PostgreSQL access
- [Zod](https://zod.dev/) — input validation
- [BullMQ](https://bullmq.io/) — job queue (uses Redis)
- Shared types from `packages/types`

---

## Local Development

```bash
# From repo root (recommended)
docker-compose up

# Or run API only (requires postgres + redis running)
cd apps/api
npm run dev
# → http://localhost:4000
# → http://localhost:4000/health
```

---

## Structure

```
apps/api/
├── src/
│   ├── index.ts          # Entry point — creates Express app, starts server
│   ├── routes/
│   │   ├── health.ts     # GET /health
│   │   ├── auth.ts       # POST /auth/register, /auth/login
│   │   ├── listings.ts   # CRUD /listings
│   │   ├── categories.ts # GET /categories
│   │   ├── businesses.ts # CRUD /businesses
│   │   ├── uploads.ts    # POST /uploads/sign
│   │   └── ai.ts         # POST /ai/listing-draft, /ai/search
│   ├── middleware/
│   │   ├── auth.ts       # JWT verification
│   │   └── error.ts      # Global error handler
│   ├── db/
│   │   ├── client.ts     # Drizzle client setup
│   │   ├── schema/       # Table definitions
│   │   └── migrations/   # Migration files
│   └── services/         # Business logic (listing-service, etc.)
├── Dockerfile.dev
├── package.json
└── tsconfig.json
```

---

## API Response Format

All routes return:

```json
{
  "data": { ... },
  "error": null,
  "meta": { "page": 1, "total": 42 }
}
```

On error:

```json
{
  "data": null,
  "error": { "code": "VALIDATION_ERROR", "message": "Title is required" }
}
```

---

## Environment Variables

See `.env.example` in the repo root. Key variables:

- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string
- `JWT_SECRET` — Secret for signing JWT tokens
- `OPENAI_API_KEY` — For AI endpoints
