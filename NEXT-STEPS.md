# Next Steps — EK Marketplace Build Order

This file outlines the recommended build sequence after the startup structure is complete.
It is intentionally MVP-focused. Do not jump ahead to features that are not yet unblocked.

---

## Recommended Build Order

### Step 1 — Review and Clean Startup Pack

Before writing any application code, make sure the foundation is solid.

- [ ] Review all files created in the startup pack
- [ ] Ensure folder structure matches `README.md`
- [ ] Copy `.env.example` to `.env.local` and fill in local values
- [ ] Confirm `docker-compose up` starts all services without errors
- [ ] Confirm Nginx routes correctly to web and api containers
- [ ] Remove or update any placeholder `TODO` markers you want to address now

**Why first:** A messy foundation causes compounding confusion. Fix it once.

---

### Step 2 — Finalize App Shells

Set up the minimal working codebase for each app so development can begin.

- [ ] `apps/api`: Express app with health check endpoint (`GET /health`)
- [ ] `apps/web`: Next.js app with homepage and 404 page
- [ ] `apps/worker`: BullMQ setup with one sample queue (e.g., email queue)
- [ ] Root `package.json` with workspaces configured
- [ ] TypeScript `tsconfig.json` at root and per-app
- [ ] ESLint and Prettier config at root
- [ ] Shared `packages/types` with at least `User` and `Listing` type stubs

**Why second:** You need runnable apps before you can build features into them.

---

### Step 3 — Auth and User Roles

Authentication is the gate to all account-level features. Build it early.

- [ ] User model in database (id, email, passwordHash, role, createdAt)
- [ ] Roles: `buyer`, `seller`, `business`, `admin`
- [ ] API: register, login, logout, refresh token endpoints
- [ ] Session handling (JWT or session cookie — choose one approach)
- [ ] NextAuth (or equivalent) configured in `apps/web`
- [ ] Protected route middleware for API
- [ ] Protected page wrapper for Next.js

**Why third:** Every feature after this point requires knowing who the user is.

---

### Step 4 — Public Pages

Build the public-facing shell of the site before the posting flow.

- [ ] Homepage (hero, category links, featured listings placeholder)
- [ ] Category pages (services, equipment, businesses, wanted ads)
- [ ] Static pages: About, Contact, Pricing, FAQ/Help
- [ ] Basic navigation and footer
- [ ] SEO meta tags on all pages (title, description, og tags)
- [ ] Sitemap.xml generation

**Why fourth:** Public pages are what search engines index. Get them live early.

---

### Step 5 — Posting Flow

Let users create listings. This is the core marketplace action.

- [ ] Listing model (title, description, category, condition, price, location, images, status)
- [ ] API: create listing, update listing, delete listing, get listing
- [ ] Post an Ad form (multi-step: category → details → images → preview → publish)
- [ ] Image upload (S3 or local storage, max 10 images per listing)
- [ ] Draft saving
- [ ] Listing detail page (public view)
- [ ] My Listings page (account area)

**Why fifth:** Posting is the marketplace's core mechanic. Without it, there is no marketplace.

---

### Step 6 — Business Profiles

Businesses are a key monetisation and trust layer.

- [ ] Business model (name, description, location, categories, contact, verified flag)
- [ ] API: create/update business profile, get business
- [ ] Business profile page (public view)
- [ ] Businesses directory page (browse + filter)
- [ ] Link business to listings

**Why sixth:** Businesses drive repeat use and are the primary paid plan target.

---

### Step 7 — Pricing and Boost Logic

Without this, there is no revenue path.

- [ ] Define plans: Free, Seller Plus, Trader Pro, Dealer
- [ ] Stripe integration (subscription creation, webhook handling)
- [ ] Boost types: Bump Up, Featured, Urgent, Top of Category, Homepage Spotlight
- [ ] Boost purchase flow
- [ ] Plan limits enforcement (e.g., max listings per plan)

**Why seventh:** Pricing is the monetisation gate. Build it once auth and listings are stable.

---

### Later — AI Assistant Endpoints

Do not build AI features until the core marketplace works. AI enhances, it does not replace.

- [ ] Seller Copilot: listing title/description generation
- [ ] Admin moderation AI: spam and duplicate detection
- [ ] AI search: natural-language search queries
- [ ] See `docs/ai/AI-PLACEMENT-MAP.md` for full scope

---

### Do Not Start Yet

- Full database schema redesign (iterate on what you build)
- Payment commission layer
- Native mobile app
- Internationalisation
- Advanced analytics

---

## Quick Reference

| Step | Task | Blocks |
|------|------|--------|
| 1 | Review startup pack | Everything |
| 2 | Finalize app shells | All feature work |
| 3 | Auth and user roles | Posting, business profiles, payments |
| 4 | Public pages | SEO, discoverability |
| 5 | Posting flow | Core marketplace use |
| 6 | Business profiles | Monetisation, trust |
| 7 | Pricing and boosts | Revenue |
| 8+ | AI assistant endpoints | Phase 3 |

---

*Update this file as steps are completed and new priorities emerge.*
