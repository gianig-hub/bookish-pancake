# Next Steps — EK Marketplace

> Recommended build order after the startup scaffold is complete. Prioritised for fastest path to a working MVP.

---

## Step 1 — Review and Clean the Startup Pack

**Before writing any application code, verify the scaffold is solid.**

- [ ] Review all root files (`README.md`, `ROADMAP.md`, `.env.example`, `docker-compose.yml`)
- [ ] Confirm folder structure matches the intended monorepo layout
- [ ] Verify `docker-compose up` starts without errors
- [ ] Confirm `.env.example` covers all services needed locally
- [ ] Read `docs/ai/AI-PLACEMENT-MAP.md` and confirm AI boundaries are agreed

**Why first:** Fixing structure issues later is expensive. A clean foundation prevents rework.

---

## Step 2 — Finalize App Shells

**Set up minimal but runnable app skeletons.**

- [ ] `apps/web` — Next.js project initialised (`npx create-next-app`)
- [ ] `apps/api` — Express + TypeScript project initialised
- [ ] `apps/worker` — Node + BullMQ project initialised
- [ ] `packages/types` — shared TypeScript types package (User, Listing stubs)
- [ ] `packages/config` — shared constants and env validation (Zod)
- [ ] Root `package.json` with workspace definitions and shared scripts
- [ ] ESLint + Prettier config at root, shared across all apps

**Why second:** App shells must exist before you can build features inside them.

---

## Step 3 — Authentication and User Roles

**Users must be able to register and log in before anything else is built.**

- [ ] Prisma schema — `User` model with role field (buyer, seller, business, admin)
- [ ] API auth routes — `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`
- [ ] NextAuth setup in `apps/web` — credential + email providers
- [ ] JWT or session handling in `apps/api`
- [ ] Auth middleware — protect private API routes
- [ ] Minimal account page — "You are logged in as X"

**Why third:** Auth gates every other feature. Build it clean once, not retrofit it later.

---

## Step 4 — Public Pages Shell

**Give the site a visible public face before building the marketplace core.**

- [ ] Homepage — hero, search bar placeholder, category links, recent listings placeholder
- [ ] Category pages — static shell, will fill with real data in Step 5
- [ ] Services page — brief explainer, search placeholder
- [ ] Pricing page — plans and features (static, no payment processing yet)
- [ ] About / Contact — lightweight static pages
- [ ] Basic navigation and footer

**Why fourth:** Public pages build credibility and allow early feedback, even before listings work.

---

## Step 5 — Core Posting Flow

**The first real marketplace feature — creating a listing.**

- [ ] Prisma schema — `Listing` model (title, description, category, price, status, userId)
- [ ] API routes — `POST /listings`, `GET /listings/:id`, `PUT /listings/:id`, `DELETE /listings/:id`
- [ ] Post an Ad form — multi-step: category → details → images → preview → submit
- [ ] Image upload (local storage first, S3/R2 later)
- [ ] Listing detail page — view a single listing
- [ ] My Listings page — authenticated user sees their own listings

**Why fifth:** Without posting, there's no marketplace. Keep the schema intentionally minimal.

---

## Step 6 — Business Profiles

**Trade and dealer users need a profile beyond a basic account.**

- [ ] Prisma schema — `Business` model (name, description, categories, location, userId)
- [ ] API routes — `POST /businesses`, `GET /businesses/:id`, `PUT /businesses/:id`
- [ ] Business profile page — name, description, listings, contact
- [ ] Business directory page — browse businesses by category
- [ ] Claim/create business flow — authenticated seller can create a business profile

**Why sixth:** Business profiles drive engagement and SEO value. Needed before pricing plans make sense.

---

## Step 7 — Pricing and Boosts

**Monetisation foundation — not full payment processing yet, but the model is wired in.**

- [ ] Plan model — define Free, Seller Plus, Trader Pro, Business in config
- [ ] User plan field — attach plan to user account
- [ ] Boost types — define Bump Up, Featured, Urgent in config
- [ ] Boost UI — "Boost this listing" action in dashboard
- [ ] Stripe integration stub — `TODO: wire up Stripe Checkout`
- [ ] Plan gating — enforce listing limits based on plan

**Why seventh:** Monetisation needs to exist before launch but can be partially stubbed initially.

---

## Step 8 — AI Assistant Endpoints (Phase 3 prep)

**Wire up AI endpoints once the core product is stable.**

- [ ] `packages/ai` — initialise OpenAI client, add model routing wrapper
- [ ] Listing title/description suggestion endpoint — `POST /ai/suggest-listing`
- [ ] Category suggestion endpoint — `POST /ai/suggest-category`
- [ ] Moderation scoring endpoint — `POST /ai/moderate`
- [ ] Feature flag to disable all AI endpoints in Phase 1/2

**Why last (before Phase 3):** AI enhances the product; it does not replace the core. Build it after the product works.

---

## What to Defer

| Item | When |
|------|------|
| Full database schema | After app shells exist |
| Payments (Stripe) | Phase 2, after listing flow works |
| Search ranking AI | Phase 3 |
| Email notifications | Phase 2 |
| Analytics dashboard | Phase 4 |
| Mobile app | Post-MVP, after web is proven |

---

*See [ROADMAP.md](./ROADMAP.md) for the full phase plan.*
