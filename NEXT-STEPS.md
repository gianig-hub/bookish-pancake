# Next Steps – EK Marketplace

## Current status

Auth shell + user roles + protected route placeholders are in place
(branch: `ek-auth-shell`).  See [`docs/product/AUTH-AND-ROLES.md`](docs/product/AUTH-AND-ROLES.md)
for full details of what was built and what is still stubbed.

---

## Build order

### 1 · Public shell cleanup ← **next task**

- Add real site navigation (header, footer, mobile nav)
- Build the homepage / browse entry point
- Add basic category landing pages (e.g. `/browse/air-conditioning`)
- Implement a minimal listing card component in `packages/ui`
- Wire up `packages/ui` to `apps/web`

### 2 · Auth implementation

- Choose and integrate auth library (lucia / next-auth v5 / iron-session)
- Implement `POST /auth/register` and `POST /auth/login` in `apps/api`
- Implement `getSessionUser()` in `apps/web`
- Email verification flow
- Password reset flow

### 3 · Posting flow

- Listing creation form (multi-step: category → details → photos → preview → publish)
- Image upload (S3 / Cloudflare R2)
- Listing management (edit, relist, mark as sold, delete)
- Draft saving

### 4 · Business profile flow

- Business account self-service upgrade
- Business profile editor (logo, description, contact, service areas)
- Business public profile page (`/b/<slug>`)
- Leads inbox (`/business/leads`)

### 5 · Pricing / boosts

- Define listing tiers (free / featured / premium)
- Stripe integration (subscription + one-off boost payments)
- Upgrade flow for business accounts

### 6 · Browse / search

- Full-text + faceted search (categories, condition, price, location radius)
- Map view for location-based listings
- Saved searches → alerts engine (`/account/alerts`)
- SEO-friendly listing pages

### 7 · AI listing assistance (later)

- AI-assisted listing title and description generation
- AI-powered category suggestion from photos
- Smart pricing hints
- See `docs/ai/AI-PLACEMENT-MAP.md` for full placement plan

---

## Deferred / out of scope for MVP phases 1–6

- Full RBAC engine (fine-grained permissions)
- Real-time messaging between buyers and sellers
- Multi-currency / multi-language
- Mobile app (React Native)
- Advanced analytics dashboard
