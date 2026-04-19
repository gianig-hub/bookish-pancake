# EK Marketplace

> AI-first UK vertical marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, and related services & equipment.

[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](LICENSE)

---

## Overview

EK Marketplace connects UK buyers and sellers in the HVAC and refrigeration sector. The platform provides:

- **Services Marketplace** – Installation, maintenance, repair services
- **Equipment Marketplace** – Buy/sell AC units, refrigeration equipment, parts
- **Businesses / Dealers Directory** – Verified installers, shops, suppliers
- **Wanted Ads** – Post requirements, receive quotes
- **Guides / FAQ / Help Center** – Knowledge base for industry professionals and consumers
- **AI Features** – Smart search, listing assistance, moderation, support

---

## Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- npm 10+

### Local Development

```bash
# 1. Clone and install
git clone https://github.com/your-org/everything-kold-market.git
cd everything-kold-market

# 2. Set up environment
cp .env.example .env
# Edit .env with your local values

# 3. Install all dependencies
npm install

# 4. Start all services (Docker)
docker-compose up -d

# 5. Start development servers
npm run dev
```

The web app will be available at `http://localhost:3000`  
The API will be available at `http://localhost:4000`

---

## Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Monorepo    | npm workspaces + Turborepo                |
| Web         | Next.js 14, React 18, TailwindCSS         |
| API         | Express, TypeScript, Prisma ORM           |
| Worker      | Node.js, Bull queues, TypeScript          |
| Database    | PostgreSQL 16                             |
| Cache       | Redis                                     |
| Containers  | Docker + Docker Compose                   |
| Reverse Proxy | Nginx                                   |
| CI/CD       | GitHub Actions                            |
| Linting     | ESLint, Prettier                          |

---

## Repository Structure

```
everything-kold-market/
├── apps/
│   ├── web/          # Next.js 14 frontend marketplace UI
│   ├── api/          # Node/Express backend API
│   └── worker/       # Background jobs, AI processing, queues
├── packages/
│   ├── ui/           # Shared React components library
│   ├── config/       # Shared configuration & constants
│   ├── ai/           # AI services (modular, isolated)
│   ├── types/        # Shared TypeScript types
│   └── db/           # Database client & migrations (Prisma)
├── infra/
│   ├── nginx/        # Nginx reverse proxy configs
│   ├── docker/       # Dockerfiles for each service
│   └── deploy/       # Deployment scripts & configs
├── docs/
│   ├── product/      # Product specs, features, roadmap
│   ├── architecture/ # System architecture, diagrams
│   ├── ai/           # AI placement map, guidelines
│   └── deployment/   # VPS setup, maintenance guides
├── scripts/          # Development & deployment scripts
├── .github/
│   └── workflows/    # GitHub Actions CI/CD
├── docker-compose.yml
├── turbo.json
├── package.json
├── .env.example
└── README.md
```

---

## Key Links

- [Product Roadmap](ROADMAP.md)
- [Architecture Overview](docs/architecture/SYSTEM_DESIGN.md)
- [AI Placement Map](docs/ai/AI_PLACEMENT_MAP.md)
- [Deployment Guide](docs/deployment/VPS_SETUP.md)
- [API Overview](docs/architecture/API_OVERVIEW.md)
- [Changelog](CHANGELOG.md)

---

## Development Commands

```bash
# Run all apps in development mode
npm run dev

# Build all packages and apps
npm run build

# Lint all code
npm run lint

# Run tests
npm run test

# Type check
npm run typecheck
```

---

## Contributing

1. Follow the conventions in [`.github/copilot-instructions.md`](.github/copilot-instructions.md)
2. Use TypeScript with strict mode
3. Add TODO comments for incomplete implementations
4. Keep AI features isolated in `packages/ai`
5. Document all environment variables in `.env.example`

---

## License

GPL-2.0 — see [LICENSE](LICENSE) for details.
