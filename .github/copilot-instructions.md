# EK Marketplace — Copilot Development Instructions

This file sets the development standards and context for GitHub Copilot when working in this repository.

---

## Project Context

This is an **AI-first UK vertical marketplace** focused on:

- Air conditioning equipment and services
- Refrigeration equipment and services
- Cold rooms and freezer rooms
- Related equipment, parts, tools, and services

It is a **specialist marketplace/classifieds platform** — not a general listing site or brochure website.

---

## Development Standards

### TypeScript
- Prefer TypeScript over JavaScript everywhere.
- Use strict TypeScript settings where possible.
- Shared types live in `packages/types`. Do not duplicate type definitions.

### Architecture
- Prefer clean, modular architecture.
- Each app (`apps/web`, `apps/api`, `apps/worker`) has a single clear responsibility.
- Shared logic belongs in `packages/`, not duplicated across apps.
- AI features belong in `packages/ai` or `apps/worker` — not embedded in `apps/api` or `apps/web` directly.

### AI Features
- Keep AI modules isolated and swappable (OpenAI ↔ Anthropic ↔ local models).
- Do not hard-code AI logic into core business logic.
- AI features are a Phase 3 priority unless explicitly requested.
- When suggesting AI features, confirm they are enabled via `AI_ENABLED` feature flag.

### Database and APIs
- Do not invent database columns, table names, or API endpoints without clearly stating the assumption.
- Prefer Prisma for database access. Keep schema in `apps/api/prisma/`.
- Add TODO markers where implementation is intentionally incomplete.

### Security
- Rate limiting is required on all public API endpoints.
- Input validation is required on all API inputs (use Zod or similar).
- Security headers must be set in Nginx and API responses.
- CORS must be explicitly configured — do not use `*` in production.
- Never log sensitive data (passwords, tokens, payment details).

### Docker and Deployment
- All apps must be runnable via `docker-compose up`.
- Optimise for Docker deployment on Ubuntu 24.04 VPS.
- Environment variables are loaded from `.env.local` (never committed).
- Production Dockerfiles should use multi-stage builds.

### Code Style
- Prefer `async/await` over callback patterns.
- Use named exports over default exports in shared packages.
- Keep functions small and single-purpose.
- Add comments only where logic is non-obvious.

### Documentation
- When making changes, explain impacted files and next steps in the PR description.
- Keep README files in each app and package up to date.
- Use TODO markers where work is intentionally deferred.

---

## MVP Focus

- Keep the MVP focused and production-oriented.
- Do not over-engineer early features.
- Build for what is needed now, not for hypothetical future scale.
- Phase 1 = foundation. Phase 2 = marketplace. Phase 3 = AI. Phase 4 = scale.

---

## What Not to Do

- Do not build full database schemas speculatively.
- Do not add third-party dependencies without checking if a simpler built-in solution exists.
- Do not commit secrets, API keys, or passwords.
- Do not create thin AI-generated content pages (SEO risk).
- Do not build mobile app features (web-first for MVP).
