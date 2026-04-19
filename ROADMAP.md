# EK Marketplace — Development Roadmap

An AI-first UK vertical marketplace for AC, refrigeration, cold rooms, freezer rooms, equipment, parts, tools, and services.

---

## Phase 1 — Core Marketplace Foundation (Weeks 1–6)

**Goal:** Working local marketplace with listings, search, and user accounts.

### 1.1 Infrastructure & Tooling
- [x] Monorepo structure (`apps/`, `packages/`, `infra/`, `docs/`)
- [x] Docker Compose (PostgreSQL, Redis, web, API, worker, Nginx)
- [x] Nginx reverse proxy with subdomain routing
- [x] `.env.example` with all required variables documented
- [ ] Root TypeScript config (`tsconfig.base.json`)
- [ ] Root ESLint + Prettier config
- [ ] Root `package.json` with workspace scripts
- [ ] GitHub Actions CI workflow (lint + type-check)

### 1.2 Database Schema
- [ ] Prisma setup in `apps/api`
- [ ] `User` model (buyers, sellers, businesses)
- [ ] `Listing` model (equipment ads, wanted ads)
- [ ] `Category` model (AC, refrigeration, cold rooms, parts, tools, etc.)
- [ ] `Business` model (dealer/business profiles)
- [ ] `ServiceRequest` model
- [ ] Initial seed data (categories)

### 1.3 Authentication
- [ ] NextAuth.js in `apps/web` (email/password + magic link)
- [ ] API JWT middleware in `apps/api`
- [ ] User registration and login pages
- [ ] Protected routes

### 1.4 Core API
- [ ] `POST /api/v1/listings` — create listing
- [ ] `GET /api/v1/listings` — list/search listings
- [ ] `GET /api/v1/listings/:id` — listing detail
- [ ] `PUT /api/v1/listings/:id` — update listing
- [ ] `DELETE /api/v1/listings/:id` — delete listing
- [ ] `GET /api/v1/categories` — category tree
- [ ] `GET /api/v1/businesses` — business directory
- [ ] `GET /api/v1/businesses/:id` — business profile

### 1.5 Frontend (MVP Pages)
- [ ] Homepage (hero, featured listings, categories)
- [ ] Listings browse page (grid, filters, pagination)
- [ ] Listing detail page
- [ ] Post ad flow (form wizard)
- [ ] User account area (my listings, edit profile)
- [ ] Basic business profile page

### 1.6 Search
- [ ] Basic keyword + category filter search
- [ ] Location filter (UK region/postcode)
- [ ] Condition filter (new, used, refurbished, etc.)
- [ ] Sort by (newest, price low/high)

---

## Phase 2 — Subscriptions, Payments & Business Features (Weeks 7–12)

**Goal:** Monetisation live, verified businesses, lead management.

### 2.1 Subscriptions & Payments
- [ ] Stripe integration (subscriptions + boosts)
- [ ] Plan management (Seller Plus, Trader Pro, Dealer/Business)
- [ ] Listing boost types (Bump Up, Urgent, Featured, Spotlight)
- [ ] Subscription management pages
- [ ] Webhook handling for payment events

### 2.2 Business Accounts
- [ ] Business profile creation and verification
- [ ] Business dashboard
- [ ] Lead inbox (enquiry messages)
- [ ] Featured business listing

### 2.3 Trust & Safety
- [ ] Listing moderation queue (admin panel)
- [ ] Report listing / flag for review
- [ ] Basic spam detection rules
- [ ] Email verification for new accounts

### 2.4 Notifications
- [ ] Email notifications (BullMQ + nodemailer/Resend)
- [ ] In-app notification system (Phase 2 simple version)

### 2.5 Reviews & Ratings
- [ ] Seller reviews
- [ ] Business ratings

---

## Phase 3 — AI Features (Weeks 13–20)

**Goal:** AI adds real value to search, posting, and business operations.

### 3.1 AI-Assisted Listing Creation
- [ ] Listing title suggestions
- [ ] Description generation from user inputs
- [ ] Category auto-suggestion
- [ ] Condition/spec suggestions

### 3.2 AI-Assisted Search
- [ ] Natural language search queries
- [ ] Semantic search with embeddings
- [ ] AI-ranked results

### 3.3 AI Moderation
- [ ] Automated spam and duplicate detection
- [ ] Risk scoring for new listings
- [ ] Moderation queue prioritisation

### 3.4 AI Business Tools
- [ ] Business profile writing assistant
- [ ] Lead reply suggestions
- [ ] FAQ generation for business profiles

### 3.5 AI Buyer Tools
- [ ] Comparison assistant
- [ ] FAQ / help centre chatbot

---

## Phase 4 — Growth, SEO & Scale (Weeks 21+)

**Goal:** Platform ready for real traffic, partnerships, and growth.

### 4.1 SEO
- [ ] Dynamic category, subcategory, and location pages
- [ ] Structured data (JSON-LD for listings, businesses)
- [ ] Sitemap generation
- [ ] Guide / blog section

### 4.2 Advanced Features
- [ ] Saved searches and alerts
- [ ] Favourites / watchlist
- [ ] Messaging system (buyer-seller)
- [ ] Advanced analytics dashboard

### 4.3 Infrastructure & Scaling
- [ ] CDN for images (Cloudflare or similar)
- [ ] Redis caching for hot listing pages
- [ ] SSL/TLS with Let's Encrypt (certbot)
- [ ] Automated database backups
- [ ] Monitoring and alerting (Grafana/Prometheus or similar)
- [ ] Load testing before launch

---

## Milestone Summary

| Milestone | Target | Key Outcome |
|-----------|--------|-------------|
| Phase 1 Done | Week 6 | Working local marketplace, listings, search, auth |
| Phase 2 Done | Week 12 | Stripe live, businesses, leads, moderation |
| Phase 3 Done | Week 20 | AI features live, product differentiated |
| Phase 4 Done | Week 26+ | SEO traffic, real users, scale-ready |

---

> **Current Status:** Phase 1 infrastructure setup complete. Starting Phase 1.1 tooling and database schema.
