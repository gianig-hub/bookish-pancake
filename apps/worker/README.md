# apps/worker — KoldMarket Background Worker

Background job processor for the marketplace. Runs independently of the API.

---

## Responsibility

This app processes **background jobs** that should not block API responses. It handles:

- **Email delivery** — send notifications, alerts, verification emails via Resend
- **AI processing** — AI jobs that take too long for a synchronous API call (e.g. listing moderation, duplicate detection)
- **Image processing** — resize/optimise uploaded images
- **Listing alerts** — notify users when a listing matching their saved search appears
- **Scheduled tasks** — expire old listings, clean up draft listings, generate SEO sitemaps
- **Stripe webhooks** — process subscription events asynchronously

Jobs are stored in Redis and processed using BullMQ. If the worker crashes, jobs are retried automatically.

---

## Tech Stack

- [Node.js 20](https://nodejs.org/)
- [BullMQ](https://bullmq.io/) — Redis-backed job queue
- [TypeScript](https://www.typescriptlang.org/)
- Shared types from `packages/types`
- Shared AI modules from `packages/ai`

---

## Local Development

```bash
# From repo root (recommended — starts all services including Redis)
docker-compose up

# Worker will start automatically and connect to Redis
# View worker logs:
docker-compose logs -f worker
```

---

## Structure

```
apps/worker/
├── src/
│   ├── index.ts              # Entry point — registers queues and starts workers
│   └── jobs/
│       ├── send-email.ts     # Email delivery job
│       ├── ai-moderation.ts  # AI content moderation
│       ├── duplicate-check.ts # Duplicate listing detection
│       ├── image-resize.ts   # Image optimisation
│       └── listing-alerts.ts # Notify saved-search users
├── Dockerfile.dev
├── package.json
└── tsconfig.json
```

---

## Adding a New Job

1. Create a job handler in `src/jobs/my-job.ts`
2. Define a queue and worker in `src/index.ts`
3. Enqueue from `apps/api` using the BullMQ client

```typescript
// In apps/api — add job to queue
import { Queue } from 'bullmq'
const emailQueue = new Queue('email', { connection: redisClient })
await emailQueue.add('send-verification', { userId, email })

// In apps/worker/src/jobs/send-email.ts — process the job
import { Worker } from 'bullmq'
new Worker('email', async (job) => {
  // handle job
})
```

---

## Environment Variables

See `.env.example` in the repo root. Key variables:

- `DATABASE_URL` — PostgreSQL connection string
- `REDIS_URL` — Redis connection string (also the queue backend)
- `OPENAI_API_KEY` — For AI jobs
- `RESEND_API_KEY` — For email delivery
