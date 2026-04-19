# apps/worker — Background Job Processor

## Responsibility

The **worker** app processes background jobs asynchronously, keeping the API fast and responsive.

- Email sending (registration confirmation, listing alerts)
- Image processing (resize, optimize after upload — Phase 2)
- AI suggestion generation (listing descriptions — Phase 3)
- Listing expiry and cleanup
- Notification delivery

## Tech Stack

| Tool | Purpose |
|------|---------|
| BullMQ | Job queue manager |
| Redis | Queue storage backend |
| Node.js | Runtime |
| TypeScript | Language |

## Structure

```
apps/worker/
├── src/
│   ├── index.ts              # Entry point — registers all workers
│   ├── queues/               # Queue definitions
│   │   └── email.queue.ts    # Email job queue
│   └── processors/           # Job handlers
│       └── email.processor.ts
├── package.json
└── tsconfig.json
```

## Job Queues

| Queue | Description | Phase |
|-------|------------|-------|
| `email` | Transactional emails | Phase 2 |
| `image-processing` | Resize/optimize images | Phase 2 |
| `ai-suggestions` | Generate AI listing descriptions | Phase 3 |
| `cleanup` | Expire old listings, purge data | Phase 1 |

## Development

```bash
cd apps/worker
npm run dev
```

The worker runs independently and connects to Redis to pick up jobs.

## Environment Variables

```bash
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://...
```

## Adding a New Job

1. Create queue in `src/queues/`
2. Create processor in `src/processors/`
3. Register both in `src/index.ts`
4. Add job type to `packages/types`
