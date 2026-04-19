# EK Marketplace

**The UK specialist marketplace for cooling, air conditioning, and refrigeration.**

[![Status](https://img.shields.io/badge/status-startup%20structure-blue)](./docs/)
[![Stack](https://img.shields.io/badge/stack-Next.js%20%7C%20Express%20%7C%20PostgreSQL-informational)](./docs/architecture/)
[![License](https://img.shields.io/badge/license-GPL--2.0-green)](./LICENSE)

---

## Project Overview

EK Marketplace is a specialist UK vertical marketplace and classifieds platform for the cooling, air conditioning, and refrigeration industry. This is not a business website — it is a full marketplace platform built for businesses, installers, engineers, and suppliers operating in the HVAC and refrigeration sector.

The platform addresses a clear gap: no dedicated, trusted UK marketplace exists for this industry. Trade professionals currently rely on generic classifieds, trade forums, or word of mouth to buy equipment, find services, or source parts. EK Marketplace changes that by providing a purpose-built platform with structured listings, verified business profiles, and AI-powered tools built specifically for this sector.

Target users include refrigeration and AC installers, equipment dealers, parts suppliers, cold room builders, engineers seeking work or parts, and businesses looking for services or second-hand kit.

---

## Marketplace Vision

EK Marketplace enables professionals and businesses across the UK cooling industry to connect directly — buy, sell, or request equipment, post or find services, list wanted ads, and discover verified trade businesses — all within a single trusted platform.

The goal is a network effect: more listings attract more buyers, which attracts more sellers and service providers. Over time, EK Marketplace becomes the default starting point for anyone working in UK cooling and refrigeration — from a one-van installer to a national distributor.

---

## Core Product Areas

| Area | Description |
|---|---|
| **Services Marketplace** | Post or find installation, maintenance, repair, and breakdown cover |
| **Equipment Marketplace** | Buy and sell AC units, refrigeration systems, cold room components, parts, tools |
| **Business Directory** | Verified profiles for installers, dealers, suppliers, and trade shops |
| **Wanted Ads** | Post requirements, request quotes, find buyers for surplus stock |
| **Knowledge Hub** | Guides, FAQs, help content, and industry resources |
| **AI Layer** | Smart search, listing assistance, moderation, and recommendations |

---

## AI-First Platform

AI is built in from the start, not bolted on later. It reduces friction for users and enables the platform to scale trust and quality without a large operations team.

**Where AI is used:**
- Smart search with natural language and fuzzy matching
- Listing title and description generation for sellers
- Auto-categorisation of new listings
- Moderation scoring for spam and scam detection
- Recommendation engine for related listings and services

**What AI does not do:**
- Verify businesses or identities (manual review required)
- Resolve disputes or process payments
- Auto-approve paid listings or suspend accounts
- Make decisions above a configurable confidence threshold

All AI features are isolated in `packages/ai` and `apps/worker`. They are modular and can be enabled or disabled independently.

---

## Current Status

**Phase: Startup structure — monorepo + documentation**

The repository currently contains the folder structure, configuration patterns, documentation framework, and project context. The `packages/db` directory and Prisma setup exist, but no database schema has been defined yet.

**What exists:** folder layout, Docker configuration, environment templates, GitHub workflows, documentation stubs  
**What is next:** database schema definition, authentication, MVP marketplace features  
**Not yet started:** payments, subscriptions, advanced AI, production deployment

---

## Architecture

```
apps/
├── web           # Next.js 14 frontend
├── api           # Express backend
└── worker        # Background jobs & AI processing

packages/
├── ui            # Shared React components
├── types         # Shared TypeScript types
├── config        # Shared configuration
├── ai            # AI services (isolated)
└── db            # Database layer (Prisma)

infra/
├── docker        # Dockerfiles
├── nginx         # Reverse proxy configuration
└── deploy        # Deployment scripts

docs/
├── product       # Features and roadmap
├── architecture  # System design
├── ai            # AI placement and guidelines
└── deployment    # VPS setup and operations
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React 18, TailwindCSS |
| Backend | Express, Node.js |
| ORM | Prisma |
| Database | PostgreSQL, Redis |
| Monorepo | npm workspaces, Turborepo |
| Deployment | Docker, Docker Compose, Nginx, Ubuntu VPS |
| Language | TypeScript throughout |

---

## Setup Philosophy

- **Production-ready from day one** — structure matches the target deployment environment
- **Docker-first** — no local database installation required; run `docker-compose up` and go
- **TypeScript everywhere** — strict mode, shared types, no implicit `any`
- **Security by default** — validation, rate limiting, and auth considered from the start
- **Modular AI** — all AI logic lives in one place; nothing scattered across the codebase

---

## Quick Start

```bash
# Prerequisites: Node.js 20+, Docker

git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake

cp .env.example .env          # Configure environment variables
npm install                    # Install all workspace dependencies
docker-compose up -d           # Start PostgreSQL, Redis, and services
npm run dev                    # Start all apps in development mode
```

- Web app: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:4000](http://localhost:4000)
- See [`docs/deployment/`](./docs/deployment/) for full VPS setup

---

## Project Roadmap

| Phase | Focus | Timeline |
|---|---|---|
| **Phase 1** | Schema, authentication, core infrastructure | Week 1–2 |
| **Phase 2** | MVP marketplace (listings, search, profiles) | Week 3–4 |
| **Phase 3** | AI integration (search, moderation, assist) | Week 5–6 |
| **Phase 4** | Polish, analytics, production deployment | Week 7+ |

See [`ROADMAP.md`](./ROADMAP.md) for the full feature breakdown.

---

## Key Documentation

| Document | Description |
|---|---|
| [`ROADMAP.md`](./ROADMAP.md) | Feature phases and delivery plan |
| [`docs/architecture/`](./docs/architecture/) | System design and data flow |
| [`docs/ai/`](./docs/ai/) | AI placement map and integration guidelines |
| [`docs/deployment/`](./docs/deployment/) | VPS setup guide (Ubuntu 24.04) |
| [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | Development standards and Copilot guidelines |

---

## Contributing

This project follows the standards defined in [`.github/copilot-instructions.md`](./.github/copilot-instructions.md).

- Use TypeScript strictly — no `any`, no missing types
- Keep AI logic in `packages/ai` or `apps/worker` only
- Add `TODO:` markers where implementation is partial
- Document assumptions when adding schema changes or APIs
- Write clear PR descriptions that list impacted files and next steps
- Report bugs and suggestions via [GitHub Issues](../../issues)

---

## License

This project is licensed under the [GNU General Public License v2.0](./LICENSE).
