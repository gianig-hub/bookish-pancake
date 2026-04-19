# EK Marketplace

**AI-first UK vertical marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, and related equipment, parts, tools, and services.**

---

## Overview

EK Marketplace is a specialist UK classifieds and marketplace platform — not a generic listing site. It is designed to serve the AC, refrigeration, cold room, and freezer room industry by connecting:

- Buyers and sellers of equipment
- Service providers and engineers
- Trade businesses and dealers
- Parts and tooling suppliers

---

## Marketplace Vision

Build a trusted, SEO-led UK marketplace where users can:

- Find and book AC and refrigeration services
- Post and browse equipment ads (new, used, refurbished, trade stock)
- Connect with verified businesses and dealers
- Post and respond to wanted ads
- Use AI-powered tools to search, post, compare, and manage listings

The platform targets both trade professionals and end-users in a specialist niche with genuine search demand and low existing marketplace competition.

---

## Main Product Areas

| Area | Description |
|---|---|
| **Services Marketplace** | AC installation, repairs, cold room build/service, refrigeration maintenance |
| **Equipment Marketplace** | Fridges, freezers, AC units, cold room parts, tools, controllers |
| **Businesses / Dealers** | Verified business profiles, dealer pages, contact and lead generation |
| **Wanted Ads** | Buyers post what they're looking for; sellers respond |
| **Guides & Help** | Category guides, FAQ, trust and safety content |

---

## AI-First Direction

AI is embedded at every layer of the product — not bolted on later:

- **Buyer AI**: Natural-language search, service matching, recommendations
- **Seller AI**: Listing title/description generation, category suggestions, missing info detection
- **Business AI**: Profile writing, lead reply drafting, FAQ generation
- **Admin AI**: Spam detection, moderation, duplicate detection, support triage

AI features are isolated in `packages/ai` and `apps/worker` to keep them modular and swappable.

---

## Current Project Status

> **Phase 1: Startup Structure**

- [x] Project vision and summary document
- [x] Monorepo folder structure
- [x] Root documentation and configuration files
- [x] AI placement map
- [x] VPS deployment guide
- [ ] App shells (web, api, worker) — in progress
- [ ] Auth and user roles
- [ ] Public pages
- [ ] Posting flow

---

## Monorepo Structure

```
bookish-pancake/
├── apps/
│   ├── web/          # Next.js frontend (public + account UI)
│   ├── api/          # Express/Node.js backend API
│   └── worker/       # Background job processor (emails, AI, cleanup)
├── packages/
│   ├── ui/           # Shared React component library
│   ├── config/       # Shared configuration, constants, validation
│   ├── ai/           # AI service layer (prompts, model routing, tools)
│   └── types/        # Shared TypeScript types and contracts
├── infra/
│   ├── nginx/        # Nginx reverse proxy configuration
│   ├── docker/       # Dockerfile starters and build configs
│   └── deploy/       # Deployment scripts and VPS notes
├── docs/
│   ├── product/      # Product decisions, feature specs
│   ├── architecture/ # Architecture notes and diagrams
│   ├── ai/           # AI placement map and strategy
│   └── deployment/   # VPS setup, environment, infrastructure
├── .github/
│   ├── workflows/    # GitHub Actions CI/CD
│   └── copilot-instructions.md
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
├── NEXT-STEPS.md
├── .env.example
├── docker-compose.yml
└── .gitignore
```

---

## Setup Philosophy

- **Monorepo**: All apps and shared packages in one repository for easy code sharing, consistent tooling, and unified CI/CD
- **Docker-first**: Local dev and production use Docker Compose; no "works on my machine" problems
- **TypeScript everywhere**: Type safety across all apps and packages
- **Security by default**: Rate limiting, validation, security headers, CORS protection from day one
- **AI modular**: AI features are isolated so they can be swapped (OpenAI ↔ Anthropic) without touching core business logic

---

## Current Priorities

1. Review and clean startup pack
2. Finalize app shells (web, api, worker)
3. Auth and user roles
4. Public pages (homepage, categories, search)
5. Posting flow
6. Business profiles
7. AI assistant endpoints (Phase 3)

---

## Next Steps

See [NEXT-STEPS.md](./NEXT-STEPS.md) for the recommended build order after startup structure is complete.

See [ROADMAP.md](./ROADMAP.md) for the full 4-phase development plan.

---

## License

See [LICENSE](./LICENSE).
