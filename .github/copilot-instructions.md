# EK Marketplace — Copilot Development Instructions

## Project Overview

EK Marketplace is an **AI-first UK marketplace** for AC, refrigeration, cold rooms, freezer rooms, parts, tools, wanted ads, businesses, and services.

Domain: `koldmarket.co.uk`
Stack: Next.js + Express + PostgreSQL + Redis + Docker

---

## Monorepo Structure

```
apps/web/       → Next.js 14 (App Router) — marketplace UI
apps/api/       → Express + TypeScript — REST API
apps/worker/    → BullMQ + Redis — background jobs
packages/types/ → Shared TypeScript types (source of truth)
packages/config/→ Shared constants and env helpers
packages/ui/    → Shared React components (TailwindCSS)
packages/ai/    → AI services (Phase 3+, disabled initially)
infra/nginx/    → Nginx reverse proxy config
prisma/         → Prisma schema and migrations
docs/           → Project documentation
```

---

## Coding Standards

### TypeScript

- Use strict TypeScript throughout (`strict: true`)
- Define all types in `packages/types` — never duplicate types across apps
- Use `z.infer<typeof schema>` for Zod-inferred types
- Prefer `type` over `interface` for simple types
- Always annotate function return types on exported functions

### API (Express)

- All routes in `apps/api/src/routes/`
- All business logic in `apps/api/src/services/`
- All DB queries via Prisma in `apps/api/src/repositories/`
- Validate all inputs with Zod schemas
- Return consistent JSON: `{ data, error, meta }` pattern
- Use HTTP status codes correctly (200, 201, 400, 401, 403, 404, 500)
- Never expose stack traces in production responses
- Always check `req.user.id === resource.userId` for ownership

### Frontend (Next.js)

- Use App Router only (no Pages Router)
- Server Components by default; Client Components only when needed
- Fetch data in Server Components, not in `useEffect`
- All pages in `apps/web/src/app/`
- All shared components in `packages/ui/src/`
- Use TailwindCSS utility classes — no custom CSS files
- Use `next/image` for all images

### Database (Prisma)

- One schema file: `prisma/schema.prisma`
- Never run raw SQL — use Prisma client
- Always use `select` to limit returned fields on queries
- Use `findUnique` for single records, `findMany` for lists
- Index foreign keys and frequently-queried fields

### Authentication

- Use NextAuth.js in `apps/web`
- JWT tokens for API authentication
- Never store passwords in plain text — use bcrypt
- Protect routes with middleware: check `session` or `Authorization: Bearer` header
- Role values: `BUYER`, `SELLER`, `ADMIN`

---

## Security Rules

- Never commit secrets, API keys, or passwords
- Always validate and sanitize user input (use Zod)
- Never trust client-provided IDs for ownership checks — verify in DB
- Rate limit all API endpoints
- Set security headers via Nginx (X-Frame-Options, HSTS, etc.)
- Use parameterized queries only (Prisma handles this)

---

## MVP Scope (Phase 1 Only)

Build ONLY:
- User registration and login
- Listing CRUD (create, read, update, delete)
- Category browsing
- Basic search and filter
- Ownership-based authorization

Do NOT build yet:
- Image upload (Phase 2)
- Payments / Stripe (Phase 2)
- Email notifications (Phase 2)
- Business directory (Phase 2)
- AI features (Phase 3)
- Analytics (Phase 3)

---

## Naming Conventions

- Files: `kebab-case.ts` (e.g., `listing-service.ts`)
- Components: `PascalCase.tsx` (e.g., `ListingCard.tsx`)
- Variables/functions: `camelCase`
- Database columns: `snake_case` (Prisma handles mapping)
- Environment variables: `UPPER_SNAKE_CASE`
- API routes: `/kebab-case/:id` (e.g., `/listings/:id`)

---

## Git Conventions

- Branch naming: `feature/description`, `fix/description`, `chore/description`
- Commit messages: use conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- PRs must pass CI before merging
- Never force push to `main`

---

## Common Patterns

### API Route Handler

```typescript
// apps/api/src/routes/listings.ts
router.get('/', async (req: Request, res: Response) => {
  try {
    const listings = await listingService.findAll(req.query);
    res.json({ data: listings, error: null });
  } catch (error) {
    res.status(500).json({ data: null, error: 'Internal server error' });
  }
});
```

### Protected Route Middleware

```typescript
// apps/api/src/middleware/auth.ts
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  // verify JWT...
  next();
};
```

### Zod Validation

```typescript
// apps/api/src/schemas/listing.ts
export const createListingSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  price: z.number().positive().optional(),
  categoryId: z.string().uuid(),
  condition: z.enum(['NEW', 'USED', 'REFURBISHED', 'EX_DISPLAY']),
});
```
