# KoldMarket — Development Roadmap

AI-first UK marketplace for AC, refrigeration, cold rooms, freezer rooms, equipment, parts, and services.

---

## Phase 1 — Foundation (Weeks 1–6)

**Goal**: Get a working, deployable application with core marketplace features.

### Database & Backend
- [ ] PostgreSQL schema: users, listings, categories, businesses, wanted ads
- [ ] Authentication (NextAuth.js / JWT — email + social login)
- [ ] Core API routes: listings CRUD, user auth, categories
- [ ] Image upload (S3/R2 compatible storage)
- [ ] Input validation and basic rate limiting

### Frontend
- [ ] Homepage (search bar, featured categories, recent listings)
- [ ] Equipment listing browse page (filters, pagination)
- [ ] Single listing page (photos, description, contact)
- [ ] Post an Ad flow (multi-step form)
- [ ] User registration and login
- [ ] Basic account area (my listings, profile)

### Infrastructure
- [ ] Dockerised local development environment
- [ ] CI/CD pipeline (GitHub Actions → VPS deploy)
- [ ] Environment variable management
- [ ] Basic logging and error handling

---

## Phase 2 — Marketplace Features (Weeks 7–12)

**Goal**: Full marketplace functionality covering all listing types.

### Listings & Categories
- [ ] Full category taxonomy (equipment, services, parts, tools)
- [ ] Wanted Ads section
- [ ] Services marketplace (post/browse/request)
- [ ] Businesses directory (register, browse, contact)
- [ ] Listing status management (active, expired, sold, draft)

### Users & Businesses
- [ ] Business profiles (description, coverage areas, reviews)
- [ ] Seller profiles (trust indicators, listing history)
- [ ] Favourites / saved searches
- [ ] Messaging / leads system (contact seller without revealing email)
- [ ] Email notifications (alerts, messages, listing status)

### Moderation
- [ ] Admin panel (listing review, user management)
- [ ] Report/flag system for listings and users
- [ ] Basic spam detection

---

## Phase 3 — Monetisation (Weeks 13–18)

**Goal**: Revenue-generating features live and tested.

### Subscriptions & Payments
- [ ] Stripe integration (subscriptions + one-off payments)
- [ ] Plan tiers: Free, Seller Plus (£9.99/mo), Trader Pro (£24.99/mo), Business (£59.99/mo)
- [ ] Listing boost products: Bump Up, Urgent, Featured, Top of Category, Homepage Spotlight
- [ ] Payment webhooks and entitlement management
- [ ] Billing portal / invoice access

### Visibility Features
- [ ] Featured listing slots on homepage and category pages
- [ ] Boosted placement in search results
- [ ] Subscription-gated listing limits (free = limited, paid = more)

---

## Phase 4 — AI Integration (Weeks 19–26)

**Goal**: AI features that genuinely improve the marketplace experience.

### Buyer AI
- [ ] Natural language search ("find me a used commercial freezer in Manchester under £500")
- [ ] Service matching (match buyer needs to qualified businesses)
- [ ] Listing comparison assistant

### Seller AI
- [ ] AI listing title and description generator
- [ ] Category and condition suggestion from photo
- [ ] Pricing guidance (based on similar listings)

### Business AI
- [ ] AI business profile generator
- [ ] Lead reply assistant
- [ ] FAQ generator for business profiles

### Admin AI
- [ ] Spam/duplicate detection
- [ ] Moderation assistance
- [ ] SEO content gap analysis

---

## Post-MVP (Ongoing)

- Mobile app (React Native or PWA)
- Advanced analytics dashboard
- Parts & accessories cross-referencing
- Installation region mapping
- Verified installer programme
- API for third-party integrations
- Multi-language support (if European expansion)

---

## Principles

1. **SEO-led** — every major entity (listing, business, category) gets a clean, indexable URL
2. **AI where it adds value** — not AI for AI's sake
3. **Trust first** — every feature should increase buyer/seller trust
4. **Simple beats clever** — avoid over-engineering until scale demands it
5. **UK-focused** — pricing in GBP, addresses, industry context
