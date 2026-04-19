# apps/worker — Background Worker Service

## Responsibility

This is the **background worker and queue processing service** for the EK Marketplace platform.

It handles all asynchronous, long-running, or scheduled tasks that should not block the API or frontend, including:

- **AI Processing**
  - Listing title and description generation (OpenAI / LLM calls)
  - Category and condition auto-suggestion
  - Business profile writing assistance
  - Buyer search intent processing
  - Review response drafting

- **Moderation**
  - Spam and duplicate detection
  - Risk scoring for new listings and accounts
  - Admin moderation triage

- **Notifications**
  - Email sending (listing alerts, messages, subscription events)
  - Push notifications (future)

- **SEO / Content Jobs**
  - Sitemap regeneration
  - Content gap analysis
  - Stale listing cleanup

- **Scheduled Jobs**
  - Subscription renewal checks
  - Boost expiry processing
  - Analytics aggregation

## Tech Direction

- **Runtime:** Node.js (TypeScript)
- **Queue:** BullMQ (backed by Redis)
- **AI Integration:** `packages/ai`
- **Shared Types:** `packages/types`
- **Config:** `packages/config`

## Structure

```
apps/worker/
├── src/
│   ├── queues/       # Queue definitions (ai, email, moderation, seo, etc.)
│   ├── processors/   # Job processor handlers
│   ├── schedulers/   # Cron / recurring job setup
│   └── index.ts      # Worker entry point
├── package.json
└── README.md
```

## Status

🚧 **Placeholder — not yet scaffolded.**

Run the project scaffolding step when ready to initialise the worker service here.
