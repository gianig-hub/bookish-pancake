# EK Marketplace — Roadmap

This roadmap outlines the four-phase development plan for EK Marketplace. Each phase builds on the last. Phases are not strictly time-boxed but are structured around delivery milestones.

---

## Phase 1 — Foundation & Startup Structure

**Objective:** Establish a solid, well-documented project foundation that the whole team can build on. No half-measures.

### Key Deliverables

- [x] Project vision and summary (`ek_github_summary_README.md`)
- [x] Monorepo structure (`apps/`, `packages/`, `infra/`, `docs/`)
- [x] Root documentation: README.md, ROADMAP.md, CHANGELOG.md, NEXT-STEPS.md
- [x] Environment variable template (`.env.example`)
- [x] Docker Compose local dev setup (`docker-compose.yml`)
- [x] Nginx reverse proxy configuration (`infra/nginx/`)
- [x] VPS deployment guide (`docs/deployment/VPS-SETUP.md`)
- [x] AI placement map (`docs/ai/AI-PLACEMENT-MAP.md`)
- [x] Copilot development standards (`.github/copilot-instructions.md`)
- [ ] App shells: `apps/web`, `apps/api`, `apps/worker`
- [ ] Package starters: `packages/ui`, `packages/types`, `packages/config`, `packages/ai`
- [ ] GitHub Actions CI/CD starter workflow
- [ ] Authentication system (NextAuth + API session handling)
- [ ] User roles: buyer, seller, business, admin

### Out of Scope for Phase 1

- Full database schema
- Live listing data
- Payment integration
- AI features beyond structural setup
- Production deployment (VPS can be prepared but not required)

---

## Phase 2 — Core Marketplace MVP

**Objective:** Ship the first working version of the marketplace that real users can browse and post on.

### Key Deliverables

- [ ] Listings system: post, browse, search, filter
- [ ] Equipment categories (AC, refrigeration, cold rooms, parts, tools)
- [ ] Service listings and service requests
- [ ] Businesses / Dealers directory with profiles
- [ ] Wanted ads (post + respond)
- [ ] Pricing plans (Free, Seller Plus, Trader Pro, Dealer)
- [ ] Listing boosts (Bump Up, Featured, Urgent, Top of Category)
- [ ] Basic moderation queue (admin review)
- [ ] User account area (my listings, favourites, alerts)
- [ ] Email notifications (new leads, messages, alerts)
- [ ] Basic SEO: meta tags, sitemap, structured data for listings

### Out of Scope for Phase 2

- AI-powered search or recommendations
- Commission-based payments
- Full review system
- Advanced analytics
- Dealer storefront features

---

## Phase 3 — AI Features & Seller Tools

**Objective:** Add AI-powered features that differentiate EK Marketplace from generic classifieds platforms.

### Key Deliverables

- [ ] AI search: natural-language marketplace search
- [ ] Seller Copilot: listing title/description generation, category suggestions, missing info detection
- [ ] Business Copilot: profile writing, lead reply drafting, FAQ generation
- [ ] Admin moderation AI: spam detection, duplicate listing detection, risk flagging
- [ ] AI-powered support triage
- [ ] Review reply drafting for businesses
- [ ] SEO content gap suggestions for admin

### Out of Scope for Phase 3

- Full automation of moderation (human review stays in loop)
- AI-generated public content pages (thin content risk)
- Third-party AI integrations beyond OpenAI/Anthropic

---

## Phase 4 — Scale, Analytics & Dealer Features

**Objective:** Grow the platform's capabilities once the marketplace is live and validated.

### Key Deliverables

- [ ] Analytics dashboard (listings views, leads, searches, conversions)
- [ ] Advanced moderation tools (bulk actions, trust scores, ban management)
- [ ] Lead engine improvements (lead matching, notifications, premium lead routing)
- [ ] Dealer storefront features (custom pages, featured products, branding)
- [ ] Commission/transaction layer (optional, post-validation)
- [ ] Scaling improvements (CDN, caching, search performance)
- [ ] Internationalisation groundwork (i18n structure, not full translation)
- [ ] API rate limiting and partner API access

### Out of Scope for Phase 4

- Native mobile app (web-first approach)
- Multi-country expansion (UK-only at this stage)
- Auction or bidding features (out of scope for MVP vertical)

---

## Notes

- Phases may overlap in delivery but each phase's core deliverables should be complete before the next phase is the primary focus.
- The roadmap is a living document — update it as priorities shift.
- Phase 1 is non-negotiable: a clean foundation prevents technical debt compounding.

---

*Last updated: Phase 1 — startup structure in progress.*
