# KoldMarket — Development Standards

Guidelines for GitHub Copilot and all contributors.

---

## Project Context

KoldMarket is an **AI-first UK marketplace** for AC, refrigeration, cold rooms, freezer rooms, equipment, parts, and services.

- **Monorepo** using Turborepo and npm workspaces
- **apps/web**: Next.js 14 (App Router) frontend
- **apps/api**: Node.js + Express backend
- **apps/worker**: Background job processor (BullMQ)
- **packages/**: Shared code (ai, types, ui, config)

---

## Language and Framework Conventions

### TypeScript
- Strict mode always on
- Prefer `type` over `interface` for objects (unless extending)
- Use named exports, not default exports for utilities and types
- Avoid `any` — use `unknown` and narrow the type
- Use `zod` for runtime validation of external data (API inputs, env vars)

### React / Next.js
- Use Server Components by default; add `'use client'` only when needed
- Colocate types with components
- Use `next/image` for all images
- Prefer `fetch` with `cache` options over client-side data fetching where possible

### API (Express)
- All routes return consistent JSON: `{ data, error, meta }`
- Validate all inputs at the route layer (zod schemas)
- Use middleware for auth and error handling
- No business logic in route files — move to service layer

---

## File and Folder Naming

- Files: `kebab-case.ts` (e.g. `listing-service.ts`)
- React components: `PascalCase.tsx` (e.g. `ListingCard.tsx`)
- Test files: `*.test.ts` or `*.spec.ts` alongside source
- Environment-specific logic: check `NODE_ENV` via `process.env.NODE_ENV`

---

## Database Conventions

- Use Drizzle ORM (preferred) or Prisma
- All tables use UUID primary keys
- Use `snake_case` for column names
- Include `created_at` and `updated_at` on all tables
- Soft delete with `deleted_at` — don't hard-delete user data
- Write migrations before schema changes

---

## AI Integration

- All AI calls go through `packages/ai/`
- Strip PII before sending to OpenAI (names, emails, phone numbers)
- AI writes drafts — humans confirm before publishing
- Log AI inputs/outputs for debugging (not for model training)
- Use `gpt-4o-mini` by default; `gpt-4o` only for quality-critical tasks

---

## Security Practices

- Never commit secrets — use `.env.local` (gitignored)
- Validate and sanitise all user inputs
- Use parameterised queries only — never string-concatenate SQL
- Rate limit AI endpoints and auth routes
- Check authorisation on every protected route (don't rely on frontend guards)

---

## Git Conventions

```
feat: add listing image upload
fix: correct category filter query
chore: update dependencies
docs: add VPS setup guide
refactor: extract listing service from route
```

- Commit messages: `type: short description` (conventional commits)
- Branch names: `feature/listing-upload`, `fix/auth-token-expiry`
- One PR per feature or fix
- Keep PRs small and focused

---

## What to Avoid

- Do not generate boilerplate without purpose
- Do not add npm packages without checking alternatives first
- Do not create AI content pages for SEO — only real, useful content
- Do not over-engineer for scale that doesn't exist yet
- Do not use `console.log` in production — use a proper logger (pino or winston)
