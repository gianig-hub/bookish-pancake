# EK Marketplace — Copilot Development Instructions

## Project Overview

This is an **AI-first UK vertical marketplace** for air conditioning, refrigeration, cold rooms, freezer rooms, equipment, parts, tools, and services.

It is a specialist marketplace/classifieds platform — not a generic website or brochure site.

---

## Core Rules

### 1. Stay MVP-Focused
- Build only what is needed for the current phase
- Do not add features, columns, or API routes that are not in scope
- When in doubt, leave a `TODO` comment and move on
- Complexity deferred is complexity avoided

### 2. Prefer TypeScript Everywhere
- All new code in `apps/` and `packages/` should be TypeScript
- Use strict mode where possible
- Avoid `any` — use unknown and narrow types explicitly

### 3. Modular Architecture
- Keep concerns separated: web → api → worker → packages
- Avoid cross-imports between apps (use shared packages instead)
- Each app should be independently deployable

### 4. AI Must Be Isolated
- All AI logic lives in `packages/ai` or `apps/worker`
- AI features are controlled by `FEATURE_AI_ENABLED` flag
- Never call OpenAI directly from `apps/web` or `apps/api` routes
- AI prompts live in `packages/ai/prompts/` — keep them versioned
- Every AI call must be wrapped and have a fallback

### 5. Do Not Invent Schema or APIs
- Do not add database columns or API fields without a clear reason
- If you need to make assumptions, state them explicitly in comments
- Use `// ASSUMPTION: ...` for design decisions that need review
- Use `// TODO: ...` for intentionally incomplete work

### 6. Prefer Shared Types and Config
- Shared TypeScript types live in `packages/types`
- Shared constants and env helpers live in `packages/config`
- Do not duplicate types across apps — import from shared packages

### 7. Docker and VPS Deployment
- All services must run inside Docker containers
- Target environment: Ubuntu 24.04 LTS, Nginx, Docker Compose
- Environment variables come from `.env.local` (never hardcoded)
- Health checks must exist on all production-facing services

### 8. Security, Validation, Rate Limiting
- Validate all user input on the API side (use Zod)
- Rate limit public endpoints — especially auth, posting, search
- Never trust client-supplied user IDs or roles — derive from JWT
- Sanitise before storing any user-generated content
- Never expose stack traces or internal errors to the client

### 9. Explain Impact and Next Steps
- When making a significant change, add a comment explaining:
  - what files are affected
  - what needs to happen next
- This helps other developers (and AI tools) understand context

---

## Domain Context

Marketplace categories this platform covers:

- Air conditioning (installation, servicing, equipment)
- Refrigeration (commercial, domestic, industrial)
- Cold rooms and freezer rooms
- Related equipment, parts, tools, accessories
- Service requests and wanted ads

User types:
- **Buyer** — browsing, searching, saving listings
- **Private Seller** — occasional individual listings
- **Trade Seller / Dealer** — business account, volume listings
- **Business** — service provider with a profile page
- **Admin** — platform operator

---

## File Naming and Structure

```
apps/
  web/src/           # Next.js pages, components, hooks
  api/src/           # Express routes, controllers, services, middleware
  worker/src/        # BullMQ queues, processors, schedulers

packages/
  ai/src/            # Prompts, OpenAI client, model routing
  config/src/        # Constants, feature flags, env schema
  types/src/         # TypeScript interfaces and enums

infra/
  nginx/             # Nginx configs
  docker/            # Dockerfiles
  deploy/            # Deployment scripts

docs/
  ai/                # AI strategy and placement
  architecture/      # Technical architecture notes
  deployment/        # VPS and deployment guides
  product/           # Product planning docs
```

---

## What NOT to Do

- Do not auto-generate database migrations without review
- Do not add npm packages without checking if a native or existing solution works
- Do not make API changes that break backwards compatibility without a version bump
- Do not add `.env` values to source code
- Do not commit `node_modules/`, `.env.local`, or build artifacts
