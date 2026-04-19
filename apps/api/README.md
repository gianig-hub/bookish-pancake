# apps/api — EK Marketplace API

Express + TypeScript backend API for the EK Marketplace.

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express 4
- **ORM**: Prisma (via `@ek/db`)
- **Validation**: Zod
- **Security**: Helmet, CORS, rate limiting
- **Types**: Shared from `@ek/types`

## Local Setup

From the monorepo root:

```bash
npm install
npm run dev --workspace=apps/api
```

The API will be available at `http://localhost:4000`.

### Health Check

```
GET http://localhost:4000/health
```

## Environment Variables

```env
DATABASE_URL=postgresql://ekmarket:ekmarket_dev@localhost:5432/ekmarket_dev
REDIS_URL=redis://localhost:6379
PORT=4000
APP_URL=http://localhost:3000
```

## Structure

```
apps/api/src/
├── index.ts        # Express app setup and server entry
├── types.ts        # Request/response types
├── routes/         # Route handlers (TODO)
├── middleware/     # Auth, validation middleware (TODO)
└── services/       # Business logic (TODO)
```

## TODO

- [ ] Set up Prisma database connection
- [ ] Implement authentication middleware (JWT/NextAuth)
- [ ] Create listings CRUD endpoints
- [ ] Create user registration/profile endpoints
- [ ] Add category endpoints
- [ ] Add contact message endpoint
- [ ] Add image upload endpoint
