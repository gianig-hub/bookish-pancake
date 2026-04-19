# EK Marketplace — Next Steps

After the auth/roles foundation is in place, the recommended build order is:

---

## 1. ✅ Auth & User Roles (Current)

- [x] Shared types (`packages/types`)
- [x] Route config (`packages/config`)
- [x] API shell with auth modules (`apps/api`)
- [x] Frontend shell with route groups (`apps/web`)
- [ ] **TODO: Implement registration + login endpoints**
- [ ] **TODO: Add Prisma User + Session schema**
- [ ] **TODO: Wire Next.js middleware to real JWT**

---

## 2. Public App Shell Cleanup

Once auth works end-to-end:

- Build homepage (`/`) — hero, search bar (non-AI), category links
- Build listings browse page (`/listings`) — grid, basic filters (category, location, price)
- Build services page (`/services`) — service category grid
- Build business directory (`/businesses`) — list view
- Add header + footer navigation components
- Add responsive layout and Tailwind CSS setup

---

## 3. Account Dashboard

- Build `/account` dashboard — welcome, quick stats, navigation
- Build `/account/listings` — manage own listings (table view)
- Build `/account/favourites` — saved listings grid
- Build `/account/alerts` — saved search alert management
- Build `/account/settings` — profile editing form

---

## 4. Posting Flow

- Build `/seller/post` — multi-step listing creation form
  - Step 1: Category selection
  - Step 2: Listing details (title, description, price, condition, location)
  - Step 3: Photos
  - Step 4: Review and publish
- Build `/seller/edit/[id]` — edit listing form
- Add listing CRUD API (`/listings` endpoints)
- Add photo upload (storage provider)

---

## 5. Business Profile

- Build `/business/profile` — edit business profile form
- Build public business profile page (`/businesses/[slug]`)
- Build `/business/leads` — leads inbox with reply form
- Add business CRUD API (`/businesses` endpoints)

---

## 6. Pricing & Boost

- Design subscription tiers (buyer, private seller, trader, dealer, business)
- Integrate Stripe (subscription + one-time boosts)
- Build `/pricing` page
- Build `/account/subscription` — manage current plan
- Add boost options to listing post/edit flow

---

## 7. AI Assistant Endpoints (Phase 3)

- Enable `packages/ai` package
- Build listing title/description generator
- Build category suggester
- Add natural language search
- Build admin moderation assistant
- Connect via feature flags in `packages/config`

---

## 8. Schema & Business Logic Review

Before scaling:

- Review and finalise Prisma schema
- Add database indexes for search and filter queries
- Review API validation (Zod schemas on all inputs)
- Add integration tests for auth and listing endpoints
- Set up CI/CD pipeline (`.github/workflows/`)

---

## Notes

- **Do not invent DB schema early.** Define tables as you build each feature.
- **Keep AI off** until Phase 3. Feature flags are already in `packages/config`.
- **Keep the MVP lean.** Ship working auth + public browse + posting before adding any paid features.
