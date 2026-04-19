# KoldMarket — Next Steps

Recommended build order after the startup structure is complete.

---

## Current State

The repository now has:
- ✅ Monorepo structure (apps, packages, infra, docs)
- ✅ Docker Compose local stack (web, api, worker, postgres, redis, nginx)
- ✅ Nginx reverse proxy config (3 subdomains)
- ✅ Environment variable template (.env.example)
- ✅ App shells for web, api, worker
- ✅ Package stubs for ai, types, ui, config
- ✅ Documentation (README, ROADMAP, AI-PLACEMENT-MAP, VPS-SETUP)

---

## Recommended Build Order

### 1. 🗄️ Database Schema (Critical — do this first)

Everything depends on the data model. Design it now, before writing any API logic.

**Files to create:**
- `infra/postgres/schema.sql` — full table definitions
- `apps/api/src/db/migrations/` — versioned migration files (use a migration tool like Drizzle or Prisma)
- `packages/types/src/` — TypeScript types matching the schema

**Key tables to define:**
- `users` — accounts, roles, subscription tier
- `listings` — all marketplace ads (equipment, services, wanted)
- `categories` — taxonomy tree
- `businesses` — business profiles
- `images` — listing images (links to object storage)
- `messages` — buyer-seller messaging
- `subscriptions` — Stripe subscription tracking

**Why first**: Every API route, every frontend page, every AI feature works from this model.

---

### 2. 🔐 Authentication (Critical — do this second)

No marketplace works without accounts.

**Approach**: Use NextAuth.js on the web app, with a JWT session strategy.

**What to implement:**
- Email + password registration and login
- Email verification
- JWT tokens passed to API via Authorization header
- User roles: `buyer`, `seller`, `business`, `admin`
- Protected routes (middleware) in Next.js

**Files to create:**
- `apps/web/src/app/auth/` — login, register, verify pages
- `apps/api/src/middleware/auth.ts` — JWT verification
- `apps/api/src/routes/auth.ts` — register, login, refresh token endpoints

---

### 3. 📋 Listings API + Browse UI (Critical — core product)

Once auth is done, listings are the product.

**What to implement (API):**
- `GET /api/listings` — browse with filters (category, condition, price, location)
- `GET /api/listings/:id` — single listing
- `POST /api/listings` — create listing (auth required)
- `PUT /api/listings/:id` — edit listing (owner only)
- `DELETE /api/listings/:id` — delete/deactivate

**What to implement (Frontend):**
- `/equipment` — browse page with filters
- `/equipment/:slug` — listing detail page
- `/post` — post an ad (multi-step form)
- `/account/listings` — manage my listings

---

### 4. 🖼️ Image Upload (Important — needed for listings)

Listings without images get ignored.

**Approach**: Upload images to Cloudflare R2 (S3-compatible, cheap) via a signed URL from the API.

**What to implement:**
- `apps/api/src/routes/uploads.ts` — generate signed upload URL
- Frontend: drag-and-drop uploader in the post-ad form
- Store image URLs in the `images` table
- Enforce max file size and allowed types (JPEG, PNG, WebP)

---

### 5. 🤖 AI Listing Writer (Quick win — differentiator)

This is your first AI feature and a visible differentiator.

**What to implement:**
- `packages/ai/src/client.ts` — OpenAI client setup
- `packages/ai/src/listing-writer.ts` — title + description generator
- `apps/api/src/routes/ai.ts` — `POST /api/ai/listing-draft` endpoint
- Frontend: "Generate with AI" button in the post-ad form

**Input**: Category, condition, key details, optional photo description  
**Output**: Suggested title + structured description

---

## After These 5 Steps

You will have a **working, deployable marketplace** where users can:
- Register and log in
- Browse equipment listings with filters
- Post ads (with or without AI assistance)
- Upload photos
- View listing detail pages

From there, move on to:
- Businesses directory (Phase 2)
- Wanted ads (Phase 2)
- Messaging system (Phase 2)
- Subscriptions and boosts (Phase 3)
- Advanced AI features (Phase 4)

---

## Don't Build Yet

Things that feel important but can wait:
- Mobile app
- Reviews and ratings system
- Complex analytics
- Full AI chat assistant
- Payment system (until you have enough listings/users to justify it)
- Multi-region support

**Ship a usable marketplace first. Iterate from real user feedback.**
