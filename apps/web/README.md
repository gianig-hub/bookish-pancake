# apps/web — EK Marketplace Frontend

## Responsibility

The `web` app is the **public-facing Next.js frontend** of EK Marketplace. It is the main interface users interact with to browse listings, post ads, manage their account, and discover businesses and services.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js (App Router) | React framework, SSR, routing |
| React | UI components |
| TailwindCSS | Styling |
| NextAuth.js | Authentication (login, sessions) |
| TanStack Query | Server state management |
| Zod | Form validation |
| Axios | HTTP requests to API |

---

## Responsibilities

- **Browse listings** — equipment for sale, wanted ads, services
- **Post ads** — multi-step post ad flow (Phase 1)
- **User account** — my listings, saved items, profile settings
- **Business profiles** — public business directory pages
- **Search & filter** — keyword, category, location, condition filters
- **Subscription management** — plans and listing boosts (Phase 2)
- **AI-assisted posting** — title/description generation (Phase 3)
- **AI-assisted search** — natural language search (Phase 3)

---

## Connects To

| Target | How |
|--------|-----|
| `apps/api` | HTTP requests to `api.koldmarket.co.uk` (via `API_BASE_URL`) |
| `packages/ui` | Shared React component library |
| `packages/types` | Shared TypeScript types |
| `packages/config` | Shared constants and configuration |
| `packages/ai` | AI tools (Phase 3+, disabled in Phase 1) |

---

## Folder Structure

```
apps/web/
  src/
    app/              # Next.js App Router (pages and layouts)
      (auth)/         # Auth pages: login, register, verify
      (marketplace)/  # Marketplace pages: listings, post, search
      account/        # Account area: my listings, settings
      businesses/     # Business directory
    components/       # UI components (page-specific)
    hooks/            # Custom React hooks
    lib/              # Utilities (API client, auth helpers, etc)
    types/            # App-specific types (extend @ek/types)
  public/             # Static assets
  Dockerfile          # Container definition
  next.config.ts      # Next.js configuration
  package.json
  tsconfig.json
```

---

## Key Pages (Phase 1 MVP)

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, featured listings, categories |
| Browse | `/listings` | Listing grid with filters |
| Listing detail | `/listings/[id]` | Full listing view |
| Post ad | `/post` | Multi-step form wizard |
| My account | `/account` | User dashboard |
| My listings | `/account/listings` | User's own listings |
| Login | `/login` | Email/password + magic link |
| Register | `/register` | Sign up |
| Businesses | `/businesses` | Business directory |
| Business profile | `/businesses/[slug]` | Business detail page |

---

## Environment Variables

See `.env.example` at repo root for all required variables.

Key variables for this app:
- `NEXTAUTH_URL` — full URL of the web app
- `NEXTAUTH_SECRET` — secret for NextAuth session tokens
- `API_BASE_URL` — URL of the Express API

---

## Running Locally

```bash
# From repo root
docker-compose up web

# Or directly (requires Node 20+)
cd apps/web
npm install
npm run dev
# → http://localhost:3000
```

---

## Status

> **Starter shell — ready for Phase 1 implementation.**
> Next: Set up Next.js project, install dependencies, create root layout and homepage placeholder.
