# EK Marketplace — Roadmap

---

## Phase 1: Foundation

**Objective:** Establish the monorepo structure, shared types, app shells, route areas, and deployment foundation. No business logic yet.

### Key Deliverables
- [x] Monorepo structure (apps, packages, infra, docs)
- [x] `packages/types` — UserRole, AuthUser, SessionUser, API response types
- [x] `packages/config` — role constants, protected routes, feature flags
- [x] `apps/web` — Next.js shell with route group folders (public, auth, account, seller, business, admin)
- [x] `apps/api` — Express API shell with auth, users, roles, sessions, health, middleware modules
- [x] `apps/worker` — Worker service placeholder
- [x] `docs/product/AUTH-AND-ROLES.md` — roles, access levels, MVP plan
- [x] `.env.example`, `docker-compose.yml`, Nginx config
- [x] `docs/deployment/VPS-SETUP.md`
- [ ] Implement auth (register, login, JWT) — next
- [ ] Add Prisma with minimal User + Session schema
- [ ] Replace Next.js middleware stub with real session reading

### Out of Scope
- Full DB schema
- Business logic
- Payment integration
- AI features

---

## Phase 2: Core Marketplace

**Objective:** Build the listing and business data layer, posting flow, search, and business profiles.

### Key Deliverables
- [ ] Prisma schema: Listing, Business, WantedAd, ServiceRequest
- [ ] Listing CRUD API (`/listings`)
- [ ] Business directory API (`/businesses`)
- [ ] Wanted ads API (`/wanted`)
- [ ] Basic listing search and category browse
- [ ] Post ad flow (web UI)
- [ ] Business profile (public view + edit)
- [ ] Wanted ad posting
- [ ] Subscription/pricing plans (Stripe integration)
- [ ] Listing boosts (bump, featured, urgent)
- [ ] Email notifications (worker: new lead, new message)

### Out of Scope
- AI features
- Analytics
- Advanced moderation tools

---

## Phase 3: AI Integration

**Objective:** Add AI-powered tools that enhance the user experience — not replace real content.

### Key Deliverables
- [ ] `packages/ai` — prompt library, model router, guardrails
- [ ] Listing title and description generator (seller flow)
- [ ] Category suggester (seller flow)
- [ ] Natural language search (public marketplace)
- [ ] Business profile writer
- [ ] Lead reply drafting (business dashboard)
- [ ] Spam and duplicate detection (admin moderation)
- [ ] FAQ assistant (help centre)

### Out of Scope
- Analytics
- Multi-language support
- External AI API resale

---

## Phase 4: Scale & Intelligence

**Objective:** Add analytics, advanced moderation, dealer storefronts, and platform intelligence.

### Key Deliverables
- [ ] Analytics dashboard (listing views, search trends, revenue)
- [ ] Advanced AI moderation (auto-score all new listings)
- [ ] Lead engine (proactive lead suggestions to businesses)
- [ ] Dealer storefronts (branded pages with inventory)
- [ ] Content gap detection (AI surface missing category pages)
- [ ] Review system
- [ ] Multi-session management and 2FA
- [ ] Performance optimisations (caching, CDN, DB query review)

### Out of Scope
- Enterprise features
- Multi-country expansion
- Native mobile apps

---

## Version History

See [CHANGELOG.md](./CHANGELOG.md)
