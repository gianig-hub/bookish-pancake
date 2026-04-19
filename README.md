# EK Marketplace

> **AI-first UK vertical marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, equipment, parts, tools, and services.**

---

## Overview

EK Marketplace is a specialist UK classifieds and services platform — not a generic marketplace. It is purpose-built for the cooling and refrigeration industry, combining:

- **Services Marketplace** — find or request AC installation, refrigeration servicing, cold room repairs, and more
- **Equipment Marketplace** — buy, sell, or browse new, used, and refurbished cooling equipment and parts
- **Businesses & Dealers Directory** — discover and connect with trade businesses, installers, and suppliers
- **Wanted Ads** — post what you're looking for and let sellers come to you
- **Guides & Help Centre** — practical industry guides, FAQ, and trust content
- **AI-assisted tools** — search, post, moderate, and manage listings with integrated AI

---

## Marketplace Vision

Our goal is to become the **go-to UK platform** for anyone who buys, sells, or services:

- air conditioning units and systems
- commercial and domestic refrigeration
- cold room and freezer room equipment
- related parts, tools, accessories, and services

We are building a platform that works for:

- **Private sellers** — clearing equipment, selling used units
- **Trade sellers / dealers** — listing stock at scale
- **Service businesses** — visibility for their services
- **Buyers** — finding the right equipment or engineer quickly

AI is a core capability, not an add-on.

---

## AI-First Direction

AI is woven into the product where it adds genuine value:

| Area | AI Role |
|------|---------|
| **Search** | Natural-language queries, smart ranking |
| **Posting** | Title/description suggestions, category auto-fill |
| **Moderation** | Spam detection, duplicate flagging |
| **Business tools** | Profile writing, lead reply drafting |
| **Support** | FAQ assistant, triage routing |

AI lives in `packages/ai` and `apps/worker`. It is modular — features can be enabled/disabled per phase.

---

## Current Status

> **Phase: Planning / Architecture**

- [x] Project vision defined
- [x] Monorepo structure scaffolded
- [x] AI placement map drafted
- [x] VPS deployment guide written
- [x] Environment configuration template created
- [x] Docker Compose local dev setup ready
- [ ] Database schema (Prisma) — Phase 1
- [ ] Authentication (NextAuth + API) — Phase 1
- [ ] Core API endpoints — Phase 1
- [ ] Public-facing UI pages — Phase 1

---

## Monorepo Structure

```
bookish-pancake/
├── apps/
│   ├── web/          # Next.js frontend (public site + account area)
│   ├── api/          # Express/Node backend API
│   └── worker/       # Background job processor (emails, AI, cleanup)
├── packages/
│   ├── ai/           # AI service layer (prompts, routing, wrappers)
│   ├── config/       # Shared config, constants, env helpers
│   ├── types/        # Shared TypeScript types and contracts
│   └── ui/           # Shared React component library
├── infra/
│   ├── nginx/        # Nginx reverse proxy configuration
│   ├── docker/       # Additional Docker files
│   └── deploy/       # Deployment scripts and helpers
├── docs/
│   ├── ai/           # AI placement map and strategy
│   ├── architecture/ # Technical architecture notes
│   ├── deployment/   # VPS and deployment guides
│   └── product/      # Product and feature planning docs
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/    # CI/CD pipeline definitions
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
├── NEXT-STEPS.md
├── .env.example
└── docker-compose.yml
```

---

## Setup Philosophy

- **Monorepo** — one repo, consistent tooling, shared code between apps
- **TypeScript first** — type safety across all apps and packages
- **Docker-native** — runs locally via Docker Compose; deploys to Ubuntu VPS
- **AI-modular** — AI features isolated, can be disabled without breaking core product
- **MVP-first** — build what's needed to launch, not what's nice to have later

---

## Quick Start (Local Dev)

```bash
# 1. Clone and install
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your local values

# 3. Start all services
docker-compose up

# Services will be available at:
# http://localhost:3000  → web (Next.js)
# http://localhost:4000  → api (Express)
# http://localhost:5432  → postgres
# http://localhost:6379  → redis
```

---

## Current Priorities

1. Finalise brand and domain
2. Complete AI placement map review
3. Set up VPS with Docker and Nginx
4. Build minimal auth (login/register)
5. Build posting flow (Phase 1 listings)
6. Public pages and search

See [NEXT-STEPS.md](./NEXT-STEPS.md) for the recommended build order.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TailwindCSS, NextAuth |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL (Prisma ORM) |
| Cache / Queue | Redis, BullMQ |
| AI | OpenAI API (modular, swappable) |
| Infrastructure | Docker Compose, Nginx, Ubuntu VPS |
| Monorepo | npm workspaces |

---

## Contributing

See `.github/copilot-instructions.md` for project conventions, architecture rules, and coding standards.

---

*EK Marketplace — Built for the UK cooling and refrigeration industry.*
