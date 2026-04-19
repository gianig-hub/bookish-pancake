# apps/worker — EK Marketplace Worker

Background job processor for the EK Marketplace.

## Responsibilities

- **Listing processing** — post-processing after a listing is created (image resize, slug gen)
- **Email delivery** — transactional emails via queue
- **AI moderation** — async moderation scoring of new listings
- **Notifications** — user alerts, saved search matches

## Tech Stack

- **Runtime**: Node.js 20
- **Queue**: Bull (backed by Redis)
- **Types**: Shared from `@ek/types`
- **AI**: Services from `@ek/ai`

## Local Setup

From the monorepo root:

```bash
npm install
npm run dev --workspace=apps/worker
```

Requires Redis to be running (use `docker-compose up redis`).

## Environment Variables

```env
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://ekmarket:ekmarket_dev@localhost:5432/ekmarket_dev
```

## Queue Overview

| Queue | Purpose |
|-------|---------|
| `listings` | Post-listing processing |
| `emails` | Transactional email sending |
| `ai-moderation` | AI content moderation |

## TODO

- [ ] Implement image resize processor
- [ ] Connect email provider (SMTP/SendGrid/Resend)
- [ ] Implement AI moderation scoring
- [ ] Add saved search matching
- [ ] Add Bull Board dashboard for queue monitoring
