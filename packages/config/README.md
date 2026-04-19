# packages/config — Shared Configuration

## Responsibility

Shared configuration, environment variable schemas, and constants used across apps and packages in the monorepo.

Consumed by:
- `apps/web`
- `apps/api`
- `apps/worker`

## What It Contains

- **Environment variable schemas** — validated env schemas (using `zod` or similar) for each app:
  - `env.web.ts` — public frontend env vars
  - `env.api.ts` — API server env vars
  - `env.worker.ts` — worker env vars
- **Shared constants** — marketplace-wide constants:
  - UK regions list
  - Listing category slugs and labels
  - Plan tier names and feature limits
  - Boost type definitions
  - Pagination defaults
- **ESLint config** — shared ESLint ruleset for all apps
- **TypeScript config** — base `tsconfig.json` extended by each app
- **Tailwind config** — shared Tailwind CSS preset for design consistency

## Design Principles

- All environment variables should be **validated at startup** — fail fast if required vars are missing
- Constants should live here, not be duplicated across apps
- Configs should be **composable** — each app extends the shared base

## Status

🚧 **Placeholder — config package not yet implemented.**
