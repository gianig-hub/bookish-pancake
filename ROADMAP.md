# EK Marketplace — Roadmap

> **MVP-focused. Phased delivery. No over-engineering.**

---

## Phase 1 — Foundation ✅ (current)

**Objective:** Solid, deployable startup structure with auth and basic app shells.

### Key Deliverables
- [x] Monorepo structure (apps/web, apps/api, packages/types)
- [x] Startup documentation and AI placement map
- [x] Docker Compose + Nginx config
- [x] VPS setup notes
- [x] Email/password auth shell (login, register, logout)
- [x] Protected routes for /account, /business, /admin
- [x] Role-aware TypeScript guards (buyer → admin)
- [x] In-memory session/user store (placeholder)

### Out of Scope
- Real database schema
- Email sending
- Payment integration
- Full UI/design system

---

## Phase 2 — Core Marketplace

**Objective:** Users can register, post listings, and browse the marketplace.

### Key Deliverables
- [ ] PostgreSQL database + Prisma schema (users, listings, categories)
- [ ] Email verification flow
- [ ] Listing post and edit flow
- [ ] Listing browse and search (basic text search)
- [ ] Business/dealer profile creation
- [ ] Wanted ads
- [ ] Basic image upload (S3/Cloudflare R2)
- [ ] Contact seller / enquiry form

### Out of Scope
- Payment processing
- AI search
- Subscriptions
- Moderation AI

---

## Phase 3 — Monetisation & AI

**Objective:** Revenue-generating features and AI-assisted tools.

### Key Deliverables
- [ ] Stripe subscriptions (Seller Plus, Trader Pro, Business/Dealer)
- [ ] Listing boosts (featured, bumped, urgent)
- [ ] AI-assisted listing creation (title, description, category suggestion)
- [ ] AI-powered search (semantic)
- [ ] Business AI: lead reply drafting, FAQ generation
- [ ] Admin AI: moderation queue, spam detection, duplicate listing detection

### Out of Scope
- Advanced RBAC / permissions engine
- Commission-based payments
- Third-party API integrations

---

## Phase 4 — Scale & Optimise

**Objective:** Analytics, advanced moderation, and performance.

### Key Deliverables
- [ ] Analytics dashboard (admin)
- [ ] SEO improvements (structured data, sitemaps, category pages)
- [ ] Advanced moderation tools
- [ ] Lead engine for businesses
- [ ] Dealer storefront features (custom pages, verified badge)
- [ ] Performance and caching improvements (Redis, CDN)
- [ ] Mobile-responsive design pass

### Out of Scope
- Native mobile apps (Phase 5+)
- Multi-language / internationalisation
- Affiliate or referral programmes

---

## Notes

- Each phase should be merged and reviewed before the next begins.
- Schema changes in Phase 2 will require careful migration planning.
- AI features in Phase 3 should be isolated in `packages/ai`.
- Payments should be introduced only after core marketplace is stable.
