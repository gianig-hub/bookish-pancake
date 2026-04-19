# apps/worker

EK Marketplace — Background Worker Service

## Purpose

Handles all asynchronous/background jobs that should not block the main API:

- Email notifications (transactional: registration, lead alerts, password reset)
- Saved search alert matching and email dispatch
- Listing expiry checks and cleanup
- AI-assisted moderation (spam/duplicate detection — Phase 3)
- AI listing suggestion generation (Phase 3)
- Subscription billing reminders
- Analytics event aggregation (Phase 4)

## Technology

- **Node.js** + **TypeScript**
- **BullMQ** (Redis-backed job queue) — TODO: install and configure
- **Redis** (shared with API for job queue)
- **@ek/types** for shared types

> TODO: Initialise worker with BullMQ once Redis is available in the stack.

---

## Folder Structure (planned)

```
src/
  index.ts           ← Worker entry point (registers all queues/processors)
  
  queues/            ← Queue definitions and job producers
    email.queue.ts   ← Email job queue
    alert.queue.ts   ← Saved search alert queue
    ai.queue.ts      ← AI job queue (Phase 3)
    
  processors/        ← Job processors (consumers)
    email.processor.ts  ← Send email via provider (Resend, SES, etc.)
    alert.processor.ts  ← Match alerts and dispatch emails
    ai.processor.ts     ← Run AI tasks (TODO: Phase 3)
    
  templates/         ← Email HTML templates
  
  config/
    env.ts           ← Worker environment config
```

---

## Environment Variables

```
REDIS_URL=redis://localhost:6379
EMAIL_FROM=noreply@ekmarketplace.co.uk
```

---

## TODOs

- [ ] Install BullMQ: `npm install bullmq`
- [ ] Create email queue and processor (registration confirmation email)
- [ ] Create alert matching processor
- [ ] Create AI job processor (Phase 3)
- [ ] Add dead-letter queue handling
- [ ] Add job monitoring (Bull Board or equivalent)
