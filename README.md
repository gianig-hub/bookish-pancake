# EK Marketplace — MVP Monorepo

A modern UK vertical marketplace for AC, refrigeration, and related services.  
Built as a TurboRepo monorepo with Next.js 14, TypeScript, Tailwind CSS, and pnpm workspaces.

---

## Monorepo Structure

```
ek-marketplace/
├── apps/
│   ├── web/          # Next.js 14 frontend (TypeScript + Tailwind, app/ dir)
│   └── api/          # Placeholder API service (Express/Fastify — TODO)
├── packages/
│   ├── types/        # Shared TypeScript types
│   └── ui/           # Shared UI component shell
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## Requirements

- **Node.js** 18+ (tested on 20+)
- **pnpm** 8+ (`npm install -g pnpm`)
- **Ubuntu 24 / Linux / macOS** (Windows WSL2 also works)

---

## Local Install & Run

### 1. Clone the repository

```sh
git clone https://github.com/gianig-hub/bookish-pancake.git
cd bookish-pancake
```

### 2. Install pnpm (if not already installed)

```sh
npm install -g pnpm
```

### 3. Install all dependencies

```sh
pnpm install
```

### 4. Start all apps in development mode

```sh
pnpm dev
```

The web app will be available at: **http://localhost:3000**

---

## Available Scripts

| Command         | Description                            |
|-----------------|----------------------------------------|
| `pnpm dev`      | Start all apps in development mode     |
| `pnpm build`    | Build all apps for production          |
| `pnpm start`    | Start all apps in production mode      |
| `pnpm lint`     | Run linters across all packages        |
| `pnpm type-check` | Run TypeScript type checks           |

You can also run these from within individual apps:

```sh
cd apps/web
pnpm dev
```

---

## Working Routes (MVP Shell)

| Route           | Status     | Description                        |
|-----------------|------------|------------------------------------|
| `/`             | ✅ Working  | Home page with navigation          |
| `/marketplace`  | 🔧 Placeholder | Equipment Marketplace           |
| `/services`     | 🔧 Placeholder | Services Marketplace            |
| `/businesses`   | 🔧 Placeholder | Business Directory              |
| `/wanted-ads`   | 🔧 Placeholder | Wanted Ads                      |
| `/guides`       | 🔧 Placeholder | Guides & Blog                   |
| `/pricing`      | 🔧 Placeholder | Pricing Plans                   |
| `/help`         | 🔧 Placeholder | Help & FAQ                      |
| `/about`        | 🔧 Placeholder | About Us                        |
| `/contact`      | 🔧 Placeholder | Contact                         |
| `/post-ad`      | 🔧 Placeholder | Post an Ad                      |
| `/login`        | 🔧 Placeholder | Login                           |
| `/register`     | 🔧 Placeholder | Register                        |
| `/account`      | 🔧 Placeholder | User Account                    |

---

## Known Non-Working Areas (Placeholders)

- **No database** — no PostgreSQL, Redis, or any persistence layer
- **No authentication** — login/register are UI shells only
- **No API** — `apps/api` is a stub with no real endpoints
- **No real listings** — marketplace, services, businesses show placeholder content
- **No payments** — pricing page shows plans but no Stripe integration
- **No emails** — contact form has no backend
- **No AI features** — AI search/moderation planned for later phases
- **No admin panel** — moderation queue not yet implemented

---

## Next Steps

1. Implement authentication (NextAuth.js / Clerk)
2. Add PostgreSQL database (Prisma ORM)
3. Build the `apps/api` service (Fastify + TypeScript)
4. Implement listing CRUD (post ad flow)
5. Add search and filtering
6. Set up payment subscriptions (Stripe)
7. Integrate AI-assisted listing and search

---

## Tech Stack

- **Monorepo:** TurboRepo + pnpm workspaces
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS (app/ directory)
- **Backend:** Fastify (placeholder in `apps/api`)
- **Shared:** `packages/types` for shared TypeScript types
- **Planned:** PostgreSQL, Redis, Prisma, Stripe, NextAuth/Clerk, OpenAI

---

## Project Summary

See [`ek_github_summary_README.md`](./ek_github_summary_README.md) for the full project vision and architecture overview.
