# EK Marketplace — System Design

## High-Level Architecture

```
                ┌─────────────────────────────────────┐
                │              Browser / Client        │
                └──────────────┬──────────────────────┘
                               │ HTTPS
                ┌──────────────▼──────────────────────┐
                │           Nginx Reverse Proxy        │
                │         (SSL termination)            │
                └──────────┬───────────┬──────────────┘
                           │           │
              ┌────────────▼──┐   ┌────▼──────────────┐
              │  Web (Next.js)│   │   API (Express)    │
              │  :3000        │   │   :4000            │
              └───────────────┘   └─────────┬──────────┘
                                            │
                               ┌────────────▼───────────┐
                               │   Worker (Bull/Node)    │
                               └────────────┬────────────┘
                                            │
                      ┌─────────────────────┼─────────────┐
                      │                     │             │
              ┌───────▼──────┐   ┌──────────▼──┐   ┌─────▼──────┐
              │  PostgreSQL  │   │    Redis     │   │  AI APIs   │
              │  (data)      │   │  (cache,q)   │   │  (OpenAI)  │
              └──────────────┘   └─────────────┘   └────────────┘
```

## Services

| Service | Role | Port |
|---------|------|------|
| **web** | Next.js frontend, SSR pages, auth | 3000 |
| **api** | REST API, business logic, validation | 4000 |
| **worker** | Background jobs, emails, AI tasks | — |
| **postgres** | Primary relational database | 5432 |
| **redis** | Session cache, queue backend | 6379 |
| **nginx** | Reverse proxy, SSL, rate limiting | 80/443 |

## Data Flow

### Listing Creation
1. User fills form on web app
2. Web calls `POST /api/v1/listings`
3. API validates, saves to PostgreSQL
4. API queues a `process-listing` job
5. Worker picks up job, resizes images, sends confirmation email
6. Worker optionally queues `moderate-listing` AI job

### Search
1. User types search query
2. Web calls `GET /api/v1/listings?query=...&filters=...`
3. API queries PostgreSQL (full-text + filters)
4. (Phase 2) AI layer enhances query before DB call
5. Results returned with pagination

### Contact Seller
1. Buyer submits contact form
2. Web calls `POST /api/v1/messages`
3. API saves to PostgreSQL, queues email job
4. Worker sends email to seller

## Monorepo Package Dependency Graph

```
apps/web      → packages/ui, packages/config, packages/types
apps/api      → packages/config, packages/types, packages/db
apps/worker   → packages/ai, packages/config, packages/types, packages/db
packages/ai   → (no internal deps)
packages/db   → (no internal deps, exports @prisma/client)
packages/ui   → (no internal deps)
packages/config → (no internal deps)
packages/types  → (no internal deps)
```

## Scalability Notes

- All services are stateless and horizontally scalable
- PostgreSQL connection pooling via Prisma
- Redis used for session cache and Bull queue backend
- Images served from S3/CDN in production
- Nginx handles SSL termination and load distribution
