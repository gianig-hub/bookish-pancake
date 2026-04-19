# EK Marketplace — Copilot Development Instructions

These instructions guide GitHub Copilot and all contributors on development standards for this project.

## Project Context

EK Marketplace is an AI-first UK vertical marketplace for AC, refrigeration, cold rooms, freezer rooms, equipment, parts, tools, services, businesses, and wanted ads.

**Working domain:** `koldmarket.co.uk`

---

## Stack Standards

### Languages
- TypeScript everywhere (strict mode)
- No plain JavaScript files in `apps/` or `packages/`

### Frontend (`apps/web`)
- Next.js with App Router
- React functional components only (no class components)
- TailwindCSS for styling (no inline styles, no CSS modules unless necessary)
- NextAuth.js for authentication
- React Query / TanStack Query for server state
- Zod for form validation

### Backend (`apps/api`)
- Express.js with TypeScript
- Prisma ORM for all database access
- Zod for request validation
- JWT tokens for API authentication
- RESTful routes under `/api/v1/`

### Worker (`apps/worker`)
- BullMQ for job queues
- Redis as queue backend
- One queue per job type

### Database
- PostgreSQL only
- Prisma schema as single source of truth
- All migrations tracked in `prisma/migrations/`
- No raw SQL unless in a Prisma `$queryRaw` with parameterised inputs

---

## Code Style

### Naming
- Files: `kebab-case.ts`
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Database tables: `snake_case` (handled by Prisma)
- Types/interfaces: `PascalCase` with `I` prefix for interfaces (e.g. `IListing`)

### Imports
- Absolute imports using `@/` alias within each app
- Shared packages imported as `@ek/types`, `@ek/ui`, `@ek/config`, `@ek/ai`
- No relative imports that go more than 2 levels up (`../../..` is a sign to restructure)

### Error Handling
- API: always return `{ success: false, error: string, code?: string }` on failure
- Never expose raw database errors or stack traces to clients
- Use custom error classes for API errors

---

## Security Rules

- Never commit secrets or credentials — use `.env.local` (gitignored)
- Always validate and sanitise user inputs with Zod on both client and API
- Use parameterised queries via Prisma (never string-interpolate SQL)
- Rate limit all public API endpoints
- Sanitise HTML if rendering user-generated content

---

## AI Integration Standards

- AI features live in `packages/ai/`
- Phase 1: no AI features (focus on core marketplace)
- Phase 3+: AI is an enhancement layer, not a core dependency
- Never make AI features blocking (always have a fallback)
- Document AI prompts in `packages/ai/prompts/`

---

## Git Workflow

- Branch naming: `feature/description`, `fix/description`, `chore/description`
- Commit messages: conventional commits format (`feat:`, `fix:`, `chore:`, `docs:`)
- PRs must include: what, why, and how
- Never commit directly to `main`

---

## File Structure Guidelines

```
apps/web/
  src/
    app/          # Next.js App Router pages
    components/   # UI components
    hooks/        # Custom React hooks
    lib/          # Utility functions
    types/        # App-specific types (use @ek/types where possible)

apps/api/
  src/
    routes/       # Express route handlers
    middleware/   # Auth, validation, rate limiting
    services/     # Business logic
    lib/          # Utilities (db client, logger, etc)

apps/worker/
  src/
    queues/       # BullMQ queue definitions
    processors/   # Job processor functions
    lib/          # Shared worker utilities
```

---

## What Copilot Should NOT Do

- Do not generate database schemas without explicit approval
- Do not add new npm packages without checking if one already exists in the monorepo
- Do not create `.js` files in TypeScript apps
- Do not skip input validation
- Do not hard-code URLs, ports, or credentials — use environment variables
- Do not write AI features in Phase 1
