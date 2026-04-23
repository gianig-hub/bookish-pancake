# NEXT-STEPS.md — Recommended Build Order

After the startup structure is in place (monorepo folders, Docker, Nginx, env config), follow this build order to reach a working MVP.

Each step is **blocked by the one before it**. Don't skip ahead.

---

## Build Priority Sequence

### Step 1 — Database Schema
**Estimated time: 1–2 days**

Define the Prisma schema with all core models: `User`, `Listing`, `Business`, `WantedAd`, `ServiceRequest`, `Category`, `Subscription`.

Run initial migrations and seed a few test records.

**Why first**: Everything else reads from and writes to the database. Auth, API, and the frontend all depend on a working schema.

**Blocked by**: Nothing — this is the foundation.

**Deliverables**:
- `apps/api/prisma/schema.prisma`
- Initial migration files
- Seed script for local development

---

### Step 2 — Authentication
**Estimated time: 1–2 days**

Set up NextAuth in `apps/web` with email/password (credentials provider) and optionally Google OAuth. Wire up session handling to the API.

Create `User` table logic, hashed passwords, and JWT/session tokens.

**Why second**: Almost every feature — posting listings, managing accounts, admin — requires a logged-in user.

**Blocked by**: Step 1 (User model must exist in the database)

**Deliverables**:
- `apps/web/src/app/api/auth/[...nextauth]/route.ts`
- Login and signup pages
- Session middleware in `apps/api`

---

### Step 3 — Core API (Listings CRUD)
**Estimated time: 2–3 days**

Build the Express routes for creating, reading, updating, and deleting listings. Enforce auth on write operations. Add basic validation using schemas from `packages/config`.

Include the `/health` endpoint for Docker health checks.

**Why third**: The web frontend and worker both depend on listings data existing in the API.

**Blocked by**: Steps 1–2 (schema and auth must be working)

**Deliverables**:
- `GET /listings` — list with pagination
- `GET /listings/:id` — single listing
- `POST /listings` — create (auth required)
- `PUT /listings/:id` — update (owner only)
- `DELETE /listings/:id` — soft-delete (owner or admin)

---

### Step 4 — Search and Filtering
**Estimated time: 1–2 days**

Add a `GET /search` endpoint with filtering by category, listing type, condition, location, and keyword. Use PostgreSQL full-text search or `ilike` for Phase 1. Semantic/AI search comes in Phase 3.

**Why fourth**: Search is a core user journey. Category pages, the homepage, and the nav bar all depend on it.

**Blocked by**: Step 3 (listings must exist to search them)

**Deliverables**:
- `GET /search?q=&category=&type=&location=`
- Category slug routing in `apps/web`
- Filter sidebar component in `packages/ui`

---

### Step 5 — UI (Homepage, Listings, Post Flow)
**Estimated time: 3–5 days**

Build out the main Next.js pages using TailwindCSS. Start with the components that unlock the core user journey:

1. Homepage with category grid and featured listings
2. Category/browse pages with search + filters
3. Single listing page
4. Post a listing flow (form, image upload, preview)
5. Basic account dashboard (my listings)

Build reusable components into `packages/ui` as they emerge.

**Why fifth**: The UI surfaces everything built in steps 1–4. It's where the product becomes real.

**Blocked by**: Steps 1–4 (data, auth, API, and search must be working)

**Deliverables**:
- Core pages in `apps/web/src/app/`
- Shared components in `packages/ui`
- Image upload wired to API

---

### Step 6 — Business Features
**Estimated time**: 2–3 days (Phase 2)

Add business directory, business profiles, service requests, and wanted ads. Introduce the business account type and dashboard.

**Blocked by**: Steps 1–5 (core marketplace must work first)

**Deliverables**:
- Business directory pages
- Business profile pages
- Service request flow
- Wanted ads section

---

### Step 7 — AI Features
**Estimated time**: Ongoing (Phase 3+)

Enable AI features via feature flags in `packages/config`. Start with listing assistance (title/description generation), then add search ranking and moderation.

Use `packages/ai` as the integration layer — swap providers without touching app code.

**Blocked by**: Steps 1–6 (full marketplace must be operational before AI is layered on)

**Deliverables**:
- Listing creation AI assist (OpenAI)
- AI-powered search ranking
- Moderation queue assistance
- Admin AI dashboard

---

## Dependency Map

```
Step 1: Database Schema
    └── Step 2: Authentication
            └── Step 3: Core API (Listings CRUD)
                    └── Step 4: Search & Filtering
                            └── Step 5: UI
                                    └── Step 6: Business Features
                                                └── Step 7: AI Features
```

---

## Quick Reference

| Step | What | Time | Blocks |
|---|---|---|---|
| 1 | Database Schema | 1–2 days | Auth, API, UI |
| 2 | Authentication | 1–2 days | API, UI |
| 3 | Core API (Listings) | 2–3 days | Search, UI |
| 4 | Search & Filtering | 1–2 days | UI |
| 5 | UI (Homepage, Listings) | 3–5 days | Business features |
| 6 | Business Features | 2–3 days | AI features |
| 7 | AI Features | Ongoing | — |

**Total to working MVP (Steps 1–5)**: ~10–15 days of focused development

---

## Related Docs

- [README.md](./README.md)
- [apps/web/README.md](./apps/web/README.md)
- [apps/api/README.md](./apps/api/README.md)
- [apps/worker/README.md](./apps/worker/README.md)
- [packages/ai/README.md](./packages/ai/README.md)
- [packages/types/README.md](./packages/types/README.md)
- [packages/ui/README.md](./packages/ui/README.md)
- [packages/config/README.md](./packages/config/README.md)
