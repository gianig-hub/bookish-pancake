# EK Marketplace

**UK's Specialist Marketplace for Air Conditioning, Refrigeration & Cooling Equipment**

---

## Overview

EK Marketplace is an AI-first UK vertical marketplace connecting buyers, sellers, businesses, dealers, and service providers in the air conditioning, refrigeration, cold rooms, and freezer rooms sector.

This is not a brochure site — it is a full marketplace/classifieds platform with listings, service requests, business profiles, wanted ads, and AI-powered tools for search, posting, and moderation.

---

## Marketplace Vision

> Build the UK's go-to specialist platform for the cooling industry — where trade professionals, businesses, and individual buyers can find equipment, services, and expertise in one place.

---

## Main Product Areas

| Area | Description |
|------|-------------|
| **Services Marketplace** | Find or request AC installation, servicing, repairs, maintenance contracts, cold room builds |
| **Equipment Marketplace** | Buy and sell new, used, ex-display, and refurbished cooling equipment, parts, and tools |
| **Business Directory** | Find verified dealers, installers, suppliers, and service providers across the UK |
| **Wanted Ads** | Post or browse wanted listings for specific equipment or services |
| **Guides & Help Centre** | Industry guides, FAQ, and trust & safety resources |
| **AI Tools** | Smart search, listing assistant, business profile writer, moderation AI |

---

## AI-First Direction

AI is embedded into core user flows — not bolted on as a feature:

- **Buyers:** Natural language search, service matching, FAQ assistant
- **Sellers:** Title/description generation, category suggestion, missing info detection
- **Businesses:** Profile writer, lead reply drafting, FAQ generation
- **Admins:** Spam detection, duplicate listing detection, content moderation queue

All AI logic is isolated in `packages/ai` and activated via feature flags. AI features are **off by default** until Phase 3.

---

## Current Status

🚧 **Planning / Architecture Phase** — foundational structure, types, config, and shells in place.

---

## Monorepo Structure

```
apps/
  web/          → Next.js frontend (public site + account + admin)
  api/          → Express REST API
  worker/       → Background job processor (BullMQ)

packages/
  types/        → Shared TypeScript types (UserRole, AuthUser, SessionUser, etc.)
  config/       → Shared constants, route guards, feature flags
  ui/           → Shared React component library
  ai/           → AI/LLM integration (prompts, tools, guardrails)

infra/
  nginx/        → Nginx reverse proxy config
  docker/       → Docker-related files
  deploy/       → Deployment scripts and notes

docs/
  product/      → Product specs and decisions (AUTH-AND-ROLES.md, etc.)
  architecture/ → Technical architecture notes
  ai/           → AI placement and strategy (AI-PLACEMENT-MAP.md)
  deployment/   → VPS setup and deployment guides

.github/
  workflows/    → CI/CD pipeline definitions
  copilot-instructions.md → Development standards for Copilot
```

---

## Setup Philosophy

- **Monorepo** with npm workspaces (or Turborepo — TODO)
- **TypeScript everywhere** — shared types prevent runtime surprises
- **Docker Compose** for local and production deployment
- **Feature flags** for AI features — ship the shell, activate when ready
- **No over-engineering** — keep it minimal until scale demands otherwise

---

## Current Priorities

1. ✅ Monorepo structure and starter files
2. ✅ Shared types (`packages/types`)
3. ✅ Shared config and feature flags (`packages/config`)
4. ✅ Frontend shell with route areas (`apps/web`)
5. ✅ API shell with auth/role structure (`apps/api`)
6. ✅ Auth and roles documentation (`docs/product/AUTH-AND-ROLES.md`)
7. 🔲 Implement auth (register, login, JWT)
8. 🔲 Add Prisma schema (User + Session models)
9. 🔲 Build public page shells (homepage, listings browse)
10. 🔲 Build account dashboard

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Install dependencies
npm install

# Start all services (requires Docker)
docker compose up
```

> See `NEXT-STEPS.md` for the recommended build order.

---

## Licence

[GPL-3.0](./LICENSE)
