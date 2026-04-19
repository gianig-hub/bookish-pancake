# packages/db — EK Marketplace Database

Prisma ORM client and database utilities shared across the API and Worker.

## Setup

```bash
# Generate Prisma client
npm run db:generate --workspace=packages/db

# Run database migrations (development)
npm run db:migrate --workspace=packages/db

# Open Prisma Studio
npm run db:studio --workspace=packages/db
```

## Usage

```typescript
import { prisma } from '@ek/db'

const users = await prisma.user.findMany()
```

## Environment Variables

```env
DATABASE_URL=postgresql://ekmarket:ekmarket_dev@localhost:5432/ekmarket_dev
```

## Schema Location

```
packages/db/prisma/schema.prisma
```

## Current Models

| Model | Status |
|-------|--------|
| `User` | Minimal template |
| `Listing` | TODO — Phase 1 |
| `Category` | TODO — Phase 1 |
| `ListingImage` | TODO — Phase 1 |
| `ContactMessage` | TODO — Phase 1 |
| `BusinessProfile` | TODO — Phase 1 |
| `Subscription` | TODO — Phase 2 |

## Notes

- Always run `db:generate` after schema changes
- Use `db:migrate` for development, `db:migrate:prod` for production
- The Prisma client is exported as a singleton to prevent connection pool exhaustion
