# apps/api — EK Marketplace Backend API

> Express backend service. Handles all business logic, data access, authentication, and API endpoints.

---

## Responsibility

This app is the **backend** of the platform. It handles:

- Authentication — register, login, JWT issuance and validation
- Listings — CRUD for equipment and service listings
- Businesses — business profile management
- Search — listing and business search with filters
- File uploads — listing images and business logos
- User account management — profile, settings, subscriptions
- Moderation — listing status transitions (pending → approved → rejected)
- Webhooks — Stripe payment events

This app **does not** process background jobs. Long-running tasks are offloaded to `apps/worker` via Redis queues.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + Express | HTTP server framework |
| TypeScript | Type safety |
| Prisma ORM | Database access (PostgreSQL) |
| Zod | Input validation |
| BullMQ | Queue producer (sends jobs to worker) |
| Redis | Session cache, rate limiting |
| express-rate-limit | Rate limiting middleware |
| jsonwebtoken | JWT signing and verification |
| multer | File upload handling |

---

## Folder Structure

```
apps/api/
├── src/
│   ├── routes/        # Express route definitions (one file per resource)
│   ├── controllers/   # Request handlers — call services, return responses
│   ├── services/      # Business logic — database queries, external calls
│   ├── middleware/     # Auth, validation, rate limiting, error handling
│   ├── jobs/          # Queue producers — enqueue background jobs
│   ├── lib/           # Database client, Redis client, utilities
│   └── types/         # Local API types (prefer packages/types for shared)
├── prisma/
│   └── schema.prisma  # Database schema (TODO: define in Phase 1)
├── uploads/           # Local file storage (dev only)
├── .env.local
└── tsconfig.json
```

---

## Key API Endpoints (Planned)

| Method | Route | Purpose |
|--------|-------|---------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login, returns JWT |
| `GET` | `/listings` | Browse listings (with filters) |
| `POST` | `/listings` | Create a listing |
| `GET` | `/listings/:id` | Get listing detail |
| `PUT` | `/listings/:id` | Update a listing |
| `DELETE` | `/listings/:id` | Delete a listing |
| `GET` | `/businesses` | Browse businesses |
| `POST` | `/businesses` | Create a business profile |
| `GET` | `/businesses/:id` | Get business detail |
| `POST` | `/ai/suggest-listing` | AI listing suggestions (Phase 3) |
| `POST` | `/ai/suggest-category` | AI category suggestion (Phase 3) |

---

## Local Development

```bash
# From repo root
docker-compose up api

# Or run directly (requires postgres and redis)
cd apps/api
npm install
npm run dev
```

Available at: `http://localhost:4000`

---

## TODO

- [ ] Initialise Node.js + Express + TypeScript project
- [ ] Set up Prisma with PostgreSQL
- [ ] Implement auth routes and JWT middleware
- [ ] Implement listings CRUD
- [ ] Add Zod validation on all POST/PUT routes
- [ ] Add rate limiting to auth and post endpoints
