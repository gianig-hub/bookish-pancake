# Next Steps — EK Marketplace

## Current Foundation

- ✅ Monorepo structure (apps/web, apps/api, apps/worker, packages/*)
- ✅ Auth shell — routes, shared types, config constants, docs

---

## Recommended Build Order

### 1. Public Shell Cleanup
**Goal:** Finalize the public-facing pages so the site is presentable.

- Homepage (`/`) with hero, category navigation, and featured listings placeholder
- Browse/search shell (`/browse`) with filter sidebar structure
- Listing detail page (`/listing/[id]`) shell
- Navbar and footer components in `packages/ui`
- Mobile-responsive layout

### 2. Posting Flow
**Goal:** Allow sellers to create listings.

- `/account/listings/new` — multi-step listing creation form
- `POST /api/listings` — create listing endpoint
- Categories and sub-categories constants in `packages/config`
- Image upload placeholder (S3/Cloudflare R2 integration)
- Listing draft → active status workflow

### 3. Business Profile Flow
**Goal:** Allow business accounts to set up their public profile.

- `/business/profile` form with logo, description, address, contact
- `PUT /api/business/me/profile` endpoint
- Public business page (`/directory/[slug]`)
- Business badge on listings

### 4. Pricing & Boosts
**Goal:** Lay the groundwork for monetisation.

- Define pricing tiers in `packages/config`
- Boost options (featured, homepage slot, category top)
- `POST /api/listings/[id]/boost` — placeholder endpoint
- Stripe integration placeholder (no real payment yet)

### 5. Browse & Search
**Goal:** Enable buyers to discover listings.

- Full-text search with filters (category, location, price, condition)
- `GET /api/listings` with query params
- Saved search → alert creation
- Map view placeholder (UK postcode / coordinates)

### 6. AI Listing Assistance (Later)
**Goal:** AI-first differentiation.

- Smart listing title / description generator (`packages/ai`)
- AI price suggestion based on category and condition
- Duplicate / similar listing detection
- AI moderation assist for flagged content

---

## Deferred / Out of Scope for MVP

- Full billing and subscription management
- Real-time messaging between buyers and sellers
- Advanced RBAC / permissions matrix
- Mobile app
- Internationalisation (i18n) — UK-only for now