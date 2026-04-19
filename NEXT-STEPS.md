# EK Marketplace — Next Steps

This file outlines the **recommended build order** after the startup structure is complete.

> **Current status:** Infrastructure and folder structure is in place. No app code has been written yet.
>
> **Goal:** Reach a working local marketplace (Phase 1 MVP) as fast as possible.

---

## Build Order

### Step 1 — Root Tooling Setup (1–2 days)
**Why first:** All apps share TypeScript, ESLint, and Prettier config. Set it up once at the root so each app inherits it.

Tasks:
- [ ] Create `tsconfig.base.json` at root (shared TS config, strict mode)
- [ ] Create root `.eslintrc.js` (shared ESLint rules)
- [ ] Create root `.prettierrc` (consistent formatting)
- [ ] Create root `package.json` with workspace definitions and shared scripts
- [ ] Set up `npm workspaces` (or Turborepo if needed later)
- [ ] Add `packages/types/src/index.ts` with first shared types
- [ ] Add `packages/config/src/index.ts` with first constants

**Why not skip:** Without this, each app will have inconsistent configs and you'll fix it later — painful.

---

### Step 2 — Initialise Apps (1–2 days)
**Why second:** Get working shell apps with proper TypeScript, Dockerfile, and dev scripts before adding features.

Tasks:
- [ ] Init Next.js in `apps/web` with App Router + TypeScript + TailwindCSS
- [ ] Init Express in `apps/api` with TypeScript + nodemon for dev
- [ ] Init Node worker in `apps/worker` with TypeScript + ts-node-dev
- [ ] Add Dockerfile to each app (dev image is fine to start)
- [ ] Confirm `docker-compose up` starts all containers without errors
- [ ] Add `GET /health` endpoint to `apps/api`
- [ ] Add `GET /api/health` to `apps/web` (Next.js route handler)

---

### Step 3 — Database Schema (Prisma) (1–2 days)
**Why third:** All API routes need a database. Getting the schema right early prevents painful migrations later.

Tasks:
- [ ] Install Prisma in `apps/api`
- [ ] Write initial `schema.prisma` with:
  - `User` model
  - `Listing` model (with `type`, `condition`, `status`)
  - `Category` model
- [ ] Run first migration (`prisma migrate dev`)
- [ ] Add seed file with UK categories (AC, Refrigeration, Cold Rooms, etc.)
- [ ] Confirm Prisma Studio works (`prisma studio`)

**Keep it lean:** Do not add `Business`, `ServiceRequest`, `Review`, or `Subscription` models yet. Add them in Phase 2 when you need them.

---

### Step 4 — Authentication (2–3 days)
**Why fourth:** Users need to register and login before they can post listings. Auth blocks the post-ad flow.

Tasks:
- [ ] API: `POST /api/v1/auth/register` — create user, hash password (bcrypt), return JWT
- [ ] API: `POST /api/v1/auth/login` — validate credentials, return JWT
- [ ] API: JWT middleware for protected routes
- [ ] Worker: set up email queue + send verification email on register
- [ ] Web: NextAuth.js setup with credentials provider (calls API)
- [ ] Web: `/login` and `/register` pages
- [ ] Web: protect routes with NextAuth session check

---

### Step 5 — Core Listing API (2–3 days)
**Why fifth:** Listings are the heart of the marketplace. Get basic CRUD working before building the UI.

Tasks:
- [ ] API: `POST /api/v1/listings` — create listing (auth required)
- [ ] API: `GET /api/v1/listings` — list with basic filters (category, condition, keyword)
- [ ] API: `GET /api/v1/listings/:id` — detail
- [ ] API: `PUT /api/v1/listings/:id` — update (owner only)
- [ ] API: `DELETE /api/v1/listings/:id` — delete (owner only)
- [ ] API: `GET /api/v1/categories` — category tree
- [ ] Use Zod validation on all inputs

---

### Step 6 — Frontend: Browse & Post (3–5 days)
**Why sixth:** Once the API works, build the pages that let users actually use the marketplace.

Tasks:
- [ ] Web: Homepage (hero, category grid, latest listings)
- [ ] Web: `/listings` browse page (grid, filters, pagination)
- [ ] Web: `/listings/[id]` detail page
- [ ] Web: `/post` multi-step post ad form (step 1: category, step 2: details, step 3: images, step 4: review)
- [ ] Web: `/account/listings` — my listings management page
- [ ] Build shared UI components in `packages/ui`: `ListingCard`, `Button`, `Input`, `Select`, `FormField`

---

### Step 7 — File Uploads (1–2 days)
**Why seventh:** Listings need images. Keep this separate from the post-ad form initially — get the form working first, then add images.

Tasks:
- [ ] API: `POST /api/v1/upload` — accept image files, validate type/size, store locally (dev) or to S3/R2 (production)
- [ ] Web: `FileUpload` component in `packages/ui`
- [ ] Integrate upload into the post-ad form

---

## After Step 7: You Have a Working MVP

At this point you have:
- ✅ Users can register and log in
- ✅ Users can post listings (with images)
- ✅ Users can browse and filter listings
- ✅ Users can manage their own listings
- ✅ Everything runs locally with Docker

---

## What Comes After MVP (Phase 2)

Phase 2 priorities (in order):
1. **Business profiles** — dealer and business accounts
2. **Stripe subscriptions** — Seller Plus, Trader Pro, Dealer plans
3. **Listing boosts** — Featured, Urgent, Bump Up, Spotlight
4. **Moderation queue** — admin panel to review flagged listings
5. **Wanted ads** — separate listing type with reverse search
6. **Service requests** — services marketplace

---

## What NOT to Build Yet

Until Phase 3+, do not start:
- ❌ AI features (listing assist, AI search, moderation AI)
- ❌ Messaging system (complex, not MVP critical)
- ❌ Advanced analytics
- ❌ Elasticsearch or advanced search indexing
- ❌ Multi-region / internationalisation
- ❌ Mobile app

---

## Effort Estimate

| Step | Effort | Cumulative |
|------|--------|-----------|
| 1 — Root tooling | 1–2 days | Week 1 |
| 2 — App shells | 1–2 days | Week 1 |
| 3 — Database | 1–2 days | Week 1–2 |
| 4 — Auth | 2–3 days | Week 2 |
| 5 — Core API | 2–3 days | Week 2–3 |
| 6 — Frontend | 3–5 days | Week 3–4 |
| 7 — Uploads | 1–2 days | Week 4 |
| **MVP done** | **~4 weeks** | **End of Week 4** |

---

> These estimates assume 1 developer. Adjust for your team size and experience.
