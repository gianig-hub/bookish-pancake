# apps/api — EK Marketplace Backend API

## Responsibility

This app is the **core backend API** for EK Marketplace.

It handles:
- All business logic
- Database access (via Prisma + PostgreSQL)
- Authentication and session management
- Listing, business, and user CRUD operations
- Search and filtering
- Input validation
- Rate limiting
- File upload handling

It does **not** handle AI calls directly. AI tasks are queued and processed by `apps/worker`.

---

## Tech Stack

- **Node.js + TypeScript**
- **Express** for HTTP routing
- **Prisma** for database access (PostgreSQL)
- **Redis** for rate limiting and caching
- **Zod** for request validation
- **JWT / session tokens** for authentication
- Shared types from `packages/types`
- Shared config from `packages/config`

---

## Folder Structure

```
apps/api/
├── src/
│   ├── routes/           # Express route handlers
│   │   ├── auth.ts       # /auth endpoints (register, login, logout)
│   │   ├── listings.ts   # /listings endpoints
│   │   ├── businesses.ts # /businesses endpoints
│   │   ├── users.ts      # /users endpoints
│   │   └── health.ts     # /health endpoint
│   ├── middleware/       # Auth, rate limiting, validation, error handling
│   ├── services/         # Business logic (listingService, userService, etc.)
│   ├── lib/              # Database client, Redis client, utilities
│   └── index.ts          # App entry point
├── prisma/
│   ├── schema.prisma     # Database schema (TODO)
│   └── migrations/       # Prisma migrations (TODO)
├── Dockerfile            # Production multi-stage build (TODO)
├── tsconfig.json         # TypeScript configuration (TODO)
└── package.json          # Dependencies (TODO)
```

---

## Key Endpoints (Planned)

```
GET  /health                    → Service health check
POST /api/auth/register         → Create user account
POST /api/auth/login            → Authenticate user
POST /api/auth/logout           → End session
GET  /api/listings              → List/search listings
POST /api/listings              → Create listing (auth required)
GET  /api/listings/:id          → Get single listing
PUT  /api/listings/:id          → Update listing (owner only)
DELETE /api/listings/:id        → Delete listing (owner only)
GET  /api/businesses            → List businesses
POST /api/businesses            → Create business profile (auth required)
GET  /api/businesses/:id        → Get business profile
```

---

## Connects To

- PostgreSQL (via Prisma)
- Redis (rate limiting, caching)
- `apps/worker` (queues jobs via BullMQ)
- `packages/types` — shared TypeScript types
- `packages/config` — shared configuration

---

## Environment Variables

See `.env.example` at the root. Key ones for this app:

```
DATABASE_URL
REDIS_URL
JWT_SECRET
API_CORS_ORIGIN
API_PORT
```

---

## Local Development

```bash
# From repo root (with Docker Compose)
docker-compose up api

# Or standalone
cd apps/api
npm install
npm run dev
```

---

## TODO

- [ ] Initialise Express + TypeScript app
- [ ] Set up Prisma with PostgreSQL
- [ ] Add `GET /health` endpoint
- [ ] Add auth middleware (JWT validation)
- [ ] Add Zod validation middleware
- [ ] Add rate limiting middleware (Redis-backed)
- [ ] Create `Dockerfile` for production build
