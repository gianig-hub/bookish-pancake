# EK Marketplace

> **UK specialist marketplace for AC, refrigeration, cold rooms, freezer rooms, parts, tools, and services.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue)](https://docs.docker.com/compose/)

---

## Project Overview

EK Marketplace is an AI-first UK vertical marketplace connecting buyers, sellers, traders, and businesses across the HVAC and refrigeration industry.

**Core product areas:**
- 🛠️ **Services Marketplace** — find and request AC, refrigeration, and cold room services
- 📦 **Equipment Marketplace** — buy and sell new, used, and refurbished equipment
- 🏢 **Businesses & Dealers Directory** — find verified trade businesses near you
- 📋 **Wanted Ads** — post and browse wanted equipment or service requests
- 🤖 **AI-powered tools** — search, posting, moderation, and support

---

## Current Status

> **Phase 1 — Foundation & Auth Shell**
>
> Monorepo structure, startup docs, auth shell with email/password, and role-aware routing are in place.
> Real database, billing, and full AI endpoints are **not yet built**.

---

## Monorepo Structure

```
ek-marketplace/
├── apps/
│   ├── web/          → Next.js 14 App Router frontend
│   ├── api/          → Express REST API
│   └── worker/       → Background job worker (TODO)
├── packages/
│   ├── types/        → Shared TypeScript types (roles, users, sessions)
│   ├── ui/           → Shared React components (TODO)
│   ├── config/       → Shared config (TODO)
│   └── ai/           → AI prompt library and wrappers (TODO)
├── infra/
│   ├── nginx/        → Nginx reverse proxy config
│   ├── docker/       → Docker build assets
│   └── deploy/       → Deployment scripts
├── docs/
│   ├── product/      → Product specs and role docs
│   ├── architecture/ → Architecture decisions
│   ├── ai/           → AI placement map
│   └── deployment/   → VPS and infra setup
└── .github/          → Copilot instructions, CI workflows
```

---

## Auth & Roles (current)

| Role             | Access                                   |
| ---------------- | ---------------------------------------- |
| `buyer`          | Browse, save, message                    |
| `private_seller` | Post personal ads                        |
| `trader`         | Post trade ads                           |
| `dealer`         | Full business listing + dashboard        |
| `business`       | Business dashboard                       |
| `admin`          | Full platform access                     |

Protected routes:
- `/account` — any authenticated user
- `/business` — dealer, business, admin
- `/admin` — admin only

---

## Setup Philosophy

- TypeScript-first across all packages
- Monorepo with npm workspaces
- Docker Compose for local development
- No over-engineering at MVP stage
- In-memory session/user store now → PostgreSQL/Redis later
- TODO markers where production implementation is needed

---

## Quick Start

```bash
cp .env.example .env.local
npm install
# Start web and API separately for dev:
npm run dev:web
npm run dev:api
# Or with Docker:
docker-compose up
```

---

## Current Priorities

1. ✅ Monorepo structure and startup docs
2. ✅ Auth shell — email/password, protected routes, role guards
3. ⬜ Connect web auth to API (remove in-process stores)
4. ⬜ PostgreSQL + Prisma schema starter
5. ⬜ Public pages (home, categories, listings)
6. ⬜ Listing post flow

---

## Next Steps

See [NEXT-STEPS.md](./NEXT-STEPS.md) and [ROADMAP.md](./ROADMAP.md) for the full build order.

---

## Docs

- [Auth & Roles](./docs/product/AUTH-AND-ROLES.md)
- [AI Placement Map](./docs/ai/AI-PLACEMENT-MAP.md)
- [VPS Setup](./docs/deployment/VPS-SETUP.md)
- [Roadmap](./ROADMAP.md)
