# EK Marketplace — Next Steps (MVP Build Order)

> What to build next, in order, after the startup structure is complete.
> Focus: get a working MVP — one auth flow, one data type, basic UI, basic search.

---

## Priority Overview

```
1. ✅ Startup Structure     ← You are here
2. 🔲 Root Tooling          ← Quick wins (< 2 hrs)
3. 🔲 Database Schema       ← Foundation for everything
4. 🔲 Authentication        ← Users must log in first
5. 🔲 Core API (Listings)   ← What makes it a marketplace
6. 🔲 Frontend UI           ← Browse and post listings
7. 🔲 Search & Filter       ← Users find what they need
8. 🔲 Authorization         ← Users only edit their own listings
```

---

## Step 1: Quick Wins — Root Tooling Setup (2–4 hours)

**What this achieves**: Consistent code quality across all apps from day one.

**Tasks:**
- [ ] Verify ESLint/Prettier work across the monorepo
- [ ] Run `npm install` and confirm workspace resolution
- [ ] Confirm TypeScript paths resolve (`@ek/types`, `@ek/config`)
- [ ] Confirm Docker Compose starts all services

**Files already created:**
- `.eslintrc.js`
- `.prettierrc`
- `tsconfig.json`
- `docker-compose.yml`

---

## Step 2: Database Schema — Prisma (1–2 days)

**What this achieves**: Foundation for ALL other features. Nothing works without a database.

**Tasks:**
- [ ] Define `User` model (id, email, name, role, created_at)
- [ ] Define `Listing` model (id, title, description, price, category, condition, status, user_id)
- [ ] Define `Category` model (id, name, slug, parent_id)
- [ ] Define `Image` model (id, listing_id, url, order)
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Create seed file with test users, categories, sample listings

**File**: `prisma/schema.prisma`

**Why this is first**: Every other feature (auth, listings, search) depends on having a database schema.

---

## Step 3: Authentication — NextAuth + API (1–2 days)

**What this achieves**: Users can register, log in, and have secure sessions.

**Tasks:**
- [ ] Install NextAuth in `apps/web`
- [ ] Create `[...nextauth]` route handler
- [ ] Set up JWT strategy (no OAuth needed for MVP)
- [ ] Create `POST /auth/register` endpoint in API
- [ ] Create `POST /auth/login` endpoint in API
- [ ] Create `GET /auth/me` endpoint in API
- [ ] Add middleware to protect API routes
- [ ] Create basic login/register pages in web

**Why second**: All marketplace features require knowing who the user is.

**Do NOT add yet**: OAuth providers, magic links, 2FA, email verification.

---

## Step 4: Core API — Listings CRUD (2–3 days)

**What this achieves**: The backend can create, read, update, and delete listings. This IS the marketplace.

**Tasks:**
- [ ] `GET /listings` — paginated list with basic filters
- [ ] `GET /listings/:id` — single listing detail
- [ ] `POST /listings` — create listing (auth required)
- [ ] `PATCH /listings/:id` — update listing (owner only)
- [ ] `DELETE /listings/:id` — delete listing (owner only)
- [ ] Add input validation (Zod schemas)
- [ ] Add basic error handling middleware

**Models needed**: Listing, User (from Step 2)

**Do NOT add yet**: Image upload, pricing tiers, boosts, AI descriptions.

---

## Step 5: Frontend UI — Browse & Post (2–3 days)

**What this achieves**: Users can see listings and post their own.

**Tasks:**
- [ ] Homepage: featured/recent listings grid
- [ ] Listings page: paginated list with category filter
- [ ] Listing detail page: full listing view
- [ ] Post a listing form (requires auth)
- [ ] My listings page (requires auth)
- [ ] Basic navigation header + footer
- [ ] Mobile-responsive layout

**Do NOT add yet**: Image upload UI, advanced filters, favourites, messaging.

---

## Step 6: Search & Filter (1–2 days)

**What this achieves**: Users can find what they're looking for. Core marketplace UX.

**Tasks:**
- [ ] Full-text search on title + description (PostgreSQL `tsvector`)
- [ ] Filter by category
- [ ] Filter by condition (new/used/refurbished)
- [ ] Sort by: newest, price low-high, price high-low
- [ ] `GET /listings?search=chiller&category=refrigeration&sort=newest`

**Do NOT add yet**: AI-powered search, semantic search, saved searches.

---

## Step 7: Authorization (Half day)

**What this achieves**: Security — users can only edit/delete their own listings.

**Tasks:**
- [ ] API: verify `listing.userId === req.user.id` on PATCH/DELETE
- [ ] Frontend: show edit/delete buttons only to listing owner
- [ ] Add `role` field to User (buyer, seller, admin)
- [ ] Add role-based route guards in API

**Do NOT add yet**: Admin dashboard, moderation tools, reporting system.

---

## After MVP: Phase 2 (Not Yet)

Once the above 7 steps are complete and working, consider:

- Image upload (Cloudinary or S3)
- Business directory (separate from listings)
- Wanted ads system
- Email notifications (registration, listing posted)
- Subscription/payment system (Stripe)
- Business profiles

## After Phase 2: Phase 3 AI Features (Not Yet)

- AI listing description generator
- Semantic search
- Spam/moderation detection
- Recommendation engine

---

## Quick Reference: What Blocks What

```
Docker + DB schema → EVERYTHING
Auth → Post listing, My listings, Edit listing
Listings API → All frontend listing pages
Search API → Search/filter UI
Authorization → Edit/delete controls
```

---

## Estimated Total MVP Time

| Step | Effort       |
|------|-------------|
| Tooling setup | 2–4 hours |
| Database schema | 1–2 days |
| Authentication | 1–2 days |
| Core API | 2–3 days |
| Frontend UI | 2–3 days |
| Search & Filter | 1–2 days |
| Authorization | Half day |
| **Total** | **~2–3 weeks** |

With 1 developer working full-time, MVP is achievable in 2–3 weeks.
With 2 developers working in parallel (API + Frontend), ~1.5–2 weeks.
