# Roadmap — EK Marketplace

> A realistic, phase-gated plan for building the UK's specialist cooling and refrigeration marketplace.

---

## Phase 1 — Foundations & Structure

**Objective:** Establish the full project scaffold, deployment infrastructure, and minimal public shell. No production features yet — the goal is a working, deployable skeleton.

### Key Deliverables

- [x] Monorepo structure (`apps/`, `packages/`, `infra/`, `docs/`)
- [x] Environment configuration (`.env.example`, `docker-compose.yml`)
- [x] Nginx reverse proxy setup (www, app, api subdomains)
- [x] AI placement map (`docs/ai/AI-PLACEMENT-MAP.md`)
- [x] VPS setup guide (`docs/deployment/VPS-SETUP.md`)
- [x] Copilot dev standards (`.github/copilot-instructions.md`)
- [ ] Prisma schema starter (User, Listing, Business stubs)
- [ ] Authentication — register, login, session (NextAuth + API)
- [ ] User roles — buyer, seller, business, admin
- [ ] Minimal public homepage (static/placeholder)
- [ ] Account area shell (authenticated layout)
- [ ] CI pipeline (GitHub Actions — lint, type-check, test)

### Out of Scope (Phase 1)

- Listing CRUD
- Payments
- AI features
- Search beyond basic text
- Email notifications

---

## Phase 2 — Core Marketplace

**Objective:** Build the marketplace. Users can post, browse, search, and manage listings. Businesses can create profiles. Monetisation groundwork is in place.

### Key Deliverables

- [ ] Listing model — For Sale, Wanted, Service Request, Hire
- [ ] Post an Ad flow — category, details, images, preview, submit
- [ ] Browse listings — category pages, filters, pagination
- [ ] Listing detail page — full view, contact/enquiry action
- [ ] Basic search — keyword + category filter
- [ ] Business directory — create/edit profile, browse by category
- [ ] Business profile page — listings, contact, about
- [ ] Wanted Ads — post a wanted, view wanteds
- [ ] Service Requests — post a request, receive enquiries
- [ ] User dashboard — my listings, saved searches, messages
- [ ] Pricing plans — Free, Seller Plus, Trader Pro, Business
- [ ] Listing boosts — Bump Up, Featured, Urgent, Top of Category
- [ ] Basic email notifications — listing published, enquiry received
- [ ] Admin panel — moderation queue, listing management, user management

### Out of Scope (Phase 2)

- AI-assisted posting
- AI-powered search
- Lead engine automation
- Payments processing (placeholder OK)
- Analytics dashboard

---

## Phase 3 — AI Integration

**Objective:** Layer AI into the product where it adds genuine value. AI is modular — each feature can be toggled independently.

### Key Deliverables

- [ ] AI-powered search — natural language queries, smart ranking
- [ ] Seller Copilot — title/description suggestions during posting
- [ ] Category auto-suggest — AI suggests the right category from draft
- [ ] Missing info detection — prompt seller to complete sparse listings
- [ ] Business Copilot — profile writing assistant, FAQ generation
- [ ] Lead reply drafting — AI suggests replies to enquiries
- [ ] Review response assistant — AI drafts professional replies to reviews
- [ ] Admin moderation AI — spam scoring, risk flagging, duplicate detection
- [ ] Support triage — route inbound support queries by intent
- [ ] Homepage AI search widget — conversational entry point

### Out of Scope (Phase 3)

- Full chat/messaging AI
- Autonomous posting (human in the loop required)
- Price prediction engine
- Recommendation engine (deferred to Phase 4)

---

## Phase 4 — Scale & Intelligence

**Objective:** Strengthen the platform with analytics, advanced AI, and dealer-grade features. Focus on retention, revenue growth, and SEO at scale.

### Key Deliverables

- [ ] Analytics dashboard — traffic, listing views, leads, conversions
- [ ] SEO enhancements — structured data, sitemap improvements, landing pages
- [ ] Advanced moderation — AI-assisted bulk review, appeal flow
- [ ] Lead engine — proactive matching of buyers to sellers/businesses
- [ ] Dealer storefront — branded pages, stock feeds, showcase products
- [ ] Recommendation engine — similar listings, "you may also like"
- [ ] Price benchmarking — compare listing price against market
- [ ] Saved search alerts — notify buyers when new matching listings appear
- [ ] API access (Trader Pro / Business plans) — push listings programmatically
- [ ] Scaling improvements — caching, CDN, read replicas, queue tuning

### Out of Scope (Phase 4)

- Mobile app (consider after web MVP is proven)
- International expansion
- Auction/bidding features

---

## Timeline Guidance

| Phase | Estimated Duration | Depends On |
|-------|--------------------|------------|
| Phase 1 | 2–4 weeks | Team ready, VPS provisioned |
| Phase 2 | 6–10 weeks | Phase 1 complete |
| Phase 3 | 4–6 weeks | Phase 2 stable, OpenAI key |
| Phase 4 | Ongoing | Phase 2–3 in production |

> These are guidance estimates for a 1–2 developer team. Adjust based on capacity.

---

*See [NEXT-STEPS.md](./NEXT-STEPS.md) for the recommended immediate build order.*
