# EK Marketplace — Copilot Instructions

> **This file instructs GitHub Copilot on how to generate, review, and extend code for the EK Marketplace project.**
> It is not a general README. Every rule here applies to AI-assisted code generation, review suggestions, and refactoring.

---

## 1. Project Overview

EK Marketplace is an **AI-first UK vertical marketplace** for the HVAC and refrigeration niche:

- Air conditioning equipment and services
- Refrigeration systems and components
- Cold rooms and freezer rooms
- Related equipment, parts, tools, and services

| Attribute | Value |
|---|---|
| Target market | UK trade and consumer |
| Geographic focus | United Kingdom |
| Niche | HVAC / refrigeration |
| AI positioning | AI-first platform |
| Phase | Architecture / early MVP |

### Core Product Areas

1. **Services Marketplace** — Installation, maintenance, repair services
2. **Equipment Marketplace** — Buy/sell AC units, refrigeration equipment
3. **Businesses / Dealers Directory** — Verified installers, shops, suppliers
4. **Wanted Ads** — Post requirements, get quotes
5. **Guides / FAQ / Help Center** — Knowledge base for customers
6. **AI Features** — Search, posting assistance, moderation, support

---

## 2. Core Principles

These principles are non-negotiable. Copilot must follow them in every suggestion.

- **MVP-focused** — Build the minimum to ship and validate. Avoid over-engineering.
- **Production-oriented** — Every change must work in a Docker-based Ubuntu VPS deployment. Dev-only hacks are never acceptable in main code paths.
- **Quality over speed** — Partial code is acceptable only when marked with `// TODO:`. Never silently stub logic.
- **Security-first** — All inputs must be validated. Auth checks must be present. Rate limiting must be applied to public endpoints.
- **Clarity and documentation** — Complex logic must be commented. Public functions require JSDoc. Assumptions must be stated explicitly.

---

## 3. Architecture Rules

### Monorepo Structure

```
ek-marketplace/
├── apps/
│   ├── web/          # Next.js frontend (App Router)
│   ├── api/          # Express / Fastify backend API
│   └── worker/       # Background jobs (BullMQ / queue workers)
├── packages/
│   ├── ui/           # Shared React UI components
│   ├── config/       # Shared ESLint, TS, environment config
│   ├── ai/           # AI services and utilities (isolated)
│   ├── types/        # Shared TypeScript types and interfaces
│   └── db/           # Prisma schema, client, migrations
├── infra/            # Docker, Nginx, deployment configs
├── docs/             # Architecture decisions, guides, API docs
└── README.md
```

### App / Package Separation

- `apps/` — Runnable applications. Each has its own `Dockerfile` and entry point.
- `packages/` — Shared libraries. Never contain runnable servers. Always consumed by apps.
- Do **not** put business logic directly in `apps/web`. Extract to `apps/api` or `packages/`.

### AI Isolation Pattern

All AI logic must live in `packages/ai/` or `apps/worker/`. Never scatter AI calls across `apps/web` or `apps/api` directly.

```
packages/ai/
├── src/
│   ├── listing/      # Listing title/description generation
│   ├── search/       # Natural-language search
│   ├── moderation/   # Spam and duplicate detection
│   ├── support/      # FAQ and support assistant
│   └── index.ts      # Public API exports
```

### Shared Types and Config

- All shared TypeScript types live in `packages/types/`.
- All shared ESLint, TypeScript, and Prettier config lives in `packages/config/`.
- Apps extend shared config — they do not duplicate it.

### Modular Service Design

- One responsibility per module.
- Services communicate through well-defined interfaces, not direct imports of implementation details.
- Background jobs are triggered via queue (BullMQ), not direct function calls from the API.

---

## 4. TypeScript Standards

- **Strict mode is non-negotiable.** Every `tsconfig.json` must include:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

- **No `any` types** without an explicit justification comment:

```typescript
// BAD
const data: any = fetchData();

// ACCEPTABLE (with justification)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyPayload: any = parseExternalWebhook(raw); // TODO: type this properly
```

- **Shared types live in `packages/types/`**. Never duplicate type definitions across packages.

```typescript
// packages/types/src/listing.ts
export interface Listing {
  id: string;
  title: string;
  category: ListingCategory;
  condition: ListingCondition;
  price?: number; // undefined or 0 = "price on request" / free
  currency: 'GBP'; // literal string — no enum needed; platform is UK-only
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

- **Path aliases** must be configured for clean imports:

```typescript
// tsconfig.json paths
{
  "@ek/types": ["../../packages/types/src"],
  "@ek/ui": ["../../packages/ui/src"],
  "@ek/config": ["../../packages/config/src"],
  "@ek/ai": ["../../packages/ai/src"],
  "@ek/db": ["../../packages/db/src"]
}

// Usage
import type { Listing } from '@ek/types';
```

- Prefer `interface` over `type` for object shapes. Use `type` for unions and aliases.
- Use `enum` only when values need to be iterated. Prefer `const` objects with `as const` for simple cases.

---

## 5. AI Integration Guidelines

### Where AI Code Lives

| AI Feature | Location |
|---|---|
| Listing title/description generation | `packages/ai/src/listing/` |
| Natural-language search | `packages/ai/src/search/` |
| Spam / moderation detection | `packages/ai/src/moderation/` |
| Support assistant / FAQ | `packages/ai/src/support/` |
| AI background jobs | `apps/worker/src/jobs/ai/` |

### Feature Flags for AI Features

All AI features must be gated behind feature flags:

```typescript
// packages/config/src/features.ts
export const AI_FEATURES = {
  listingAssistant: process.env.FEATURE_AI_LISTING_ASSISTANT === 'true',
  naturalLanguageSearch: process.env.FEATURE_AI_SEARCH === 'true',
  moderationAI: process.env.FEATURE_AI_MODERATION === 'true',
  supportAssistant: process.env.FEATURE_AI_SUPPORT === 'true',
} as const;
```

### No Scattered AI Logic

Never call OpenAI, Anthropic, or any AI SDK directly from:
- React components
- API route handlers (inline)
- Database queries

Always call through the `packages/ai` abstraction layer.

### Logging and Audit Trails

Every AI call must be logged with:

```typescript
interface AICallLog {
  feature: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  userId?: string;
  listingId?: string;
  success: boolean;
  error?: string;
}
```

### MVP vs. Future AI Features

**MVP AI (implement now):**
- Listing title/description generation (seller flow)
- AI-assisted marketplace search (buyer flow)

**Future AI (mark as TODO, do not implement yet):**
- Automated moderation
- Business profile writing
- Lead reply assistance
- SEO content gap analysis

```typescript
// TODO: [AI-FUTURE] Implement automated spam detection via moderation AI
// See docs/ai/moderation-plan.md for planned approach
```

---

## 6. Database & API Standards

### Schema Changes

- Every schema change requires a migration file and a comment in the Prisma schema.
- Do **not** invent new columns without stating the assumption:

```prisma
// ASSUMPTION: storing price in minor units (pence) to avoid float precision issues
// ASSUMPTION: price = null means "price on request"; price = 0 means "free" — validate and display accordingly
price Int? // Price in GBP pence (e.g. 10000 = £100.00); null = price on request; 0 = free
```

- Add indexes on all columns used in `WHERE`, `ORDER BY`, or `JOIN` clauses:

```prisma
@@index([status, category, createdAt])
@@index([sellerId])
@@index([cityId, categoryId])
```

### API Contract Clarity

- All request and response shapes must be typed and validated.
- Use `zod` for runtime validation:

```typescript
import { z } from 'zod';

export const CreateListingSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(20).max(5000),
  price: z.number().int().positive().optional(),
  categoryId: z.string().uuid(),
  condition: z.enum(['NEW', 'USED', 'REFURBISHED', 'EX_DISPLAY']),
});

export type CreateListingInput = z.infer<typeof CreateListingSchema>;
```

### Security Headers and Rate Limiting

Every public API endpoint must have:
- Rate limiting (express-rate-limit or equivalent)
- Authentication check (where required)
- Input validation (zod schema)
- Correct HTTP status codes

```typescript
// Example endpoint pattern
router.post(
  '/listings',
  rateLimiter({ windowMs: 60_000, max: 10 }),
  requireAuth,
  validateBody(CreateListingSchema),
  createListingHandler,
);
```

### Soft Deletes

Use soft deletes for user-generated content (listings, messages, profiles):

```prisma
deletedAt DateTime? // null = active, set = soft-deleted
```

---

## 7. Code Quality Standards

### TODO Markers

Mark all partial implementations explicitly:

```typescript
// TODO: implement email notification when listing is approved
// TODO: [SECURITY] add CSRF token validation
// TODO: [PERFORMANCE] cache this query result in Redis (TTL: 5 minutes)
// TODO: [AI-FUTURE] replace keyword search with vector similarity search
```

### Error Handling

Never silently swallow errors:

```typescript
// BAD
try {
  await createListing(data);
} catch (e) {}

// GOOD
try {
  await createListing(data);
} catch (error) {
  logger.error('Failed to create listing', { error, userId, data });
  throw new AppError('LISTING_CREATE_FAILED', 'Could not create listing', 500);
}
```

### Logging Strategy

Use structured logging throughout:

```typescript
logger.info('Listing created', { listingId, userId, category });
logger.warn('Rate limit approached', { userId, endpoint, count });
logger.error('Payment failed', { error, userId, amount });
```

### DRY Principle

- Extract repeated logic to `packages/` utilities or shared hooks.
- Never copy-paste validation logic — use shared zod schemas from `packages/types`.
- Shared UI patterns belong in `packages/ui`, not duplicated per page.

### Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Files | kebab-case | `listing-card.tsx` |
| React components | PascalCase | `ListingCard` |
| Functions | camelCase | `getListingById` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_IMAGES_PER_LISTING` |
| Types/Interfaces | PascalCase | `ListingStatus` |
| Database models | PascalCase (Prisma) | `ListingImage` |
| Environment vars | SCREAMING_SNAKE_CASE | `DATABASE_URL` |

---

## 8. Configuration & Secrets

### Rules

- All secrets and environment-specific values live in `.env` files — **never in source code**.
- `.env` files are git-ignored. Always commit `.env.example` templates.
- Configuration is inherited from `packages/config` — apps extend it, not duplicate it.

### Required `.env.example` Template

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ekmarket

# Auth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# AI
OPENAI_API_KEY=sk-...
FEATURE_AI_LISTING_ASSISTANT=false
FEATURE_AI_SEARCH=false

# Storage
STORAGE_PROVIDER=local
S3_BUCKET=
S3_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Payments (future)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NODE_ENV=development
PORT=3001
LOG_LEVEL=debug
```

### Production vs. Development Settings

```typescript
// packages/config/src/env.ts
export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

// Never use dev-only shortcuts in production paths
if (isDev) {
  // local file storage
} else {
  // S3 storage — must be configured in prod
}
```

---

## 9. Testing & Validation

### Input Validation Pattern

All user input must pass through a zod schema before touching the database:

```typescript
// 1. Define schema (packages/types/src/schemas/listing.ts)
export const CreateListingSchema = z.object({ ... });

// 2. Validate in handler
const result = CreateListingSchema.safeParse(req.body);
if (!result.success) {
  return res.status(400).json({ error: result.error.flatten() });
}

// 3. Use typed data
const listing = await db.listing.create({ data: result.data });
```

### Error Handling Pattern

```typescript
// packages/types/src/errors.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

### Security Validation Checklist

Before merging any API endpoint:

- [ ] Input validated with zod
- [ ] Authentication verified (if required)
- [ ] Authorization checked (user owns the resource)
- [ ] Rate limiting applied
- [ ] SQL injection prevented (Prisma parameterized queries only)
- [ ] Response does not leak sensitive fields (passwords, tokens)
- [ ] Errors return generic messages to clients

---

## 10. Docker & Deployment

### Docker-First Development

All services run via Docker Compose locally. No service should require manual local setup.

```yaml
# docker-compose.yml (simplified)
services:
  web:
    build: ./apps/web
    ports: ["3000:3000"]
    env_file: .env
    depends_on: [api]

  api:
    build: ./apps/api
    ports: ["3001:3001"]
    env_file: .env
    depends_on: [postgres, redis]

  worker:
    build: ./apps/worker
    env_file: .env
    depends_on: [postgres, redis]

  postgres:
    image: postgres:16
    volumes: [postgres_data:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
```

### Multi-Stage Builds for Production

```dockerfile
# apps/api/Dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### Deployment Assumptions

- Target: Ubuntu VPS (DigitalOcean, Linode, OVH, AWS Lightsail)
- Nginx as reverse proxy with SSL termination
- GitHub Actions for CI/CD pipeline
- Zero-downtime deployment via Docker rolling restart or blue/green swap
- PostgreSQL data persisted via named Docker volume

### Zero-Downtime Deployment Pattern

```bash
# infra/scripts/deploy.sh
docker pull ghcr.io/org/ek-api:latest
docker stop ek-api-old || true
docker rename ek-api ek-api-old || true
docker run -d --name ek-api --env-file .env ghcr.io/org/ek-api:latest
docker rm ek-api-old || true
```

---

## 11. PR & Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `security`

Examples:
```
feat(listing): add image upload with local storage
fix(api): correct rate limit window for listing creation
security(auth): enforce CSRF token on mutation endpoints
docs(ai): add AI placement map and integration guide
```

### PR Description Template

```markdown
## What changed
Brief description of changes.

## Why
Motivation or issue reference.

## Impact analysis
- Files changed: [list affected files]
- Database changes: [yes/no — describe if yes]
- API changes: [yes/no — describe if yes]
- Breaking changes: [yes/no]

## Testing
- [ ] Tested locally via Docker Compose
- [ ] Input validation works
- [ ] Error states handled
- [ ] Auth/authz checked

## Documentation
- [ ] README updated if needed
- [ ] TODO markers added for incomplete parts
- [ ] Assumptions documented
```

---

## 12. Monorepo Tooling

### npm Workspaces

```json
// package.json (root)
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### Turborepo for Builds

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Cross-Package Dependencies

```json
// apps/api/package.json
{
  "dependencies": {
    "@ek/types": "*",
    "@ek/db": "*",
    "@ek/config": "*",
    "@ek/ai": "*"
  }
}
```

### Development Workflow

```bash
# Install all dependencies
npm install

# Run all apps in development mode
npm run dev

# Run a specific app
npm run dev --workspace=apps/api

# Build all packages
npm run build

# Run tests
npm run test

# Lint everything
npm run lint
```

---

## 13. When Making Changes

When Copilot generates code changes, it must always provide:

### Required Output

1. **Impact analysis** — which files are affected and why
2. **Affected files list** — explicit list with reason for each
3. **Assumptions** — any assumptions made about schema, config, or external services
4. **TODO markers** — for any partial or deferred implementations
5. **Testing scope** — what to test and how
6. **Deployment considerations** — any env var changes, migrations, or config updates needed
7. **Next steps** — what to implement next

### Example: Adding a New Endpoint

```typescript
// apps/api/src/routes/listings/create.ts

// ASSUMPTION: User is authenticated via JWT in Authorization header
// ASSUMPTION: Images are uploaded separately via /listings/:id/images
// TODO: Add email notification to admin on new listing creation
// TODO: [AI-FUTURE] Trigger AI listing quality score check on creation

import { z } from 'zod';
import { requireAuth } from '@/middleware/auth';
import { rateLimiter } from '@/middleware/rate-limit';
import { validateBody } from '@/middleware/validate';
import { CreateListingSchema } from '@ek/types';
import { db } from '@ek/db';
import { logger } from '@/lib/logger';

router.post(
  '/',
  rateLimiter({ windowMs: 60_000, max: 10 }),
  requireAuth,
  validateBody(CreateListingSchema),
  async (req, res) => {
    const { userId } = req.auth;
    const data = req.validatedBody;

    const listing = await db.listing.create({
      data: { ...data, sellerId: userId, status: 'PENDING_REVIEW' },
    });

    logger.info('Listing created', { listingId: listing.id, userId });
    return res.status(201).json({ listing });
  },
);
```

---

## 14. Security Checklist

Apply this checklist to every PR that touches public-facing code:

- [ ] **Input validation** — all user input validated with zod before use
- [ ] **SQL injection** — only Prisma parameterized queries; no raw SQL with user input
- [ ] **XSS prevention** — output is escaped; React does this by default (avoid `dangerouslySetInnerHTML`)
- [ ] **CSRF protection** — mutation endpoints protected with CSRF tokens or SameSite cookies
- [ ] **Rate limiting** — all public endpoints have rate limiting
- [ ] **Authentication** — protected routes verify JWT/session
- [ ] **Authorization** — user ownership/role checked before resource access
- [ ] **Sensitive data** — passwords, tokens, secrets never returned in API responses
- [ ] **Dependency audit** — `npm audit` passes with no high/critical vulnerabilities
- [ ] **Environment secrets** — no secrets committed to source code

---

## 15. Performance Considerations

### Database Query Optimization

- Always use `select` to limit returned fields in Prisma queries.
- Add pagination to all list endpoints (cursor or offset).
- Use `include` carefully — avoid N+1 queries.

```typescript
// BAD — fetches all fields, may cause N+1
const listings = await db.listing.findMany();

// GOOD — paginated, specific fields, eager-loaded relation
const listings = await db.listing.findMany({
  where: { status: 'ACTIVE', categoryId },
  select: { id: true, title: true, price: true, seller: { select: { name: true } } },
  orderBy: { createdAt: 'desc' },
  take: 20,
  skip: page * 20,
});
```

### Caching Strategy (Redis)

```typescript
// Cache taxonomy data (categories, brands, cities) — changes rarely
// redis.get() returns string | null — null means cache miss
const categories = await redis.get('taxonomy:categories')
  ?? await refreshCategoryCache();

// Cache individual listing pages (TTL: 5 minutes)
const cacheKey = `listing:${id}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
```

### Bundle Size Awareness

- Use dynamic imports in Next.js for large components (e.g., map, rich text editor).
- Never import entire libraries when only one function is needed.

```typescript
// BAD
import _ from 'lodash';

// GOOD — prefer named imports from ES module builds to enable tree-shaking
import { debounce } from 'lodash-es'; // use lodash-es (ESM) in frontend (Next.js)
// In Node.js (API/worker), use lodash (CJS) or a minimal custom helper
const debounce = (fn: Function, delay: number) => { /* tiny impl */ };
```

### Worker Job Queuing

Long-running tasks (AI generation, email, image processing) must go through BullMQ:

```typescript
// apps/api/src/services/ai-queue.ts
await aiQueue.add('generate-listing-description', {
  listingId,
  userId,
  rawInput,
});
```

---

## 16. Documentation Requirements

- **Complex logic** — inline comments explaining *why*, not *what*
- **Public functions** — JSDoc with `@param`, `@returns`, `@throws`
- **API endpoints** — documented with OpenAPI/Swagger or inline comments
- **Architecture decisions** — recorded in `docs/adr/` (Architecture Decision Records)
- **Package READMEs** — every `packages/*` directory must have a `README.md`
- **App READMEs** — every `apps/*` directory must have a `README.md`
- **Troubleshooting guides** — common errors and their solutions in `docs/troubleshooting/`

```typescript
/**
 * Creates a new listing in PENDING_REVIEW status.
 *
 * @param data - Validated listing input from CreateListingSchema
 * @param userId - Authenticated user creating the listing
 * @returns The created listing with its generated ID
 * @throws AppError LISTING_CREATE_FAILED if database write fails
 *
 * ASSUMPTION: Caller has already validated `data` against CreateListingSchema
 */
export async function createListing(
  data: CreateListingInput,
  userId: string,
): Promise<Listing> { ... }
```

---

## 17. File Structure Conventions

### Naming Conventions for Files

```
apps/api/src/
├── routes/
│   └── listings/
│       ├── index.ts          # Route registration
│       ├── create.ts         # POST /listings
│       ├── get-by-id.ts      # GET /listings/:id
│       └── update.ts         # PUT /listings/:id
├── services/
│   └── listing-service.ts    # Business logic
├── middleware/
│   ├── auth.ts
│   ├── rate-limit.ts
│   └── validate.ts
└── lib/
    ├── logger.ts
    └── errors.ts
```

### Export Patterns

```typescript
// packages/types/src/index.ts — barrel export
export * from './listing';
export * from './user';
export * from './category';
export * from './errors';
export * from './schemas/listing';
```

### Import Organization

```typescript
// 1. Node/external packages
import { z } from 'zod';
import { Router } from 'express';

// 2. Internal packages (via path aliases)
import type { Listing } from '@ek/types';
import { db } from '@ek/db';

// 3. Local imports
import { requireAuth } from '../middleware/auth';
import { logger } from '../lib/logger';
```

---

## 18. Error Handling Patterns

### Consistent Error Objects

```typescript
// packages/types/src/errors.ts
export type ErrorCode =
  | 'LISTING_NOT_FOUND'
  | 'LISTING_CREATE_FAILED'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
```

### Error Logging Strategy

```typescript
// Log with context — never log bare errors
logger.error('Listing creation failed', {
  error: error instanceof Error ? error.message : String(error),
  stack: error instanceof Error ? error.stack : undefined,
  userId,
  listingData: sanitize(data), // remove sensitive fields before logging
});
```

### User-Facing Error Messages

Never expose internal errors to clients:

```typescript
// BAD — leaks internal details
res.status(500).json({ error: error.message });

// GOOD — generic client message, internal details logged
logger.error('DB write failed', { error });
res.status(500).json({ error: 'Could not create listing. Please try again.' });
```

### Global Error Handler

```typescript
// apps/api/src/middleware/error-handler.ts
export function errorHandler(err: unknown, req: Request, res: Response) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }

  logger.error('Unhandled error', { error: err, path: req.path });
  return res.status(500).json({ error: 'Internal server error' });
}
```

---

## 19. Types & Interfaces

### Location of Shared Types

All shared types live in `packages/types/src/`. Never define cross-package types in app code.

```
packages/types/src/
├── user.ts          # User, UserRole, UserProfile
├── listing.ts       # Listing, ListingStatus, ListingCondition
├── category.ts      # Category, Brand, City
├── message.ts       # ContactMessage, Thread
├── payment.ts       # Subscription, BoostType
├── ai.ts            # AICallLog, AIFeatureFlag
├── errors.ts        # AppError, ErrorCode
└── schemas/         # Zod validation schemas
    ├── listing.ts
    ├── user.ts
    └── search.ts
```

### Naming Conventions

- `interface` for object shapes: `interface ListingCard { ... }`
- `type` for unions: `type ListingStatus = 'ACTIVE' | 'PENDING_REVIEW' | 'SOLD' | 'ARCHIVED'`
- `enum` only when values need to be iterated at runtime
- Prefix event types with `On`: `type OnListingCreated = { listingId: string; userId: string }`

### Generic Patterns

```typescript
// Paginated response wrapper
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// API response wrapper
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: string };
```

---

## 20. Third-Party Integration

### Package Management

- Use exact versions in `package.json` for production dependencies.
- Always run `npm audit` after adding a new package.
- Document why each non-obvious dependency was added in a comment or ADR.

### Security Audit Procedures

```bash
# Run before every PR merge
npm audit --audit-level=high

# Check for outdated packages monthly
npm outdated
```

### Dependency Update Strategy

- **Patch updates** — apply immediately (automated via Dependabot)
- **Minor updates** — review changelog, apply within 2 weeks
- **Major updates** — create an ADR, plan migration, test thoroughly

### Breaking Change Handling

When upgrading a shared package that introduces breaking changes:
1. Create a branch `chore/upgrade-<package>-<version>`
2. Update `packages/` first, then `apps/`
3. Run full test suite
4. Document breaking changes in `CHANGELOG.md`

### Peer Dependency Warnings

Address peer dependency warnings before merging — never ignore them in production code.

---

## How-To Examples

### How to Add a New API Endpoint

1. Create route handler in `apps/api/src/routes/<resource>/<action>.ts`
2. Define input schema in `packages/types/src/schemas/<resource>.ts`
3. Add business logic to `apps/api/src/services/<resource>-service.ts`
4. Register route in `apps/api/src/routes/<resource>/index.ts`
5. Apply: `rateLimiter`, `requireAuth` (if needed), `validateBody`
6. Add `// TODO:` for any unimplemented parts
7. Update `docs/api/` with endpoint documentation

### How to Add a New AI Feature

1. Create module in `packages/ai/src/<feature>/`
2. Add feature flag to `packages/config/src/features.ts` (default: `false`)
3. Create BullMQ job in `apps/worker/src/jobs/ai/<feature>.ts`
4. Expose typed function in `packages/ai/src/index.ts`
5. Add AI call logging using `AICallLog` type
6. Gate usage behind feature flag check
7. Add `// TODO: [AI-FUTURE]` if deferring to a later phase

### How to Add a New Shared Type

1. Create or edit file in `packages/types/src/`
2. Export from `packages/types/src/index.ts`
3. Import in consuming packages via `@ek/types`
4. Add zod schema if runtime validation is needed

### How to Modify the Database Schema

1. Edit `packages/db/prisma/schema.prisma`
2. Add a comment explaining the change and any assumptions
3. Run `npx prisma migrate dev --name <migration-name>`
4. Update affected queries in `packages/db/src/`
5. Update shared types in `packages/types/` if model shape changed
6. Document in `docs/database/` if significant

### How to Change Environment Configuration

1. Update `.env.example` with the new variable
2. Update `packages/config/src/env.ts` to read and validate it
3. Add to Docker Compose `environment` section
4. Document purpose and expected values in `.env.example` comments
5. Update `docs/deployment/environment-variables.md`

### How to Deploy a Change

1. Ensure all tests pass locally: `npm run test`
2. Run `npm audit --audit-level=high`
3. Push to feature branch, open PR with template filled out
4. CI pipeline: lint → type-check → test → build → Docker image push
5. Deploy to staging via GitHub Actions workflow
6. Verify on staging, then promote to production
7. Monitor logs for errors after deployment

---

*This file is the authoritative source of development standards for EK Marketplace. When in doubt, refer back here.*
