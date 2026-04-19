# EK Marketplace

**AI-first UK vertical marketplace** for air conditioning, refrigeration, cold rooms, freezer rooms, and related equipment, parts, tools, and services.

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm 9+

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start local services (PostgreSQL, Redis)
docker-compose up -d

# 4. Run database migrations
npm run db:migrate

# 5. Seed database (optional)
npm run db:seed

# 6. Start all apps in development mode
npm run dev
```

The web app will be available at [http://localhost:3000](http://localhost:3000).  
The API will be available at [http://localhost:4000](http://localhost:4000).

## Tech Stack

| Layer | Technology |
|---|---|
| Monorepo | npm workspaces + Turborepo |
| Web | Next.js 14, React 18, TailwindCSS |
| API | Express, TypeScript, Prisma |
| Worker | Node.js, Bull queues |
| Database | PostgreSQL + Prisma ORM |
| Cache / Queue | Redis |
| Container | Docker + Docker Compose |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions (configured) |

## Monorepo Structure

```
everything-kold-market/
├── apps/
│   ├── web/          # Next.js 14 frontend
│   ├── api/          # Express REST API
│   └── worker/       # Background jobs & AI processing
├── packages/
│   ├── ui/           # Shared React components
│   ├── config/       # Shared configuration & constants
│   ├── ai/           # AI services (modular, isolated)
│   ├── types/        # Shared TypeScript types
│   └── db/           # Database client & Prisma schema
├── infra/
│   ├── docker/       # Dockerfiles
│   └── nginx/        # Nginx configuration
└── docs/             # Documentation
```

## Available Scripts

```bash
npm run dev        # Start all apps in development
npm run build      # Build all packages and apps
npm run lint       # Lint all packages
npm run typecheck  # TypeScript check all packages
npm run db:migrate # Run Prisma migrations
npm run db:seed    # Seed the database
npm run db:studio  # Open Prisma Studio
```

## Documentation

- [Setup Guide](./docs/SETUP.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [AI Guidelines](./docs/AI_GUIDELINES.md)
- [Roadmap](./ROADMAP.md)

## Key Principles

- **Security first** — no secrets in code, env vars for all config
- **Docker from day one** — consistent dev and prod environments
- **Modular AI** — all AI logic isolated in `packages/ai`
- **Clean TypeScript** — strict mode, shared types, no `any`
- **UK-focused** — GBP pricing, UK regions, GDPR-aware
