# apps/api — Backend API

## Responsibility

This is the **backend REST API** for the EK Marketplace platform.

It handles:

- User authentication and account management (JWT / sessions)
- Listings CRUD (create, read, update, delete, search)
- Business profile management
- Wanted ads management
- Subscription and plan management
- Boost and promotion logic
- Messaging and lead enquiries
- Moderation queue endpoints
- Admin management endpoints
- AI service orchestration (proxying requests to `apps/worker` where appropriate)

## Tech Direction

- **Framework:** Node.js + Express (or Fastify)
- **Database:** PostgreSQL (via Prisma or Drizzle ORM)
- **Caching:** Redis
- **Auth:** JWT + refresh tokens
- **File Uploads:** S3-compatible object storage
- **Shared Types:** `packages/types`
- **Config:** `packages/config`

## Structure

```
apps/api/
├── src/
│   ├── routes/       # API route handlers (listings, users, businesses, etc.)
│   ├── middleware/   # Auth, validation, error handling
│   ├── services/     # Business logic layer
│   ├── db/           # Database client and migrations
│   └── index.ts      # Entry point
├── package.json
└── README.md
```

## Status

🚧 **Placeholder — not yet scaffolded.**

Run the project scaffolding step when ready to initialise the API server here.
