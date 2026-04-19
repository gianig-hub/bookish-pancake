# EK Marketplace – Development Roadmap

---

## Phase 1 – Foundation & Posting Flow *(current)*

**Objective:** Establish a clean, extensible monorepo; deliver the core posting experience and API shell.

### Key Deliverables
- [x] Monorepo structure (`apps/`, `packages/`, `infra/`, `docs/`)
- [x] Shared TypeScript types: `ListingPurpose`, `ListingCategory`, `ListingCondition`, `ListingDraft`, `ListingStatus`
- [x] Shared config: category labels, condition labels, posting limits, step definitions
- [x] 8-step posting flow (web): choose purpose → category → title/description → condition → price → location → photos (placeholder) → preview & submit
- [x] API modules: listings router, categories router, draft submission, validation
- [x] Docs: posting flow, AI placement map, VPS setup guide
- [x] Infrastructure: Docker Compose (local dev), Nginx reverse proxy config
- [ ] Authentication (NextAuth.js) – *next priority*
- [ ] Draft persistence to PostgreSQL
- [ ] Photo upload (Cloudflare R2 / S3)

**Out of scope:** Payments, advanced AI, reviews, business profiles, real moderation queue.

---

## Phase 2 – Core Marketplace Features

**Objective:** Enable real listings, browsing, and key user workflows.

### Key Deliverables
- Public listing browse page with filters (category, condition, location, price)
- Listing detail page
- Wanted ads flow
- Service request flow
- Basic business/dealer profile pages
- My Listings dashboard
- Listing expiry and renewal
- Free plan posting limits (3 listings/month for basic accounts)
- Subscription plan selection (Seller Plus, Trader Pro, Dealer)
- Manual moderation queue (admin)
- Basic admin dashboard (list, approve, remove listings)
- Listing boosts: Bump Up, Urgent, Featured

**Out of scope:** AI-powered features, advanced analytics, lead engine.

---

## Phase 3 – AI, Automation & Smart Experiences

**Objective:** Automate, accelerate, and differentiate through AI.

### Key Deliverables
- **Seller Copilot** — AI title generation, description writing, category suggestion, duplicate detection
- **Buyer AI** — natural-language search, service matching, recommendation engine
- **Business Copilot** — FAQ generation, lead reply drafts, review response suggestions
- **Admin AI** — spam/fraud detection, content moderation triage, SEO gap analysis
- AI modules isolated in `packages/ai` and `apps/worker`
- All AI features behind feature flags

**Out of scope:** Analytics dashboards, advanced anti-fraud ML, internationalization.

---

## Phase 4 – Scale, Analytics & Dealer Features

**Objective:** Level up the platform, measure growth, and serve high-volume dealers.

### Key Deliverables
- Analytics dashboard (listings posted, views, leads, conversion)
- AI-powered moderation at scale (pattern detection)
- Dealer storefronts (branded pages, bulk listing tools)
- Lead engine (outbound campaigns, lead gen for businesses)
- Advanced security hardening and disaster recovery
- Performance optimisation and CDN integration
- Potential: mobile app shell (React Native)

**Out of scope:** Internationalisation, non-UK markets, experimental AI research.

---

## Notes

- Phases overlap; some Phase 2 work may begin before Phase 1 is fully complete.
- AI features are always behind feature flags and never block core user flows.
- Database schema will be defined at the start of Phase 2.
- TODO markers in code indicate planned but deferred work.
