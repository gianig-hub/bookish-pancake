# apps/api — EK Marketplace API (Placeholder)

This is a placeholder for the EK Marketplace backend API service.

## Planned Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Fastify (TypeScript)
- **Database:** PostgreSQL (via Prisma ORM)
- **Cache:** Redis
- **Auth:** JWT / OAuth

## Planned Endpoints (MVP)

| Method | Path                  | Description                        |
|--------|-----------------------|------------------------------------|
| GET    | `/health`             | Health check                       |
| POST   | `/auth/register`      | User registration                  |
| POST   | `/auth/login`         | User login                         |
| GET    | `/listings`           | List/search listings               |
| POST   | `/listings`           | Create a listing (auth required)   |
| GET    | `/listings/:id`       | Get listing by ID                  |
| PUT    | `/listings/:id`       | Update listing (owner only)        |
| DELETE | `/listings/:id`       | Delete listing (owner only)        |
| GET    | `/businesses`         | List businesses                    |
| GET    | `/businesses/:slug`   | Get business profile               |
| GET    | `/wanted-ads`         | List wanted ads                    |
| POST   | `/wanted-ads`         | Post a wanted ad (auth required)   |

## TODO

- [ ] Scaffold Fastify app with TypeScript
- [ ] Add Prisma ORM and PostgreSQL schema
- [ ] Implement auth endpoints (JWT + OAuth)
- [ ] Implement listing CRUD
- [ ] Implement business directory endpoints
- [ ] Add wanted ads endpoints
- [ ] Add search and filtering
- [ ] Implement file upload for listing photos
- [ ] Add AI-assisted listing endpoint (OpenAI integration)
- [ ] Add admin/moderation endpoints
- [ ] Set up Redis caching
- [ ] Add rate limiting and input validation
- [ ] Add Stripe webhooks for subscription management

## Local Development (once implemented)

```sh
cd apps/api
pnpm install
pnpm dev
```

The API will run at: `http://localhost:3001`
