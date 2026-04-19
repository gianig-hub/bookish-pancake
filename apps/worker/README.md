# apps/worker — EK Marketplace Background Job Processor

## Responsibility

The `worker` app is the **background job processor** for EK Marketplace. It handles all asynchronous, non-request-critical work: sending emails, processing notifications, running AI tasks, cleaning up expired data, and more.

The worker reads jobs from Redis queues (via BullMQ), processes them, and updates the database with results.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + TypeScript | Runtime |
| BullMQ | Job queue processing |
| Redis | Queue backend |
| Prisma ORM | Database access |
| Nodemailer / Resend | Email sending |

---

## Responsibilities

- **Email sending** — verification, welcome, reset password, notifications
- **Listing expiry** — mark stale listings as expired/inactive
- **Image processing** — resize and optimise uploaded images
- **AI tasks (Phase 3)** — run moderation scoring, generate suggestions
- **Notifications** — in-app notification delivery
- **Subscription sync** — reconcile Stripe subscription status
- **Cleanup jobs** — purge old draft listings, expired sessions

---

## Job Queues

| Queue | Jobs |
|-------|------|
| `email` | `send-verification`, `send-welcome`, `send-reset`, `send-notification` |
| `listings` | `expire-listing`, `process-images`, `update-search-index` |
| `ai` | `moderate-listing`, `generate-suggestions`, `rank-search` (Phase 3) |
| `notifications` | `send-in-app`, `send-push` |
| `system` | `cleanup-drafts`, `sync-subscriptions` |

---

## Folder Structure

```
apps/worker/
  src/
    queues/           # Queue definitions and job types
      email.queue.ts
      listings.queue.ts
      ai.queue.ts
      notifications.queue.ts
      system.queue.ts
    processors/       # Job processor functions
      email/
        send-verification.ts
        send-welcome.ts
      listings/
        expire-listing.ts
        process-images.ts
      ai/             # Phase 3
        moderate-listing.ts
    lib/              # Utilities
      db.ts           # Prisma client
      redis.ts        # Redis + BullMQ connection
      logger.ts       # Worker logger
      email.ts        # Email sending helpers
    index.ts          # Worker entrypoint (starts all queues)
  Dockerfile
  package.json
  tsconfig.json
```

---

## How Jobs Are Dispatched

The `api` app enqueues jobs. Example from `apps/api`:

```typescript
import { emailQueue } from '@ek/worker-queues'; // or via direct BullMQ client

await emailQueue.add('send-verification', {
  userId: user.id,
  email: user.email,
  token: verificationToken,
});
```

The worker picks up the job and processes it independently of the HTTP request.

---

## Environment Variables

See `.env.example` at repo root.

Key variables for this app:
- `REDIS_URL` — Redis connection string
- `DATABASE_URL` — PostgreSQL connection string
- `EMAIL_PROVIDER` — `resend` or `smtp`
- `RESEND_API_KEY` — Resend API key (if using Resend)
- `EMAIL_FROM` — From address for all outgoing emails

---

## Running Locally

```bash
# From repo root
docker-compose up worker

# Or directly (requires Node 20+ and Redis running)
cd apps/worker
npm install
npm run dev
```

---

## Monitoring Jobs

BullMQ Dashboard (optional, add for Phase 2):

```bash
# bull-board or @bull-board/express can be added to the worker
# Exposes a UI at http://localhost:4001/queues (configurable)
```

---

## Status

> **Starter shell — ready for Phase 1 implementation.**
> Next: Set up BullMQ connections, implement email queue and verification email processor first (needed for auth).
