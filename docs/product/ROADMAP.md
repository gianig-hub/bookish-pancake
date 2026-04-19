# EK Marketplace — Detailed Roadmap

See also the [root ROADMAP.md](../../ROADMAP.md) for the summary version.

## Phase 0 — Foundation (Current)

**Goal**: Monorepo structure, tooling, CI/CD

- [x] Repository structure
- [x] npm workspaces + Turborepo
- [x] Docker Compose local dev
- [x] GitHub Actions workflows
- [x] Shared packages scaffold
- [x] Documentation structure

## Phase 1 — MVP Core (4–6 weeks)

**Goal**: Working marketplace with equipment and service listings

### Week 1–2: Data & Auth
- Prisma schema (User, Listing, Category, Image, Message)
- NextAuth authentication (email/password + Google)
- User registration and profile
- Basic admin access control

### Week 3–4: Marketplace
- Listing browse page with filters
- Listing detail page
- Post-an-ad flow (multi-step form)
- Image upload (local → S3-ready)
- Contact seller form

### Week 5–6: Polish & Deploy
- SEO (meta tags, sitemap.xml, robots.txt)
- Admin moderation queue
- Email notifications (listing live, new message)
- VPS deployment

## Phase 2 — AI Features (2–3 weeks)

**Goal**: AI-assisted listing creation, search, and moderation

- AI listing title/description generator
- Natural-language search
- Category auto-suggestion
- AI moderation scoring
- FAQ chatbot (basic)

## Phase 3 — Growth Features (2–3 weeks)

**Goal**: Business directory, analytics, subscriptions

- Business / Dealer directory
- Review and rating system
- Seller analytics dashboard
- Subscription billing (Stripe)
- Featured listings / boosts

## Phase 4 — Scale & Optimise (Ongoing)

**Goal**: Performance, scale, advanced features

- CDN integration (Cloudflare)
- Advanced search (Elasticsearch or pgvector)
- Wanted ads section
- Knowledge Hub / Guides
- Mobile PWA
