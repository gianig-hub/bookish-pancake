# EK Marketplace

> AI-first UK marketplace for AC, refrigeration, cold rooms, freezer rooms, parts, tools, wanted ads, businesses, and services.

## Overview

EK Marketplace is a niche trade marketplace targeting the UK cooling and refrigeration industry. It connects buyers, sellers, engineers, and businesses with AI-powered discovery and listing tools.

## Monorepo Structure

```
bookish-pancake/
├── apps/
│   ├── web/          # Next.js frontend (marketplace UI)
│   ├── api/          # Express backend (REST API + business logic)
│   └── worker/       # Background job processor (Bull + Redis)
├── packages/
│   ├── types/        # Shared TypeScript types (single source of truth)
│   ├── config/       # Shared constants and configuration helpers
│   ├── ui/           # Shared React component library
│   └── ai/           # AI service layer (Phase 3+)
├── infra/
│   └── nginx/        # Nginx reverse proxy config
├── prisma/           # Database schema and migrations
├── docs/             # Project documentation
└── docker-compose.yml
```

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | Next.js 14, React, TailwindCSS      |
| Backend     | Express, TypeScript, Prisma         |
| Database    | PostgreSQL                          |
| Cache/Queue | Redis, BullMQ                       |
| Auth        | NextAuth.js (JWT + sessions)        |
| Infra       | Docker, Nginx, OVH VPS              |
| CI/CD       | GitHub Actions                      |

## Getting Started

### Prerequisites

- Node.js ≥ 20
- Docker & Docker Compose
- npm ≥ 10

### Local Development

```bash
# 1. Clone and install dependencies
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake
npm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start all services (PostgreSQL, Redis, Nginx)
docker-compose up -d

# 4. Run database migrations
npm run db:migrate

# 5. Seed development data
npm run db:seed

# 6. Start development servers
npm run dev
```

### Access Points

| Service       | URL                             |
|---------------|---------------------------------|
| Web (frontend)| http://localhost:3000           |
| API           | http://localhost:4000           |
| API Docs      | http://localhost:4000/docs      |
| DB Studio     | http://localhost:5555 (prisma)  |

## Build Order

See [NEXT-STEPS.md](./NEXT-STEPS.md) for the recommended MVP build sequence.

## Documentation

- [ROADMAP.md](./docs/ROADMAP.md) — 4-phase development plan
- [AI-PLACEMENT-MAP.md](./docs/AI-PLACEMENT-MAP.md) — AI integration strategy
- [VPS-SETUP.md](./docs/VPS-SETUP.md) — Production deployment guide
- [NEXT-STEPS.md](./NEXT-STEPS.md) — What to build next

## Domains

- `www.koldmarket.co.uk` — Main marketplace
- `app.koldmarket.co.uk` — Application entry
- `api.koldmarket.co.uk` — API endpoint

## Scripts

```bash
npm run dev          # Start web + api in development mode
npm run build        # Build all apps
npm run lint         # Lint all files
npm run format       # Format all files
npm run type-check   # TypeScript type check
npm run test         # Run tests
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed development data
npm run db:studio    # Open Prisma Studio
npm run docker:up    # Start Docker services
npm run docker:down  # Stop Docker services
```

## License

GPL-2.0 — See [LICENSE](./LICENSE)
