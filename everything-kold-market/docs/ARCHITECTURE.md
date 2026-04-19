# System Architecture Overview

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Internet                           │
└─────────────────────────┬───────────────────────────────┘
                          │
              ┌───────────▼──────────┐
              │     Nginx (proxy)    │
              └───────┬──────┬───────┘
                      │      │
          ┌───────────▼─┐  ┌─▼────────────┐
          │  Web App    │  │   REST API   │
          │  Next.js 14 │  │   Express    │
          │  Port 3000  │  │   Port 4000  │
          └─────────────┘  └──────┬───────┘
                                  │
                    ┌─────────────┼──────────────┐
                    │             │              │
          ┌─────────▼──┐  ┌──────▼──────┐  ┌───▼──────────┐
          │ PostgreSQL  │  │    Redis    │  │   Worker     │
          │  (Prisma)   │  │  (queues)   │  │  (Bull jobs) │
          └─────────────┘  └─────────────┘  └──────────────┘
```

## Monorepo Package Graph

```
apps/web
  ├── @ek/ui       (React components)
  ├── @ek/types    (TypeScript types)
  └── @ek/config   (constants)

apps/api
  ├── @ek/db       (Prisma client)
  ├── @ek/types
  └── @ek/config

apps/worker
  ├── @ek/db
  ├── @ek/ai       (AI services)
  ├── @ek/types
  └── @ek/config

packages/db
  └── @prisma/client

packages/ai
  ├── @ek/types
  └── @ek/config   (+ optional: openai)
```

## Data Flow: Listing Browse

```
Browser → Next.js (SSR) → API (/api/v1/listings?filter=...) → Prisma → PostgreSQL
                       ← JSON response ←────────────────────────────────────────
```

## Data Flow: Listing Create with AI

```
Browser → API → Worker Queue (Bull/Redis) → AI Package (OpenAI) → DB update
       ← listing ID returned immediately
       ← WebSocket/polling for AI result (TODO)
```

## Key Design Decisions

### Why npm workspaces + Turborepo?
- Native npm support, no extra tooling
- Turborepo handles incremental builds and caching
- Shared types catch errors at build time

### Why Next.js App Router?
- Server Components reduce client JS
- Built-in API routes for simple endpoints
- Excellent SEO support (metadata API, sitemap generation)

### Why Prisma?
- Type-safe queries generated from schema
- Migration history tracked in git
- Works well with PostgreSQL

### Why Bull (Redis queues)?
- Battle-tested job queue for Node.js
- Supports retries, delays, priorities
- UI available (bull-board) for monitoring

### Why AI in a separate package?
- Easy to disable without touching app logic
- Easy to swap providers (OpenAI → Anthropic, etc.)
- Testable in isolation
- Clear boundary prevents AI code sprawl

## Security Considerations

- All secrets via environment variables only
- Helmet on API (security headers)
- Rate limiting on all API routes
- Input validation via Zod
- Parameterized queries via Prisma (no SQL injection)
- CORS restricted to known origins
- Non-root Docker users in all containers
