# apps/worker — Background Job Processor

The background job service for Kold Market. Processes tasks queued by the API — email sending, notifications, AI processing, data cleanup, and scheduled jobs.

---

## Responsibility

- Consumes jobs from Redis queues populated by `apps/api`
- Sends transactional emails (verification, alerts, leads)
- Processes AI suggestions for listings (Phase 2+)
- Runs scheduled cleanup tasks (expire old listings, purge drafts)
- Generates reports and digest emails for business users

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | Runtime |
| BullMQ | Job queue consumer (backed by Redis) |
| Redis | Queue backing store |
| TypeScript | Type safety (via `packages/types`) |
| Nodemailer / SendGrid | Email delivery |

---

## Key Jobs

| Job | Trigger | Purpose |
|---|---|---|
| `send-verification-email` | User registration | Email address verification |
| `send-lead-notification` | Enquiry submitted | Notify business of new lead |
| `process-ai-listing` | Listing draft created | AI title/description suggestions |
| `cleanup-expired-listings` | Scheduled (daily) | Remove expired/unpaid listings |
| `generate-weekly-report` | Scheduled (weekly) | Business performance digest |

---

## Structure

```
apps/worker/
├── src/
│   └── index.ts      # BullMQ worker entry point (placeholder)
├── package.json      # App dependencies (to be created)
├── tsconfig.json     # TypeScript config (to be created)
└── README.md
```

---

## Environment Variables

See `.env.example` at repo root. Key vars for this app:

```
REDIS_URL=redis://redis:6379
DATABASE_URL=postgresql://...
SMTP_HOST=...
OPENAI_API_KEY=...   # Phase 2+ only
```

---

## Dependencies

- Requires Redis (provided via `docker-compose.yml`)
- Requires PostgreSQL for persisting job results
- Requires `apps/api` to be running to populate queues
- Uses shared types from `packages/types`
- Uses `packages/ai` for AI processing jobs (Phase 2+, feature-flagged)

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [packages/ai](../../packages/ai/README.md)
- [packages/types](../../packages/types/README.md)
