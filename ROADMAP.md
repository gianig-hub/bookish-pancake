# EK Marketplace — Roadmap

> Living document. Updated as priorities shift.

---

## Phase 1: MVP (Services + Equipment Marketplace)

**Estimated timeline: 4–6 weeks**

### Core Infrastructure
- [x] Monorepo structure (npm workspaces + Turborepo)
- [x] Docker Compose local dev environment
- [x] GitHub Actions CI/CD pipeline
- [ ] PostgreSQL schema (Prisma)
- [ ] Authentication (NextAuth.js)
- [ ] Basic API endpoints

### Marketplace Features
- [ ] Homepage with category navigation
- [ ] Services Marketplace (list/browse/view)
- [ ] Equipment Marketplace (list/browse/view)
- [ ] Post an Ad (services & equipment)
- [ ] Basic keyword search
- [ ] Category/subcategory filtering
- [ ] Listing detail page
- [ ] Business profile page
- [ ] Contact seller form
- [ ] User registration / login
- [ ] My Listings dashboard

### Platform
- [ ] Image upload (local storage, S3-ready)
- [ ] Email notifications (listing alerts, messages)
- [ ] Admin moderation queue
- [ ] Basic SEO (meta tags, sitemap)

---

## Phase 2: AI Features

**Estimated timeline: 2–3 weeks after Phase 1**

### AI-Assisted Seller Tools
- [ ] AI listing title generator
- [ ] AI listing description writer
- [ ] Category suggestion from description
- [ ] Condition/spec suggestions

### AI-Assisted Buyer Tools
- [ ] Natural-language search
- [ ] Service/product matching
- [ ] Comparison assistance
- [ ] FAQ chatbot assistant

### AI-Assisted Admin Tools
- [ ] Spam/scam detection scoring
- [ ] Duplicate listing detection
- [ ] Moderation priority scoring
- [ ] Support ticket triage

---

## Phase 3: Advanced Analytics & Insights

**Estimated timeline: 2–3 weeks after Phase 2**

### Seller Analytics
- [ ] Listing view counts
- [ ] Contact/inquiry tracking
- [ ] Boost performance metrics
- [ ] Market demand signals

### Platform Analytics
- [ ] Category popularity trends
- [ ] Search term analysis
- [ ] Conversion funnel tracking
- [ ] Geographic demand maps

### Business Directory
- [ ] Verified business badges
- [ ] Review & rating system
- [ ] Business leads dashboard
- [ ] AI reply assistance

---

## Phase 4: Polish & Scale

**Ongoing**

### Performance
- [ ] CDN for static assets
- [ ] Database query optimisation
- [ ] Redis caching layer
- [ ] Image optimisation pipeline

### Monetisation
- [ ] Subscription plans (Starter, Pro, Business)
- [ ] Listing boosts / featured placements
- [ ] Premium business profiles
- [ ] Invoice & billing management

### Mobile
- [ ] Responsive PWA
- [ ] Push notifications
- [ ] Mobile-optimised listing flow

### Expansion
- [ ] Wanted Ads section
- [ ] Industry Guides / Knowledge Hub
- [ ] Installer Finder tool
- [ ] Specification database

---

## Timeline Summary

| Phase | Focus | Duration | Status |
|-------|-------|----------|--------|
| 0 | Repo & infra setup | 1 week | ✅ In progress |
| 1 | MVP marketplace | 4–6 weeks | 🔜 Next |
| 2 | AI features | 2–3 weeks | ⏳ Planned |
| 3 | Analytics & insights | 2–3 weeks | ⏳ Planned |
| 4 | Polish & scale | Ongoing | ⏳ Planned |
