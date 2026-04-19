# EK Marketplace — Roadmap

## Overview

EK Marketplace is built with a **production-first, modular philosophy**. Rather than building everything at once, we deliver in focused phases — each one shippable, testable, and production-ready. AI capabilities are introduced once there is real data and user feedback to make them effective.

This roadmap covers the journey from startup structure through to a scaled, intelligent marketplace platform.

---

## Phase Timeline

```
Phase 1 (Foundation)        Week 1-4   |████
Phase 2 (MVP Marketplace)   Week 5-10  |██████
Phase 3 (AI Integration)    Week 11-16 |██████
Phase 4 (Scaling)           Week 17-24 |████████

Total estimate: 6 months from start to Phase 4 complete
```

---

## Phase 1: Foundation & Launch Readiness

**Timeframe**: Weeks 1–4  
**Goal**: Establish core infrastructure, AI strategy, deployment readiness, and public-facing foundation

### Objective

Build a production-ready infrastructure including database, authentication, and API. Establish the AI placement map and modular architecture for the full project. Set up VPS deployment pipelines, create the public website shell and basic user accounts, and position the platform for the Phase 2 marketplace launch.

### Key Deliverables

**Infrastructure**
- PostgreSQL schema with core models (Users, Businesses, Listings — basic)
- Redis setup for caching and queues
- Authentication (NextAuth with email/password)
- Basic authorization (roles: admin, seller, buyer, business)

**Code & Architecture**
- API core endpoints (auth, users, settings)
- Frontend account system (signup, login, profile)
- Admin dashboard shell
- Seller dashboard shell
- Monorepo fully operational with CI/CD

**AI & Documentation**
- AI placement map finalized (`docs/AI-PLACEMENT-MAP.md`)
- AI service interfaces defined (`packages/ai/`)
- Feature flag system implemented
- AI guidelines documented

**Deployment & DevOps**
- VPS setup guide complete (`docs/VPS-SETUP.md`)
- Docker images for all services
- Nginx reverse proxy configuration
- Database backup scripts
- GitHub Actions workflows (lint, build, test)

**Public Presence**
- Marketing website shell (landing page, about, contact)
- Public listing browse (read-only, no login required)
- Mobile-responsive design
- Brand basics (logo, colours, typography)

### Out of Scope

- Listings creation/editing (Phase 2)
- Payments and pricing plans (Phase 2)
- AI features (Phase 3)
- Advanced moderation (Phase 3)
- Analytics (Phase 4)
- Mobile app (post-Phase 4)

---

## Phase 2: Marketplace MVP Launch

**Timeframe**: Weeks 5–10  
**Goal**: Enable all core marketplace transactions and business models

### Objective

Launch all core marketplace features and enable businesses, sellers, and buyers to actively participate. Implement basic pricing and promotion models and establish the marketplace as a functional trading platform. Generate initial user feedback to inform Phase 3 improvements.

### Key Deliverables

**Core Marketplace Features**
- Listings system (create, edit, delete)
  - Equipment marketplace (AC units, refrigeration systems, cold rooms)
  - Services marketplace (installation, maintenance, repair)
  - Listing categories and taxonomy
  - Image upload and gallery
  - Search by keyword, category, location
- Business directory
  - Business profiles with verification status
  - Installer/supplier profiles
  - Rating and review system (basic)
  - Business contact and booking
- Wanted ads
  - Customer requirements posting
  - Quote request system
  - Quote notifications to relevant businesses
- Service requests
  - Service booking workflow
  - Basic messaging between parties
  - Service status tracking

**Seller & Business Tools**
- Seller dashboard with analytics (views, contacts, conversions)
- Business dashboard with analytics
- Listings management bulk operations
- Message centre for inquiries
- Export listings data

**Monetisation**
- Listing pricing (free tier + paid)
- Boost/promote listings
- Featured listings on homepage/search
- Commission structure for services
- Payment processing setup (Stripe/PayPal)

**User Experience**
- Advanced filters (price, condition, brand, location)
- Sorting (newest, most viewed, price ascending/descending)
- Saved listings
- Search history
- Email notifications for matching listings
- SMS notifications (optional)

### Out of Scope

- AI-powered search (Phase 3)
- Content creation assistance (Phase 3)
- Advanced moderation AI (Phase 3)
- Analytics dashboards (Phase 4)
- Referral program (Phase 4+)
- Mobile app (post-Phase 4)

---

## Phase 3: AI Integration & Intelligence

**Timeframe**: Weeks 11–16  
**Goal**: Add AI-powered features that improve discovery, trust, and usability

### Objective

Implement AI search ranking and discovery, and add seller and business AI assistants for content and operations. Deploy automated moderation for safety and quality, reduce friction for users through AI assistance, and position the marketplace as a "smart" alternative to competitors.

### Key Deliverables

**AI Search & Discovery**
- Smart search ranking (relevance, freshness, seller quality)
- Autocomplete with typo correction
- Smart filters (understand user intent)
- Personalised recommendations (based on browsing/purchases)
- "Similar listings" suggestions
- Search analytics (what users search for, conversion rates)

**Seller AI Copilot**
- Title generation assistant (category + keywords → suggested titles)
- Description writer (bullet points → polished description)
- Auto-category suggestion (description + title → category)
- Duplicate detection (warn if similar listing exists)
- Pricing recommendations (market data → suggested price)
- Image tagging and organisation

**Business AI Copilot**
- Profile optimisation suggestions
- Service/equipment matching (customer needs → recommendations)
- Auto-reply templates for inquiries
- Inquiry prioritisation (hot leads ranked first)
- Response time recommendations
- SEO tips for visibility

**Admin Moderation AI**
- Listing risk scoring (0–100 scale for spam/fraud)
- Spam detection (auto-flag suspicious listings)
- Scam pattern detection
- Auto-reject obvious spam (≥95% confidence)
- Suspicious behaviour alerts (pricing anomalies, rapid posting, etc.)
- Duplicate listing detection
- Hate speech and prohibited content detection

**Implementation**
- Feature flag system for A/B testing
- Logging of all AI decisions (for audit trail)
- Fallback to manual review always available
- Performance monitoring
- User feedback loop (thumbs up/down on suggestions)

### Out of Scope

- Generative AI for images (Phase 5+)
- Natural language Q&A chatbot (Phase 4+)
- Predictive analytics (Phase 4)
- Machine learning model retraining (Phase 5+)
- Mobile push notifications (Phase 4)

---

## Phase 4: Analytics, Scaling & Dealer Features

**Timeframe**: Weeks 17–24  
**Goal**: Add business intelligence, advanced features for high-volume sellers, and scale infrastructure

### Objective

Provide sellers and businesses with actionable analytics and insights, and enable high-volume dealer storefronts and wholesale features. Implement advanced moderation and safety features, add a lead generation engine for premium sellers, and optimise infrastructure for scale (performance, caching, CDN).

### Key Deliverables

**Analytics & Intelligence**
- Seller analytics dashboard (views, clicks, conversion rate, revenue)
- Market insights (trending categories, top pricing, competitor analysis)
- Lead quality scoring
- Buyer behaviour analytics
- Seasonal trends and forecasting
- Report generation and export (CSV, PDF)

**Advanced Moderation**
- Account risk scoring (buyer and seller)
- Payment fraud detection
- Chargeback prevention
- Account suspension workflows
- Appeal process for suspended accounts
- Dispute resolution tools
- Trust score visible to users

**Lead Generation Engine (Premium)**
- Seller subscriptions for high visibility
- Priority placement on search
- Lead notifications for matching customer requests
- CRM integration (basic)
- Bulk messaging to customers (with limits)
- Exclusive categories for premium sellers

**Dealer Storefront Features**
- White-label business pages
- Multi-location support
- Catalogue management (thousands of products)
- Wholesale pricing tiers
- Bulk ordering interface
- EDI/API integration for orders
- Commission adjustments for volume
- Custom branding options

**Performance & Infrastructure**
- CDN integration for images
- Database query optimisation
- Redis caching for search
- Background job optimisation
- API rate limiting per user
- DDoS protection
- Monitoring and alerting
- Load balancing setup

**Advanced Safety**
- KYC (Know Your Customer) process for sellers
- Business verification (company registration check)
- Document verification (certificates, licences)
- Scheduled site inspections/audits
- Insurance requirements for service providers

### Out of Scope

- International marketplace (UK-focused)
- Mobile native app (web-only)
- Cryptocurrency payments (Phase 5+)
- Advanced AI (generative models, agents)
- Integration marketplace (Phase 5+)

---

## Phase 5+ (Future Roadmap)

**Timeframe**: Beyond Phase 4

### Potential Features (Not Committed)

- Mobile native apps (iOS, Android)
- Video support (product videos, service portfolios)
- Live chat and video consultations
- Integration marketplace (third-party tools)
- Marketplace API (for partners)
- Machine learning model updates
- Predictive pricing and trends
- Buyer/seller verified badges
- Insurance partnerships
- Financing options for equipment
- International expansion
- Industry certification tracking
- Supplier portals for B2B

---

## Key Principles Across All Phases

1. **Production-First** — Every phase ships production-ready code
2. **User Feedback** — Each phase includes time for user testing and iteration
3. **Security Throughout** — Security is built in, not added later
4. **Documentation** — Every feature is documented as we build
5. **Monitoring** — All systems have monitoring and alerts
6. **Scalability** — Infrastructure planned for 10x growth
7. **Privacy** — GDPR-compliant from the start

---

## Dependencies & Blockers

- Phase 2 depends on Phase 1 infrastructure
- Phase 3 AI depends on Phase 2 data (listings, behaviours)
- Phase 4 analytics depends on Phase 2–3 (for real data)
- All phases depend on external services:
  - Payment processor (Stripe, PayPal)
  - Email service (SendGrid, AWS SES)
  - File storage (AWS S3 or Backblaze)
  - AI models (OpenAI, Anthropic, or self-hosted)

---

## Success Metrics by Phase

**Phase 1**
- ✅ Infrastructure deployed and stable
- ✅ 100% code coverage for core auth
- ✅ 0 critical security issues
- ✅ Sub-second API response times

**Phase 2**
- ✅ 50+ test listings created
- ✅ 10+ business profiles registered
- ✅ 5+ quote requests generated
- ✅ <1% listing quality issues

**Phase 3**
- ✅ AI search ranking improves click-through by 20%
- ✅ Seller copilot increases listing completion by 30%
- ✅ Admin AI catches 95%+ of spam
- ✅ <2% false positive rate

**Phase 4**
- ✅ Dealer analytics used by 80%+ of premium sellers
- ✅ Advanced moderation reduces chargebacks by 40%
- ✅ Lead engine generates 50%+ of premium revenue
- ✅ Infrastructure handles 10x load with <50ms latency

---

## Assumptions & Risks

### Assumptions

- PostgreSQL is sufficient for data volume (Phase 4+ may need sharding)
- Redis is sufficient for caching (may need distributed cache)
- Single server sufficient for Phase 1–2 (will need load balancing Phase 3+)
- AI models from OpenAI/Anthropic available and affordable
- UK market will accept marketplace model
- Initial user base can be bootstrapped through networking

### Risks

- Payment processor integration delays (mitigate: research early)
- Regulatory changes (mitigate: legal review before launch)
- Competitor enters UK market (mitigate: move fast, differentiate on AI)
- User acquisition slower than expected (mitigate: have pricing model tested)
- AI accuracy insufficient for moderation (mitigate: hybrid AI + human review)
- Infrastructure costs higher than projected (mitigate: monitoring and optimisation)

---

## Flexibility & Pivots

This roadmap is **directional, not fixed**. We will:

- Gather user feedback at end of each phase
- Adjust priorities based on market response
- Skip features that don't resonate
- Add features that users request
- Extend timelines if quality requires it
- Never compromise on security or stability

---

## How to Use This Roadmap

1. **For Developers** — Know what to build and when
2. **For Product** — Know what features to design and when
3. **For Users** — Know what's coming and can provide feedback
4. **For Investors** — Understand progress and scale path
5. **For Team** — Alignment on priorities and milestones
