# apps/api — EK Marketplace REST API

Express + TypeScript REST API for EK Marketplace.

## Development

```bash
# From monorepo root
npm run dev

# Or directly
cd apps/api
npm run dev
```

Runs on [http://localhost:4000](http://localhost:4000).

Health check: [http://localhost:4000/health](http://localhost:4000/health)

## Stack
- Express 4
- TypeScript (strict)
- Prisma ORM (via `@ek/db`)
- Zod validation
- Helmet, CORS, rate-limiting

## Structure

```
apps/api/
└── src/
    ├── index.ts        # App entry point
    ├── routes/         # Route handlers
    ├── middleware/      # Custom middleware
    ├── services/        # Business logic
    └── utils/           # Utilities
```

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `API_PORT` — Port (default: 4000)
- `NEXTAUTH_URL` — Allowed CORS origin
- `REDIS_URL` — Redis connection string

## TODO
- [ ] Listings CRUD routes
- [ ] Auth middleware (JWT)
- [ ] User routes
- [ ] Message routes
- [ ] Image upload endpoint
