# apps/api — Express REST API

## Responsibility

The **api** app is the backend service. It handles all business logic, database access, and data processing.

- All CRUD operations (listings, users, categories, businesses)
- Authentication (JWT issuing + validation)
- Input validation (Zod schemas)
- Authorization (ownership checks, role guards)
- Background job scheduling
- Search and filtering

## Tech Stack

| Tool | Purpose |
|------|---------|
| Express | HTTP framework |
| TypeScript | Language |
| Prisma | ORM + database client |
| PostgreSQL | Primary database |
| Redis | Cache + rate limiting |
| Zod | Input validation |
| bcrypt | Password hashing |
| jsonwebtoken | JWT auth tokens |

## Structure

```
apps/api/
├── src/
│   ├── index.ts              # App entry point
│   ├── app.ts                # Express app setup
│   ├── routes/               # Route handlers
│   │   ├── auth.ts           # POST /auth/register, /auth/login
│   │   ├── listings.ts       # GET/POST/PATCH/DELETE /listings
│   │   └── users.ts          # GET /users/:id, PATCH /users/me
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   └── listing.service.ts
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts           # JWT verification
│   │   ├── error.ts          # Error handler
│   │   └── validate.ts       # Zod request validation
│   └── schemas/              # Zod validation schemas
│       ├── auth.schema.ts
│       └── listing.schema.ts
├── package.json
└── tsconfig.json
```

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login, returns JWT |
| GET | `/auth/me` | Yes | Current user info |
| GET | `/listings` | No | List listings (paginated) |
| GET | `/listings/:id` | No | Single listing |
| POST | `/listings` | Yes | Create listing |
| PATCH | `/listings/:id` | Yes (owner) | Update listing |
| DELETE | `/listings/:id` | Yes (owner) | Delete listing |

## Development

```bash
# From repo root
npm run dev

# Or directly
cd apps/api
npm run dev
```

Runs at: http://localhost:4000

## Environment Variables

```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
CORS_ORIGIN=http://localhost:3000
PORT=4000
```
