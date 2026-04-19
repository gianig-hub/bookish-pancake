# EK Marketplace - Copilot Instructions

## Project Overview

AI-first UK vertical marketplace for:
- Air conditioning equipment and services
- Refrigeration systems and components
- Cold rooms and freezer rooms
- Related equipment, parts, tools, and services

## Core Product Areas

1. **Services Marketplace** — Installation, maintenance, repair services
2. **Equipment Marketplace** — Buy/sell AC units, refrigeration equipment
3. **Businesses / Dealers Directory** — Verified installers, shops, suppliers
4. **Wanted Ads** — Post requirements, get quotes
5. **Guides / FAQ / Help Center** — Knowledge base for customers
6. **AI Features** — Search, posting assistance, moderation, support

## Working Rules

### Architecture Principles
- Keep MVP focused and production-oriented
- Prefer clean, modular architecture
- Do not generate placeholder logic without clearly marking it as `// TODO:`
- Use TypeScript where possible (strict mode)
- Optimize for Docker-based deployment on Ubuntu VPS

### Development Standards
- Keep security, rate limits, and validation in mind
- Prefer reusable components and shared types
- Add clear `// TODO:` notes where implementation is partial
- When changing code, explain impacted files and next steps
- Do not invent APIs or database columns without stating assumptions
- Use proper error handling and logging
- Never commit secrets — use `.env` only

### Code Organization
- Keep AI features modular under `packages/ai` only
- Separate concerns: API, workers, UI components
- Share types across monorepo via `packages/types`
- Share config/constants via `packages/config`
- Document all public APIs and interfaces

### Commit Style
```
feat: add listing browse page with filters
fix: correct pagination calculation
chore: update dependencies
docs: add AI placement map
refactor: extract listing card component
```

### PR Requirements
- Reference the relevant feature/phase
- Include a short description of changes
- List any affected packages/apps
- Note any environment variable changes

## Monorepo Structure

```
everything-kold-market/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   ├── api/          # Express backend API
│   └── worker/       # Background jobs (Bull)
├── packages/
│   ├── ui/           # Shared React components
│   ├── config/       # Shared constants and config
│   ├── ai/           # AI services (isolated)
│   ├── types/        # Shared TypeScript types
│   └── db/           # Prisma client and schema
├── infra/
│   ├── nginx/        # Nginx configs
│   ├── docker/       # Dockerfiles
│   └── deploy/       # Deployment scripts
├── docs/             # Project documentation
└── .github/          # CI/CD workflows
```

## Current Priority (Phase 1)

1. Database schema (Prisma) — `packages/db`
2. Authentication (NextAuth.js) — `apps/web`, `apps/api`
3. Core API endpoints — `apps/api`
4. Listing browse and detail pages — `apps/web`
5. Post-an-ad flow — `apps/web`

## Package Import Rules

```typescript
// ✅ Correct — use package aliases
import { CATEGORIES } from '@ek/config'
import type { Listing } from '@ek/types'
import { prisma } from '@ek/db'
import { Button } from '@ek/ui'

// ❌ Never import across apps directly
// import { something } from '../../apps/api/src/...'
```

## AI Feature Rules

- All AI calls must go through `packages/ai`
- All AI features must be feature-flagged
- All AI features must have non-AI fallback paths
- Never auto-post AI content without user confirmation
- Async moderation goes through the worker queue

## Database Rules

- Use Prisma for all DB interactions
- Always use transactions for multi-table writes
- Add indexes on filterable columns
- Use CUID for all primary keys
- Use soft deletes where appropriate (add `deletedAt` field)

## Security Checklist

Before any PR:
- [ ] Input validation (Zod schemas)
- [ ] Authentication check on protected routes
- [ ] Rate limiting on public endpoints
- [ ] No secrets in code
- [ ] SQL injection prevention (use Prisma, not raw queries)
- [ ] File upload validation (type, size, extension)

## Key Links

- [System Architecture](docs/architecture/SYSTEM_DESIGN.md)
- [AI Placement Map](docs/ai/AI_PLACEMENT_MAP.md)
- [API Overview](docs/architecture/API_OVERVIEW.md)
- [Data Model](docs/architecture/DATA_MODEL.md)
- [Product Roadmap](ROADMAP.md)
