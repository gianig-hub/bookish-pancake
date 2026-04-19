# apps/worker — EK Marketplace Background Worker

Placeholder for the background job worker service.

## Responsibility

- Email sending (verification, password reset, lead notifications)
- AI processing jobs (listing enrichment, moderation)
- Scheduled tasks (purge expired sessions, clean up orphaned uploads)
- Queue consumer (BullMQ + Redis)

## TODO

- Scaffold with BullMQ and Redis connection
- Add email job (Resend or SMTP)
- Add AI enrichment job for listings (Phase 3)
- Add cron for session/data cleanup
