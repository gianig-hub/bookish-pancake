# EK Marketplace — Development Roadmap

## Overview

EK Marketplace is built in 4 phases. Each phase has a clear MVP scope and gates the next phase.

**Do not build Phase 2 features until Phase 1 is live and validated.**

---

## Phase 1 — MVP Marketplace (Weeks 1–6)

**Goal**: A working marketplace where users can list, browse, and search cooling equipment.

### Core Features

- [ ] User registration and login (email + password)
- [ ] Create, edit, delete listings
- [ ] Browse listings by category
- [ ] Search and filter listings
- [ ] Listing detail page
- [ ] My listings dashboard
- [ ] Basic mobile-responsive UI

### Technical Foundation

- [ ] PostgreSQL database schema
- [ ] Prisma ORM + migrations
- [ ] Express REST API
- [ ] NextAuth.js authentication
- [ ] Docker local development
- [ ] GitHub Actions CI

### Listing Types (Phase 1)

- For Sale
- Wanted Ads

### Categories (Phase 1)

- AC Units
- Refrigeration
- Cold Rooms
- Freezer Rooms
- Parts & Components
- Tools & Accessories

### Out of Scope for Phase 1

- ❌ Image upload
- ❌ Payments or subscriptions
- ❌ Business directory
- ❌ AI features
- ❌ Email notifications
- ❌ Advanced search (AI-powered)

---

## Phase 2 — Business Features (Months 2–4)

**Goal**: Monetization foundations and business listings.

### Features

- Image upload (Cloudinary or S3)
- Business directory and profiles
- Subscription plans (Buyer, Seller Plus, Trader Pro, Dealer)
- Stripe payment integration
- Email notifications (registration, listing alerts)
- Listing boosts (Bump Up, Featured, Urgent)
- Services marketplace (request + offer)
- Hire/Rental listings
- User messaging (lead generation)
- Reviews and ratings

### Technical

- Stripe webhooks
- BullMQ email queue (worker app)
- Cloudinary image integration
- Business profile pages (SEO)
- Robots.txt + sitemap.xml

---

## Phase 3 — AI Integration (Months 4–6)

**Goal**: Use AI to improve discovery, listing quality, and moderation.

### Buyer AI

- Natural language search ("find me a used commercial fridge under £500")
- Service matching ("I need AC servicing in Manchester")
- AI FAQ assistant

### Seller AI

- AI listing title and description generator
- Category auto-suggest
- Condition detection from description

### Admin AI

- Spam and duplicate detection
- Moderation queue assist
- SEO content gap analysis

### Technical

- OpenAI or Anthropic API integration (`packages/ai`)
- Semantic search with vector embeddings (pgvector)
- Rate limiting on AI endpoints
- Prompt versioning

---

## Phase 4 — Scale & Trust (Month 6+)

**Goal**: Build trust signals, improve SEO, prepare for growth.

### Features

- Verified business badges
- Accreditation display (F-Gas, REFCOM)
- SEO guide pages (location + category combinations)
- Admin dashboard
- Advanced analytics
- Multi-language (if needed)
- API for external integrations

---

## Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| Repository structure | Week 0 | ✅ Done |
| Database schema | Week 1 | 🔲 |
| Auth working | Week 2 | 🔲 |
| Listings API + UI | Week 3–4 | 🔲 |
| Search working | Week 5 | 🔲 |
| Phase 1 MVP live | Week 6 | 🔲 |
| Image upload | Month 2 | 🔲 |
| Payments live | Month 3 | 🔲 |
| AI search | Month 5 | 🔲 |

---

## Tech Decisions (Locked for Phase 1)

| Decision | Choice | Reason |
|----------|--------|--------|
| Database | PostgreSQL | Mature, full-text search, relations |
| ORM | Prisma | Type-safe, great DX, migrations |
| Auth | NextAuth.js | Standard for Next.js, extensible |
| Backend | Express | Simple, well-understood |
| Frontend | Next.js 14 App Router | SEO-friendly, server components |
| Styling | TailwindCSS | Fast UI, no design system needed early |
| Queue | BullMQ + Redis | Phase 2+ |
| Payments | Stripe | Phase 2+ |
| AI | OpenAI/Anthropic | Phase 3+ |
