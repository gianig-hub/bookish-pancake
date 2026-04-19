# EK Marketplace – Copilot Dev Instructions

## Project Summary

EK Marketplace is an AI-first UK vertical marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, parts, tools, wanted ads, and services. It is a TypeScript monorepo using Next.js (web), Express (API), and a BullMQ worker.

---

## Core Rules

### Scope & Focus
- Keep the MVP focused. Do not build beyond the current phase unless explicitly requested.
- Do not invent database schema or API contracts without clearly stating your assumptions.
- Do not add new dependencies unless strictly necessary — check existing packages first.
- Add `// TODO:` markers clearly for all deferred or incomplete work.

### TypeScript Standards
- TypeScript everywhere. No implicit `any`. Strict mode enabled in all tsconfigs.
- Use shared types from `@ek/types` (packages/types) rather than duplicating type definitions.
- Use shared constants and labels from `@ek/config` (packages/config).
- Use enums defined in `@ek/types` for `ListingPurpose`, `ListingCategory`, `ListingCondition`, `ListingStatus`.

### Architecture
- Monorepo structure: `apps/web`, `apps/api`, `apps/worker`, `packages/types`, `packages/config`, `packages/ui`, `packages/ai`.
- All AI logic must be isolated in `packages/ai` or `apps/worker`. Never embed AI calls directly in API route handlers or React components.
- UI components in `packages/ui` should be headless / minimally styled.

### AI Modules
- AI is modular, feature-flagged, and opt-in. It must never block core user flows.
- AI features should be behind environment feature flags (`FEATURE_AI_*=true/false`).
- Separate AI prompt templates from business logic.

### Security & Validation
- Validate all user input at the API layer. Use the shared validation helpers or a schema library (zod preferred when added).
- Never trust client-provided data without validation.
- Keep rate limiting, CORS, and security headers in mind for all API routes (TODO: add middleware in Phase 1 auth sprint).
- Never commit secrets. Use `.env.local` (gitignored). Document all variables in `.env.example`.

### Docker & Deployment
- Optimize for Docker on Ubuntu 24.04 VPS.
- All services should have Docker Compose entries for local development.
- Use health check endpoints (`GET /health`) on all backend services.

### Code Quality
- Prefer `const` over `let`; avoid mutations where possible.
- When making changes, always state: which files were affected, what was changed, and what the next recommended step is.
- Match the style of surrounding code. Do not reformat unrelated code.

### Documentation
- Update `CHANGELOG.md` when adding or changing significant features.
- Significant new product features require a doc in `docs/product/`.
- Posting flow documentation lives in `docs/product/POSTING-FLOW.md`.
