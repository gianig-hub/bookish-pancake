# EK Marketplace — Repository Gap Analysis & Review

This document is a structured review of the current repository state, identifying gaps, cleanup improvements, and the realistic next build steps for MVP.

---

## Current Repository State

```
bookish-pancake/
├── .github/
│   └── copilot-instructions.md   ✅ Dev standards
├── apps/
│   ├── web/
│   │   └── README.md             ✅ Shell + responsibility docs
│   ├── api/
│   │   └── README.md             ✅ Shell + responsibility docs
│   └── worker/
│       └── README.md             ✅ Shell + responsibility docs
├── docs/
│   ├── AI-PLACEMENT-MAP.md       ✅ AI strategy
│   └── VPS-SETUP.md              ✅ Deployment guide
├── infra/
│   └── nginx/
│       ├── nginx.conf            ✅ Main Nginx config
│       └── conf.d/
│           └── koldmarket.conf   ✅ Subdomain routing
├── packages/
│   ├── ai/
│   │   └── README.md             ✅ AI service layer docs
│   ├── config/
│   │   └── README.md             ✅ Shared config docs
│   ├── types/
│   │   └── README.md             ✅ Shared types docs
│   └── ui/
│       └── README.md             ✅ Component library docs
├── .env.example                  ✅ 65+ environment variables
├── docker-compose.yml            ✅ 6 services
├── ek_github_summary_README.md   ⚠️  Legacy file (see cleanup)
├── LICENSE                       ✅
├── NEXT-STEPS.md                 ✅ Build order guidance
├── README.md                     ✅ Project overview
└── ROADMAP.md                    ✅ 4-phase plan
```

---

## Section 1 — Critical Gaps (Blocking Development)

These items need to exist before development can properly start.

### 1.1 Root Package Configuration

**Missing:** `package.json` at the repo root

Without this, `npm workspaces` won't work and each app is completely isolated.

**Needs:**
```json
{
  "name": "ek-marketplace",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "...",
    "build": "...",
    "lint": "...",
    "type-check": "..."
  }
}
```

### 1.2 TypeScript Base Config

**Missing:** `tsconfig.base.json` at repo root

All apps need to extend a shared base TypeScript config with strict mode enabled.

### 1.3 ESLint + Prettier Config

**Missing:** `.eslintrc.js` or `eslint.config.js` and `.prettierrc` at root

Code style consistency from day one prevents messy PRs later.

### 1.4 `.gitignore`

**Missing:** `.gitignore` at repo root

Without this, `node_modules`, `.env.local`, `.env.production`, and build output will be accidentally committed.

**Needs at minimum:**
```
node_modules/
dist/
.next/
.env.local
.env.production
*.log
.DS_Store
```

### 1.5 Actual App Code

**Missing:** All apps are documentation-only shells. No `package.json`, no source files, no working apps.

Each app needs at minimum:
- `package.json` (with name, scripts, dependencies)
- `tsconfig.json`
- A minimal entrypoint (`src/index.ts` or `src/app/`)
- A `Dockerfile` (Docker Compose references them)

### 1.6 GitHub Actions CI Workflow

**Missing:** `.github/workflows/ci.yml`

Without CI, there is no automated check on PRs. Catching lint errors and type errors early is important from the start.

---

## Section 2 — Important Gaps (MVP Quality)

These items are not blocking but will be painful to add later.

### 2.1 Prisma Schema Starter

Once Express API is initialised, a `prisma/schema.prisma` with the initial models needs to be created. This is the foundation for all API routes.

### 2.2 API Dockerfile

The Docker Compose file references `./apps/api/Dockerfile` but no Dockerfile exists. Docker Compose will fail until each app has one.

Same for `apps/web/Dockerfile` and `apps/worker/Dockerfile`.

### 2.3 Root `npm install` Scripts

There are no monorepo-level scripts for:
- Installing all workspace dependencies
- Running all apps in development
- Building all apps for production
- Running linting across all workspaces

### 2.4 Developer Quickstart Validation

The README says to run `docker-compose up` — but this will fail because the app Dockerfiles don't exist yet. The README should note the status honestly, or the apps need to be initialised first.

### 2.5 Health Check Endpoints

`docker-compose.yml` does not have health checks configured for the `api` and `web` services (only for `postgres` and `redis`). Health checks should be added once the apps are running.

---

## Section 3 — Nice-to-Have Gaps (Phase 2+)

These are good practices for later but not needed for MVP.

- **Storybook** in `packages/ui` for component documentation
- **Bull Board** (BullMQ dashboard) in `apps/worker` for job monitoring
- **Swagger / OpenAPI** docs in `apps/api`
- **Prisma ERD** auto-generated diagram from schema
- **GitHub PR templates** (`.github/PULL_REQUEST_TEMPLATE.md`)
- **Issue templates** (`.github/ISSUE_TEMPLATE/`)
- **CONTRIBUTING.md** — contribution guide for the team
- **CHANGELOG.md** — change tracking

---

## Section 4 — Cleanup Suggestions

### 4.1 Rename Legacy File

`ek_github_summary_README.md` at the repo root is a legacy planning document. It should be:
- Moved to `docs/project-summary.md`, or
- Deleted if the README.md and ROADMAP.md now cover everything

Having a `README.md`-like file at the root that isn't `README.md` is confusing.

### 4.2 Add `src/` Placeholder Files

The `apps/` and `packages/` subdirectories have `src/` folders but they are empty. Git does not track empty directories. Add a `.gitkeep` file or a minimal `index.ts` in each `src/` to keep the structure in the repository.

### 4.3 Document Docker Compose Status

Update `docker-compose.yml` with a comment block at the top explaining that the Dockerfiles for the apps are not yet created, and linking to `NEXT-STEPS.md` for build order.

### 4.4 `.env.example` Ordering

The `.env.example` is well structured. Minor suggestion: add a quick "required for local dev" section at the very top listing only the minimum variables needed to get running. 65 variables is comprehensive but can be overwhelming when first setting up.

---

## Section 5 — Realistic Build Order (5–7 Next Steps)

> This matches the detailed guide in `NEXT-STEPS.md`.

1. **Root tooling** — `package.json`, `tsconfig.base.json`, `.eslintrc.js`, `.prettierrc`, `.gitignore`
2. **App shells** — initialise Next.js, Express, and worker with proper configs and Dockerfiles
3. **Database schema** — Prisma setup with `User`, `Listing`, `Category` models
4. **Authentication** — register, login, JWT, email verification
5. **Listing CRUD API** — core REST endpoints for listings and categories
6. **Frontend pages** — homepage, browse, listing detail, post ad form
7. **File uploads** — listing images

---

## Section 6 — Quick Wins (Under 2 Hours Each)

These can be done immediately to unblock development:

| Task | Time | Impact |
|------|------|--------|
| Create `.gitignore` | 15 min | Prevents accidental secret commits |
| Create root `package.json` with workspaces | 30 min | Enables monorepo scripts |
| Create `tsconfig.base.json` | 30 min | Type-safe from day one |
| Create `.prettierrc` + `.eslintrc.js` | 30 min | Consistent code style |
| Add `.gitkeep` to empty `src/` folders | 15 min | Keeps folder structure in git |
| Move legacy file to `docs/` | 10 min | Cleaner root |
| Create GitHub Actions CI workflow | 45 min | Automated quality checks |

---

## Section 7 — Long-Term Considerations

Keep these in mind but **do not build yet**:

- **Elasticsearch / Typesense** — standard PostgreSQL full-text search is fine for MVP. Only add a dedicated search engine if needed at scale.
- **Microservices** — the monorepo structure supports a future split, but keep everything together until the boundaries are clear from real usage.
- **Multi-tenancy** — not needed for this marketplace model. All users and businesses share the same database.
- **Real-time / WebSockets** — not needed for MVP. Add when messaging or live notifications are required (Phase 2/3).
- **CDN / Edge caching** — important for performance at scale. Use Cloudflare in front of Nginx for production (easy to add without code changes).
- **A/B testing** — relevant when you have real traffic. Not for MVP.
- **Internationalisation (i18n)** — UK-only for now. Structure app router to support `/en-gb` prefix later if needed.

---

## Summary

| Category | Count | Priority |
|----------|-------|----------|
| Critical gaps | 6 | 🔴 Fix before starting development |
| Important gaps | 5 | 🟡 Fix in Step 1–2 of build order |
| Nice-to-have | 8 | 🟢 Phase 2+ |
| Cleanup items | 4 | 🟡 Quick wins |

**The foundation documents are all in place. The immediate next action is Step 1: Root Tooling Setup (package.json, tsconfig, ESLint, .gitignore).**

See `NEXT-STEPS.md` for the full ordered build plan.
