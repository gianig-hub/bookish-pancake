# EK Marketplace — Copilot Development Instructions

This file defines the rules and conventions Copilot should follow when working on this repository.

---

## Project Context

This is an **AI-first UK vertical marketplace** for:
- Air conditioning (AC) equipment and services
- Refrigeration equipment and services
- Cold rooms (installation, equipment, parts)
- Freezer rooms (installation, equipment, parts)
- Related parts, tools, wanted ads, and service requests

This is a **specialist UK marketplace/classifieds platform** — not a generic marketplace and not a brochure site.

---

## Core Rules

1. **Keep the MVP focused and production-oriented.** Do not over-engineer or add complexity that isn't needed for MVP.

2. **Prefer TypeScript everywhere.** All new files should be `.ts` or `.tsx`. Avoid plain JavaScript unless absolutely necessary.

3. **Prefer clean modular architecture.** Keep each module/feature in its own folder with clear responsibilities.

4. **Isolate AI features in `packages/ai` or `apps/worker`.** Do not add AI/LLM calls directly into API route handlers or UI components.

5. **Do not invent database columns or API contracts without clearly stating assumptions.** If you are unsure about a data shape, add a `// TODO:` comment explaining what is needed.

6. **Add `// TODO:` markers where implementation is intentionally partial.** Make it clear what is a placeholder vs. production code.

7. **Prefer shared types from `packages/types`.** Do not duplicate type definitions across apps.

8. **Prefer shared config from `packages/config`.** Do not hardcode role names, route paths, or feature flags in app code.

9. **Optimise for Docker deployment on Ubuntu VPS.** Keep production concerns (env vars, health checks, graceful shutdown) in mind.

10. **Keep security, validation, and rate limiting in mind.**
    - Validate all inputs (Zod or equivalent)
    - Rate limit auth endpoints
    - Never expose stack traces in production API responses
    - Never commit secrets

11. **When making changes, explain:**
    - What files were changed and why
    - What the next recommended step is
    - Any assumptions made about data shape or behaviour

---

## Project Structure

```
apps/web          → Next.js (App Router) frontend
apps/api          → Express REST API
apps/worker       → Background jobs (BullMQ)
packages/types    → Shared TypeScript types
packages/config   → Shared constants, routes, feature flags
packages/ui       → Shared React components
packages/ai       → AI/LLM integration (prompts, tools, guardrails)
infra/nginx       → Nginx reverse proxy config
docs/             → Product, architecture, AI, and deployment docs
```

---

## Technology Preferences

| Layer | Preferred |
|-------|-----------|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| API | Express + TypeScript |
| Validation | Zod |
| ORM | Prisma |
| Auth | JWT (custom) or NextAuth.js |
| Background jobs | BullMQ |
| Database | PostgreSQL |
| Cache / Queue | Redis |
| AI | OpenAI SDK (via `packages/ai`) |
| Deployment | Docker Compose, Ubuntu VPS, Nginx |

---

## Do NOT

- Invent full DB schema without discussion
- Add AI calls inline in route handlers
- Commit `.env` files with real secrets
- Remove `// TODO:` comments without implementing the TODO
- Use `any` types in TypeScript without a comment explaining why
- Build Phase 3+ features during Phase 1–2 work
