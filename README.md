# EK Marketplace

An **AI-first UK vertical marketplace** for air conditioning, refrigeration, cold rooms, freezer rooms, and related equipment, parts, tools, and services.

## Overview

EK Marketplace connects buyers, sellers, businesses, and service providers in the UK cooling and refrigeration industry. The platform combines a services marketplace, equipment classifieds, business directory, and wanted ads — all powered by AI-assisted tooling.

## Key Features

- 🛒 **Equipment Marketplace** — Buy/sell new, used, and refurbished AC and refrigeration equipment
- 🔧 **Services Marketplace** — Find or request installation, servicing, emergency repairs, and maintenance
- 🏢 **Business Directory** — Verified dealers, installers, and trade suppliers
- 📋 **Wanted Ads** — Post or browse equipment/service requests
- 🤖 **AI-Assisted** — Search, posting, moderation, and business support powered by AI

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js + React + TailwindCSS |
| Backend API | Node.js + Express + TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Cache / Queues | Redis + BullMQ |
| Auth | NextAuth.js |
| Containerisation | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| Hosting | OVH VPS (Ubuntu 24.04) |

## Monorepo Structure

```
bookish-pancake/
├── apps/
│   ├── web/          # Next.js frontend (marketplace UI)
│   ├── api/          # Express backend (REST API)
│   └── worker/       # Background job processor
├── packages/
│   ├── ui/           # Shared React component library
│   ├── types/        # Shared TypeScript types
│   ├── config/       # Shared configuration and constants
│   └── ai/           # AI service layer
├── infra/
│   ├── nginx/        # Nginx reverse proxy configs
│   └── docker/       # Docker production configs
├── docs/             # Project documentation
├── .github/          # GitHub Actions and Copilot instructions
├── docker-compose.yml
├── .env.example
├── ROADMAP.md
└── NEXT-STEPS.md
```

## Quick Start (Local Development)

```bash
# 1. Clone the repo
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake

# 2. Copy environment variables
cp .env.example .env.local

# 3. Install dependencies (root + all workspaces)
npm install

# 4. Start all services with Docker
docker-compose up

# 5. Access locally
# Web:  http://localhost:3000
# API:  http://localhost:4000
# DB:   localhost:5432
```

## Subdomains (Production)

| Subdomain | Target | Purpose |
|-----------|--------|---------|
| `www.koldmarket.co.uk` | Next.js :3000 | Main marketplace UI |
| `app.koldmarket.co.uk` | Next.js :3000 | Alternative web access |
| `api.koldmarket.co.uk` | Express :4000 | Backend REST API |

## Documentation

- [ROADMAP.md](./ROADMAP.md) — 4-phase development plan
- [NEXT-STEPS.md](./NEXT-STEPS.md) — Immediate next build steps
- [docs/AI-PLACEMENT-MAP.md](./docs/AI-PLACEMENT-MAP.md) — AI strategy and placement
- [docs/VPS-SETUP.md](./docs/VPS-SETUP.md) — VPS deployment guide

## Monetisation

- **Free**: Buyer, Private Seller
- **Seller Plus**: £9.99/month
- **Trader Pro**: £24.99/month
- **Dealer / Business**: £59.99/month
- **Listing Boosts**: Bump Up, Featured, Urgent, Spotlight

## Status

> **Phase: Planning / Architecture — Foundation setup in progress**
>
> Next: Phase 1 — Database schema, authentication, core listing API
