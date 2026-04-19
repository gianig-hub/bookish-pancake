# apps/worker — EK Marketplace Background Worker

Node.js worker process for background jobs and AI processing.

## Development

```bash
# From monorepo root
npm run dev

# Or directly
cd apps/worker
npm run dev
```

## Stack
- Node.js + TypeScript
- Bull (Redis-backed job queues)
- ioredis

## Planned Job Queues

| Queue | Purpose |
|---|---|
| `listing` | Listing moderation, expiry, slug generation |
| `email` | Transactional email sending |
| `ai` | AI-powered listing descriptions, moderation |
| `image` | Image processing and optimisation |

## Environment Variables

- `REDIS_URL` — Redis connection string
- `DATABASE_URL` — PostgreSQL connection string

## TODO
- [ ] Listing queue processor
- [ ] Email queue processor
- [ ] AI job processor
- [ ] Image processing queue
- [ ] Dead-letter queue handling
