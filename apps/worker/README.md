# apps/worker — EK Marketplace Background Worker

> Background job processor for EK Marketplace. Handles async tasks that should not block API responses.

---

## Responsibility

This app processes background jobs offloaded by `apps/api`. It handles:

- **Email sending** — listing published confirmations, enquiry notifications, welcome emails
- **AI jobs** — listing moderation scoring, spam detection, duplicate detection
- **Image processing** — resize/optimise uploaded listing images
- **Cleanup tasks** — expire old listings, archive stale data
- **Notifications** — push or in-app notification delivery

This app **does not** expose an HTTP server. It connects to Redis queues and processes jobs as they arrive.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js + TypeScript | Runtime |
| BullMQ | Queue consumer and scheduler |
| Redis | Queue backend |
| Nodemailer | Email sending |
| Prisma ORM | Database access (same schema as api) |
| `packages/ai` | AI processing modules |

---

## Folder Structure

```
apps/worker/
├── src/
│   ├── queues/        # Queue definitions and names
│   ├── processors/    # Job handlers (one file per queue type)
│   │   ├── email.processor.ts
│   │   ├── moderation.processor.ts
│   │   ├── image.processor.ts
│   │   └── cleanup.processor.ts
│   ├── schedulers/    # Recurring cron-style jobs
│   ├── lib/           # Redis client, Prisma client, utilities
│   └── index.ts       # Worker entry point — registers all processors
├── .env.local
└── tsconfig.json
```

---

## Queue Definitions (Planned)

| Queue | Trigger | Jobs |
|-------|---------|------|
| `email` | API or worker event | Send transactional emails |
| `moderation` | Listing submitted | AI moderation scoring, spam check |
| `image` | Image upload | Resize, optimise, move to storage |
| `cleanup` | Scheduled (cron) | Archive expired listings, purge soft-deletes |
| `notifications` | User action | Deliver in-app or push notifications |

---

## Local Development

```bash
# From repo root — worker starts automatically with docker-compose
docker-compose up worker

# Or run directly (requires postgres and redis)
cd apps/worker
npm install
npm run dev
```

> The worker has no public port. Monitor it via `docker compose logs worker`.

---

## TODO

- [ ] Initialise Node.js + TypeScript project
- [ ] Set up BullMQ with Redis connection
- [ ] Implement email queue processor
- [ ] Implement AI moderation processor (Phase 3)
- [ ] Add scheduled cleanup job
- [ ] Add health check endpoint (optional, for monitoring)
