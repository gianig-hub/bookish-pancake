# EK Marketplace

**AI-First UK Vertical Marketplace for HVAC, Refrigeration & Smart Services**

EK Marketplace is a modern, AI-powered classifieds and services platform built specifically for the UK's air conditioning, refrigeration, cold room, freezer room, and allied equipment sector. Our mission is to simplify finding, selling, and servicing equipment and parts — and to give businesses intelligent tools to grow.

---

## 🌟 Vision

A trusted, specialist UK platform covering:

- **Equipment Marketplace** — buy, sell, and find AC units, refrigeration, cold rooms, parts, tools
- **Services Marketplace** — installation, repair, maintenance, emergency breakdown
- **Wanted Ads** — find what you need from the trade
- **Dealers & Businesses Directory** — browse verified trade suppliers
- **AI-Assisted Tools** — smart search, posting assistance, moderation, seller copilot

---

## 🧠 AI-First Approach

AI is embedded throughout the platform — not as a gimmick, but as a practical accelerator:

- **Buyers** — natural-language search and service matching
- **Sellers** — smart title/description generation, category suggestions
- **Businesses** — FAQ generation, lead reply drafts, review responses
- **Admins** — spam detection, duplicate flagging, moderation triage

All AI modules are isolated in `packages/ai`, transparent, and always support expert human review. See [docs/ai/AI-PLACEMENT-MAP.md](docs/ai/AI-PLACEMENT-MAP.md) for full details.

---

## ⚡ Current Status

| Area | Status |
|------|--------|
| Monorepo structure | ✅ Complete |
| Shared types & config | ✅ Complete |
| 8-step posting flow (web) | ✅ MVP shell |
| API modules (listings, categories) | ✅ MVP shell |
| Authentication | 🔲 TODO |
| Database integration | 🔲 TODO |
| Photo upload | 🔲 TODO (placeholder) |
| AI features | 🔲 TODO (Phase 3) |

---

## 🏗️ Monorepo Structure

```
bookish-pancake/
├── apps/
│   ├── web/         Next.js 14 frontend
│   ├── api/         Express API backend
│   └── worker/      Background jobs / AI worker
├── packages/
│   ├── types/       Shared TypeScript types & enums
│   ├── config/      Shared constants & posting config
│   ├── ui/          Shared React UI components
│   └── ai/          AI module interfaces & prompts
├── infra/
│   ├── nginx/       Nginx reverse proxy configs
│   ├── docker/      Dockerfiles
│   └── deploy/      Deployment scripts
├── docs/
│   ├── product/     Product specs & flow docs
│   ├── architecture/  Architecture decisions
│   ├── ai/          AI placement & module docs
│   └── deployment/  VPS and infra guides
└── .github/         CI/CD workflows & Copilot rules
```

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Copy environment variables
cp .env.example .env.local

# 2. Start all services with Docker Compose
docker compose up -d

# 3. Install dependencies (from repo root with workspaces)
npm install

# 4. Run the web app in dev mode
cd apps/web && npm run dev

# 5. Run the API in dev mode
cd apps/api && npm run dev
```

See [docs/deployment/VPS-SETUP.md](docs/deployment/VPS-SETUP.md) for production deployment.

---

## 🔥 Current Priorities

1. Authentication (NextAuth.js)
2. Draft persistence — save listing drafts to PostgreSQL
3. Photo upload integration (Cloudflare R2 / S3)
4. Public browse/search pages
5. Business profiles

See [ROADMAP.md](ROADMAP.md) for the full phased plan.

---

## 📋 Standards

- TypeScript everywhere — no implicit `any`
- Shared types from `@ek/types`, shared config from `@ek/config`
- All AI logic isolated in `packages/ai` or `apps/worker`
- TODO markers for all deferred work
- Docker-first for local/dev/prod parity
- See [.github/copilot-instructions.md](.github/copilot-instructions.md) for full dev standards

---

## 📄 License

[GPL-3.0](LICENSE)
