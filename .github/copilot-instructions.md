# EK Marketplace — Copilot Dev Instructions
#
# These rules apply to all Copilot-assisted work in this repository.
# Read and follow these before making changes.

## Project Identity

This is an **AI-first UK specialist marketplace** for:
- air conditioning (AC) equipment and services
- refrigeration equipment and services
- cold rooms and freezer rooms
- related parts, tools, and accessories
- trade and dealer listings
- wanted ads

The platform is called **EK Marketplace**. It targets the UK market.

## Core Principles

1. **TypeScript first** — use TypeScript in all new files (`.ts`, `.tsx`).
2. **Modular architecture** — keep concerns separated. One file should do one thing.
3. **MVP focus** — do not over-engineer. Build what is needed now.
4. **No invented schema** — do not create database columns or API fields without stating assumptions.
5. **TODO markers** — add `// TODO:` comments wherever implementation is intentionally incomplete.
6. **Shared types** — use `packages/types` for types shared between apps and packages.
7. **AI is modular** — all AI features live in `packages/ai` or `apps/worker`. Do not inline AI calls in page components.
8. **Docker-ready** — code should run in Docker on Ubuntu VPS without special local setup.
9. **Security mindset** — validate inputs, never expose secrets, rate-limit auth endpoints.
10. **Explain impact** — when making changes, note which files are affected and what the next step should be.

## Folder Responsibilities

| Folder              | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `apps/web`          | Next.js frontend — UI, auth pages, protected routes |
| `apps/api`          | Express REST API — auth, listings, businesses       |
| `apps/worker`       | Background jobs — email, AI processing, cron        |
| `packages/types`    | Shared TypeScript types (roles, users, sessions)    |
| `packages/ui`       | Shared React components                             |
| `packages/config`   | Shared config (env parsing, constants)              |
| `packages/ai`       | AI prompt library, model routing, guardrails        |
| `infra/nginx`       | Nginx reverse proxy config                          |
| `infra/docker`      | Dockerfiles for each service                        |
| `docs/`             | Product specs, architecture notes, AI placement map |

## Auth & Roles

Roles (defined in `packages/types/src/auth.ts`):
- `buyer` — browse, save, message
- `private_seller` — post personal ads
- `trader` — post trade-level ads
- `dealer` — full dealer listing + business dashboard
- `business` — business dashboard
- `admin` — full access

Protected routes:
- `/account` — any authenticated user
- `/business` — dealer, business, admin
- `/admin` — admin only

## What NOT to Build Yet

- Full database schema (Phase 2)
- Payment / billing (Phase 3)
- Deep AI endpoints (Phase 3)
- Social login / OAuth (Phase 2)
- Email sending (Phase 2)
- Native mobile apps (Phase 5+)

## Style Guidelines

- Prefer `const` over `let`.
- Use named exports (not default exports) for utilities, hooks, and types.
- Default exports are fine for Next.js page components.
- Keep components small — extract if a component exceeds ~100 lines.
- Avoid `any` — use `unknown` and type narrowing instead.
- Do not add console.log unless it is a startup warning or error.

## When Making Changes

- Note which files are affected.
- List any assumptions made.
- Add TODOs for missing pieces.
- Suggest the next step.
