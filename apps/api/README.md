# apps/api — Express Backend API

The backend API for Kold Market. Handles all business logic, database access, authentication, and job queuing. Internal to Docker — exposed to the web via Nginx reverse proxy.

---

## Responsibility

- Serves all REST API endpoints consumed by the web frontend
- Manages database reads and writes via Prisma ORM
- Issues and validates JWT / session tokens (used by NextAuth)
- Enqueues background jobs into Redis (consumed by `apps/worker`)
- Enforces authorization rules and rate limiting

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Express | HTTP server framework |
| TypeScript | Type safety (via `packages/types`) |
| PostgreSQL | Primary database |
| Prisma ORM | Database access and migrations |
| Redis | Cache and job queue backing store |
| BullMQ | Job producer (enqueues tasks for worker) |

---

## Key Endpoints

| Endpoint | Purpose |
|---|---|
| `GET/POST /listings` | Browse and create listings |
| `GET/POST /businesses` | Business directory |
| `POST /auth/*` | Authentication endpoints |
| `GET /search` | Search and filter listings |
| `GET/POST /services` | Service requests |
| `GET /health` | Health check for Docker/Nginx |

---

## Structure

```
apps/api/
├── src/
│   └── index.ts      # Express app entry point (placeholder)
├── prisma/           # Prisma schema and migrations (to be created)
├── package.json      # App dependencies (to be created)
├── tsconfig.json     # TypeScript config (to be created)
└── README.md
```

---

## Environment Variables

See `.env.example` at repo root. Key vars for this app:

```
DATABASE_URL=postgresql://...
REDIS_URL=redis://redis:6379
JWT_SECRET=...
PORT=4000
```

---

## Dependencies

- Requires PostgreSQL and Redis (provided via `docker-compose.yml`)
- Uses shared types from `packages/types`
- Uses shared config from `packages/config`
- Must be running before `apps/web` can serve data

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [packages/types](../../packages/types/README.md)
- [packages/config](../../packages/config/README.md)
