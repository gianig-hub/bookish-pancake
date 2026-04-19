# EK Marketplace

> A UK specialist marketplace and classifieds platform for air conditioning, refrigeration, and cold room services and equipment.

---

## What Is This?

EK Marketplace is a **vertical marketplace**, not a business website. It connects businesses, installers, engineers, suppliers, and customers operating in the UK cooling and refrigeration sector.

The platform supports multiple ways to trade: browse and post **equipment listings**, offer and find **installation or repair services**, discover **verified local businesses**, post **wanted ads** and receive quotes, and access **technical guides and resources**.

The UK HVAC and refrigeration market is a multi-billion-euro industry — fragmented, largely offline, and without a dominant UK-specific classifieds platform. EK Marketplace is built to fill that gap.

---

## Marketplace Vision

| Area | Description |
|---|---|
| **Services Marketplace** | Installation, maintenance, emergency repair, contracts |
| **Equipment Marketplace** | AC units, refrigeration systems, cold rooms, parts, tools |
| **Business Directory** | Verified installers, suppliers, dealers, shops |
| **Wanted Ads** | Post requirements, receive quotes from local professionals |
| **Knowledge Hub** | Guides, FAQs, technical resources, help centre |
| **AI Layer** | Smart search, moderation, listing assistance, recommendations |

Target users: **B2B and B2C** — trade businesses, independent engineers, equipment suppliers, and end customers in the commercial cooling space.

---

## AI-First Platform

AI is a core part of the product, not an add-on.

**Where AI adds value:**
- Natural language search and service matching
- Spam and scam detection in listings and reviews
- Assisted listing creation (title, description, category)
- Moderation scoring and triage

**Where AI lives in this codebase:**
- `packages/ai/` — shared, modular AI services
- `apps/worker/` — background AI jobs and queues

**What AI does NOT do:** verify business credentials, resolve disputes, or process payments. Human moderation decisions are always final.

**Design principle:** AI features are modular, feature-flagged, and isolated — each can be enabled, disabled, or replaced independently.

---

## Current Status

**Phase:** Startup Structure

| What exists | What's next |
|---|---|
| Monorepo scaffold | Database schema (Prisma) |
| Folder structure | Authentication (JWT/sessions) |
| Configuration templates | MVP listing and search features |
| Documentation | CI/CD pipeline |

No production database schema yet. The structure is designed to build from.

---

## Architecture

```
bookish-pancake/
├── apps/
│   ├── web/        # Next.js 14 frontend
│   ├── api/        # Express REST API
│   └── worker/     # Node.js background jobs, AI tasks
├── packages/
│   ├── ui/         # Shared React components
│   ├── types/      # Shared TypeScript types
│   ├── config/     # Shared configuration
│   ├── ai/         # Modular AI services
│   └── db/         # Prisma client and schema
├── infra/
│   ├── docker/     # Dockerfiles
│   ├── nginx/      # Reverse proxy config
│   └── deploy/     # Deployment scripts
└── docs/
    ├── product/
    ├── architecture/
    ├── ai/
    └── deployment/
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TailwindCSS |
| Backend | Express, TypeScript, Prisma ORM |
| Worker | Node.js, Bull queues |
| Database | PostgreSQL, Redis |
| Deployment | Docker, Nginx, Ubuntu VPS |
| Monorepo | npm workspaces, Turborepo |
| CI/CD | GitHub Actions |

---

## Core Principles

- **Production-ready from day 1** — no throwaway code, no skipped validation
- **Docker-first** — `docker-compose up` covers the full local stack, no local database required
- **TypeScript everywhere** — strict mode, shared types, no `any`
- **Security by default** — input validation, rate limiting, auth on every route
- **Modular AI** — AI lives in `packages/ai/`, not scattered across the codebase

---

## Quick Start

```bash
npm install
docker-compose up          # starts PostgreSQL, Redis
npm run dev                # in a second terminal
```

Open [http://localhost:3000](http://localhost:3000)

---

## Development Roadmap

| Phase | Focus | Key Deliverables |
|---|---|---|
| **Phase 1** (Week 1–2) | Core Infrastructure | Database schema, authentication, basic API |
| **Phase 2** (Week 3–4) | MVP Marketplace | Services listings, equipment listings, search |
| **Phase 3** (Week 5–6) | AI Integration | Smart search ranking, moderation scoring, recommendations |
| **Phase 4** (Week 7+) | Scale & Optimise | Analytics, advanced features, performance tuning |

---

## Key Documentation

| File | Purpose |
|---|---|
| [ROADMAP.md](./ROADMAP.md) | Features, priorities, and delivery phases |
| [ARCHITECTURE.md](./docs/architecture/) | System design and technical decisions |
| [VPS-SETUP.md](./docs/deployment/VPS-SETUP.md) | Ubuntu VPS deployment guide |
| [.github/copilot-instructions.md](./.github/copilot-instructions.md) | Development standards and AI assistant rules |
| [docs/ai/AI-PLACEMENT-MAP.md](./docs/ai/AI-PLACEMENT-MAP.md) | AI feature guidelines and placement |

---

## Contributing

1. Read [.github/copilot-instructions.md](./.github/copilot-instructions.md) before writing code
2. Follow TypeScript strict mode — no `any`, no skipped validation
3. Keep AI code in `packages/ai/` or `apps/worker/`
4. Add `TODO:` markers for incomplete implementation
5. Open a PR with a clear description of what changed and why

All contributions are welcome. This is an early-stage project — the architecture decisions matter more than feature velocity.

---

## License

GPL-2.0 — see [LICENSE](./LICENSE)
