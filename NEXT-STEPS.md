# EK Marketplace – Next Steps

## Current status

✅ Monorepo foundation (apps/web, apps/api, apps/worker, packages/*)
✅ Auth shell + user roles + protected route placeholders (`ek-auth-shell` branch)

---

## Recommended build order

### 1. Public shell cleanup ← **next task**
- Replace homepage placeholder with real browse/hero section
- Add site-wide header (logo, search, nav, login CTA)
- Add site-wide footer
- Category landing pages (e.g. `/ac`, `/refrigeration`, `/parts`)
- Responsive layout with Tailwind CSS (or agreed design system)

### 2. Posting flow
- New listing form (`/sell` → multi-step)
- Listing categories and fields (HVAC-R taxonomy)
- Image upload (stub + S3 integration)
- Draft / publish state
- AI listing-description assistant (stub → real later)

### 3. Business profile flow
- Business registration / upgrade from personal account
- Editable business profile (`/business/profile`)
- Business verification step (manual or document upload)
- Public business page (`/b/:slug`)

### 4. Pricing / boosts
- Define listing tiers (free, featured, spotlight)
- Boost purchase flow (Stripe integration)
- Billing portal placeholder

### 5. Browse / search
- Listing index page with filters
- Full-text + faceted search (Postgres FTS or Meilisearch)
- Map view (placeholder)
- Saved search alerts

### 6. AI listing assistance (deferred)
- Auto-generate listing description from title + category
- Price suggestion based on recent sales
- Smart category detection

---

## Real auth implementation (parallel with above)

- Choose auth provider: custom JWT + Redis sessions (recommended) or next-auth
- Implement `POST /auth/register` + `POST /auth/login` with real DB
- Replace `authenticate()` stub with JWT verification
- Email verification flow
- Password reset flow

---

## Infrastructure to wire up (as features land)

- PostgreSQL schema (users, listings, sessions, alerts, favourites)
- Redis (session store, rate limiting, job queue)
- S3-compatible storage (listing images)
- Email delivery (transactional – Resend or SES)
- Stripe billing (when pricing/boosts are built)
