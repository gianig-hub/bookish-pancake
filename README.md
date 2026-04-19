# EK Marketplace

> The UK's specialist marketplace for cooling, air conditioning, and refrigeration — connecting businesses, installers, engineers, and suppliers in one vertical platform.

---

## What Is This?

EK Marketplace is a **UK vertical marketplace** — not a generic classifieds site, not a business blog. It is a purpose-built platform focused exclusively on **cooling, AC, refrigeration, cold rooms, and freezer rooms**. Users include businesses, independent installers, refrigeration engineers, equipment dealers, and trade suppliers.

The core model is simple: connect **buyers, sellers, and service providers** in a specialist industry that currently has no dominant UK platform. Transactions, enquiries, and service requests flow through structured marketplace categories rather than scattered directories or Facebook groups.

The UK cooling and refrigeration market is worth billions annually. It is fragmented, inefficient, and underserved digitally. There is no trusted, specialist UK platform that unifies equipment classifieds, services, and trade directories. EK Marketplace is being built to fill that gap.

---

## Core Product Areas

| Area | Description |
|---|---|
| **Services Marketplace** | Find or request installation, maintenance, repair, and breakdown cover |
| **Equipment Marketplace** | Buy and sell AC units, refrigeration systems, parts, tools, and accessories |
| **Business Directory** | Verified profiles for installers, dealers, and suppliers |
| **Wanted Ads** | Post requirements and receive quotes from verified providers |
| **Knowledge Hub** | Technical guides, FAQs, and industry resources |
| **AI Layer** | Smart search, content moderation, spam detection, and recommendations |

---

## AI-First Platform

AI is integrated into the platform to **reduce friction, scale trust, and improve discovery** — not as a marketing feature, but as infrastructure.

Where AI is used:
- **Search ranking** — relevance scoring across listings and service providers
- **Content moderation** — auto-flagging suspicious listings before human review
- **Spam detection** — pattern-based scam and duplicate detection
- **Category suggestions** — helping sellers classify listings correctly

What AI does **not** do:
- Business verification or approval
- Dispute resolution or refunds
- Account suspensions or legal decisions

All AI logic is **isolated in `packages/ai/`** — modular, auditable, and easy to disable. No AI code is scattered across application layers.

---

## Current Status

**Phase: Startup Structure** — monorepo scaffold is in place, no database schema yet.

| Ready | Not Yet Started |
|---|---|
| Monorepo configuration | Database schema |
| Shared TypeScript config | Authentication (NextAuth) |
| Docker Compose setup | API endpoints |
| Documentation structure | MVP marketplace features |
| GitHub Actions scaffolding | AI service implementations |

**Rough timeline:**
- **Weeks 1–2**: Database schema, authentication, core API
- **Weeks 3–4**: Services and equipment marketplace MVP
- **Weeks 5–6**: AI integration (search, moderation)
- **Weeks 7+**: Scale, analytics, performance

---

## Architecture

```
bookish-pancake/
├── apps/
│   ├── web/        # Next.js 14 frontend
│   ├── api/        # Express REST API
│   └── worker/     # Background jobs, queues
├── packages/
│   ├── ui/         # Shared React components
│   ├── config/     # Shared ESLint, TS, Prettier config
│   ├── ai/         # AI services (isolated)
│   └── types/      # Shared TypeScript interfaces
├── infra/
│   ├── nginx/      # Reverse proxy configuration
│   ├── docker/     # Dockerfiles per service
│   └── deploy/     # Deployment scripts
├── docs/           # Architecture, roadmap, AI, deployment guides
└── .github/        # Workflows and Copilot instructions
```

**Monorepo tooling:** npm workspaces + Turborepo. All apps share types, config, and UI components without duplication.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TailwindCSS |
| Backend | Express, TypeScript, Prisma ORM |
| Worker | Node.js, Bull queues |
| Database | PostgreSQL + Redis |
| DevOps | Docker, Docker Compose, Nginx |
| Monorepo | npm workspaces, Turborepo |
| CI/CD | GitHub Actions |

---

## Setup Philosophy

- **Production-ready from day 1** — not "move fast, break things"
- **Docker-first** — `docker-compose up` runs the full stack, no local database setup required
- **TypeScript everywhere** — strict mode, no `any`, shared types across apps
- **Security by default** — input validation, rate limiting, and auth patterns baked in from the start
- **Modular AI** — AI logic lives in one place, can be disabled without touching application code

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake

# 2. Install dependencies
npm install

# 3. Start infrastructure (PostgreSQL, Redis, Nginx)
docker-compose up

# 4. Start development servers (in a separate terminal)
npm run dev

# 5. Open the app
# Frontend: http://localhost:3000
# API:      http://localhost:4000
```

---

## Roadmap

| Phase | Focus | Key Deliverables |
|---|---|---|
| **Phase 1** | Core Infrastructure | Database schema, authentication (NextAuth), basic API endpoints |
| **Phase 2** | MVP Marketplace | Services marketplace, equipment marketplace, basic search |
| **Phase 3** | AI Integration | Smart search ranking, spam/scam detection, recommendations |
| **Phase 4** | Scale & Polish | Analytics, advanced features, performance optimisation |

Full feature breakdown: [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## Documentation

| Document | Description |
|---|---|
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Detailed feature roadmap by phase |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System design and data flow |
| [`docs/VPS-SETUP.md`](docs/VPS-SETUP.md) | Ubuntu VPS deployment guide |
| [`docs/AI-PLACEMENT-MAP.md`](docs/AI-PLACEMENT-MAP.md) | AI integration strategy and placement rules |
| [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | Development standards for AI-assisted coding |

---

## Contributing

1. Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for code standards
2. Check open issues before starting work
3. Branch from `main`, use descriptive branch names (`feature/`, `fix/`, `docs/`)
4. Keep PRs focused — one concern per PR
5. TypeScript strict mode is enforced — no `any` types
6. All AI additions must go in `packages/ai/` — not in application code

Pull requests are welcome. For significant changes, open an issue first to discuss the approach.

---

## License

This project is licensed under the [GNU General Public License v2.0](LICENSE).
