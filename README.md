# KoldMarket

**AI-first UK marketplace for AC, refrigeration, cold rooms, freezer rooms, equipment, parts, and services.**

[![License: GPL v2](https://img.shields.io/badge/License-GPLv2-blue.svg)](LICENSE)

---

## Overview

KoldMarket is a specialist vertical marketplace for the UK HVAC and refrigeration industry. It connects buyers, sellers, service providers, and businesses in the cooling equipment sector.

### What the Platform Covers

- 🧊 **Equipment Marketplace** — Buy, sell, or browse fridges, freezers, display refrigeration, cold room equipment, AC units, parts, and tools
- 🔧 **Services Marketplace** — Find or request AC installation, refrigeration servicing, cold room installation, emergency breakdown help
- 🏢 **Businesses Directory** — Discover verified suppliers, dealers, and service providers across the UK
- 📋 **Wanted Ads** — Post what you're looking for; get matched with sellers or businesses
- 🤖 **AI Tools** — AI-assisted search, listing creation, service matching, and moderation

---

## Repository Structure

```
bookish-pancake/
├── apps/
│   ├── web/          # Next.js frontend (marketplace UI)
│   ├── api/          # Express.js backend API
│   └── worker/       # Background job processor
├── packages/
│   ├── ai/           # Shared AI modules and prompts
│   ├── config/       # Shared configuration (ESLint, TypeScript, etc.)
│   ├── types/        # Shared TypeScript types and interfaces
│   └── ui/           # Shared React UI components
├── infra/
│   ├── nginx/        # Nginx reverse proxy configuration
│   └── postgres/     # Database initialisation scripts
├── docs/             # Technical documentation
├── .env.example      # Environment variable template
├── docker-compose.yml # Local development stack
└── ROADMAP.md        # Development phases and milestones
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- npm 10+

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake

# 2. Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 3. Install dependencies
npm install

# 4. Start the full local stack
docker-compose up

# 5. Services will be available at:
#    - Web:    http://localhost:3000
#    - API:    http://localhost:4000
#    - Nginx:  http://localhost:80
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Backend API | Node.js + Express |
| Background Jobs | Node.js (BullMQ + Redis) |
| Database | PostgreSQL 16 |
| Cache / Queue | Redis 7 |
| Reverse Proxy | Nginx |
| Containerisation | Docker + Docker Compose |
| Monorepo | Turborepo |
| Language | TypeScript |
| Hosting | OVH VPS (Ubuntu 24.04) |
| AI | OpenAI API |

---

## Development

```bash
# Run all apps in development mode
npm run dev

# Build all packages and apps
npm run build

# Lint all code
npm run lint

# Run all tests
npm run test
```

See individual `apps/*/README.md` for service-specific development instructions.

---

## Documentation

| Document | Description |
|---|---|
| [ROADMAP.md](ROADMAP.md) | Development phases and milestones |
| [AI-PLACEMENT-MAP.md](AI-PLACEMENT-MAP.md) | Where and how AI is used across the platform |
| [NEXT-STEPS.md](NEXT-STEPS.md) | Recommended next tasks after structure setup |
| [docs/VPS-SETUP.md](docs/VPS-SETUP.md) | Production deployment guide for Ubuntu 24.04 |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make your changes following the conventions in `.github/copilot-instructions.md`
4. Commit with a clear message
5. Open a pull request

---

## License

[GPL-2.0](LICENSE)
