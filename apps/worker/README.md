# apps/worker — EK Marketplace Background Worker

## Responsibility

This app is the **background job processor** for EK Marketplace.

It handles all asynchronous work that should not run in the main request/response cycle:

- Sending transactional emails (registration, password reset, lead notifications)
- Processing AI tasks (listing description generation, moderation scoring)
- Scheduled cleanup jobs (expired listings, old sessions)
- Push notifications and alerts
- Webhook delivery

It does **not** expose any HTTP endpoints (except a health check for monitoring).

---

## Tech Stack

- **Node.js + TypeScript**
- **BullMQ** for job queuing (backed by Redis)
- **Redis** as the queue backend
- AI calls routed through `packages/ai`
- Shared types from `packages/types`
- Shared config from `packages/config`

---

## Folder Structure

```
apps/worker/
├── src/
│   ├── queues/           # Queue definitions and producers
│   │   ├── emailQueue.ts     # Email job queue
│   │   ├── aiQueue.ts        # AI task queue
│   │   └── cleanupQueue.ts   # Maintenance job queue
│   ├── processors/       # Job handler functions
│   │   ├── emailProcessor.ts
│   │   ├── aiProcessor.ts
│   │   └── cleanupProcessor.ts
│   ├── lib/              # Redis client, email client, utilities
│   └── index.ts          # Worker entry point (registers all processors)
├── Dockerfile            # Production build (TODO)
├── tsconfig.json         # TypeScript configuration (TODO)
└── package.json          # Dependencies (TODO)
```

---

## Queue Types (Planned)

| Queue | Jobs | Priority |
|---|---|---|
| `email` | Registration confirm, password reset, lead notification, listing approved | High |
| `ai` | Listing description generation, spam scoring, moderation flagging | Medium |
| `cleanup` | Expire old listings, delete soft-deleted records, session cleanup | Low |

---

## Connects To

- Redis (via BullMQ for queues)
- PostgreSQL (for reading/updating records as part of job processing)
- `packages/ai` — AI task handling
- `packages/types` — shared types
- External: SMTP server (email), OpenAI API (AI tasks)

---

## Environment Variables

See `.env.example` at the root. Key ones for this app:

```
REDIS_URL
DATABASE_URL
EMAIL_FROM
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
OPENAI_API_KEY
AI_ENABLED
```

---

## Local Development

```bash
# From repo root (with Docker Compose)
docker-compose up worker

# Or standalone (requires Redis and PostgreSQL running)
cd apps/worker
npm install
npm run dev
```

---

## Design Principles

- **Jobs must be idempotent**: Running the same job twice should not cause duplicate effects.
- **Failures are retried**: BullMQ handles retries with backoff. Set `attempts: 3` on all jobs.
- **AI is optional**: If `AI_ENABLED=false`, AI jobs are skipped without error.
- **No synchronous AI in API**: The API enqueues AI jobs and responds immediately. The worker processes them.

---

## TODO

- [ ] Initialise BullMQ + TypeScript setup
- [ ] Create email queue and processor (basic send)
- [ ] Create AI queue and processor (stub with feature flag check)
- [ ] Create cleanup queue and processor
- [ ] Add `Dockerfile` for production build
- [ ] Add health check endpoint for monitoring
