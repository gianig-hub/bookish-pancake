# apps/api

EK Marketplace — Backend API

## Technology

- **Node.js** + **Express** (or Fastify — TODO: finalise)
- **TypeScript**
- **@ek/types** and **@ek/config** for shared types
- **PostgreSQL** (via Prisma ORM — TODO: add once schema is defined)
- **Redis** (sessions, caching, rate limiting)

> TODO: Initialise with `express-generator` or equivalent scaffold.

---

## Module Structure

```
src/
  app.ts                ← Express app factory (middleware registration)
  server.ts             ← HTTP server entry point

  auth/                 ← Authentication module
    auth.controller.ts  ← POST /auth/login, POST /auth/logout, POST /auth/register
    auth.service.ts     ← Business logic: hash password, create session, verify token
    auth.routes.ts      ← Express router for /auth routes
    auth.schema.ts      ← Zod/Joi validation schemas for auth inputs

  users/                ← User management module
    users.controller.ts ← GET/PATCH /users/:id (admin), GET /users/me
    users.service.ts    ← Fetch, update user records
    users.routes.ts     ← Express router for /users routes

  roles/                ← Role management module
    roles.guard.ts      ← Middleware: check req.user.role against required roles
    roles.types.ts      ← Re-exports UserRole from @ek/types (no duplication)

  sessions/             ← Session management
    sessions.service.ts ← JWT generation, refresh, invalidation (Redis-backed)
    sessions.types.ts   ← Session token shapes

  health/               ← Health check endpoints
    health.controller.ts ← GET /health — returns { status: 'ok' }

  middleware/           ← Shared Express middleware
    auth.middleware.ts  ← Authenticate request (reads JWT from cookie/header)
    error.middleware.ts ← Global error handler
    rateLimiter.ts      ← Rate limiting per IP/user
    logger.ts           ← Request logging

  config/               ← App configuration
    env.ts              ← Validate and export environment variables
    app.config.ts       ← App-level constants (port, CORS origins, etc.)

  db/                   ← Database layer (placeholder)
    prisma.ts           ← Prisma client singleton (TODO: add schema)
```

---

## API Routes

| Method | Path | Description | Auth Required | Roles |
|--------|------|-------------|---------------|-------|
| `GET` | `/health` | Health check | No | — |
| `POST` | `/auth/register` | Create account | No | — |
| `POST` | `/auth/login` | Login | No | — |
| `POST` | `/auth/logout` | Logout | Yes | Any |
| `GET` | `/users/me` | Get current user | Yes | Any |
| `PATCH` | `/users/me` | Update profile | Yes | Any |
| `GET` | `/admin/users` | List all users | Yes | Admin |

> TODO: Add listing, business, wanted ad, and service endpoints in Phase 2.

---

## User Roles

Defined in `@ek/types` (see `packages/types/src/roles.ts`):

| Role | Description |
|------|-------------|
| `buyer` | Browse and enquire |
| `private_seller` | Post personal listings |
| `trader` | Paid seller with higher allowances |
| `dealer` | Verified dealer with business profile |
| `business` | Business/service provider account |
| `admin` | Full platform access |

---

## Environment Variables

Key variables (see `.env.example` in repo root):

```
API_PORT=4000
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
```

---

## Getting Started

```bash
# From repo root
npm install

# Run API only
npm run dev --workspace=apps/api
```

---

## TODOs

- [ ] Initialise Express/Fastify project
- [ ] Add Prisma with initial User + Session models
- [ ] Implement `auth.service.ts` (bcrypt password hashing, JWT creation)
- [ ] Implement `auth.middleware.ts` (JWT verification)
- [ ] Implement `roles.guard.ts` middleware
- [ ] Implement `health` endpoint
- [ ] Add Zod input validation to all routes
- [ ] Add rate limiting (express-rate-limit + Redis store)
- [ ] Add CORS config
- [ ] Add global error handler
