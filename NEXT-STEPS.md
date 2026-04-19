# NEXT-STEPS.md — Recommended Build Order

This file outlines the recommended sequence for building EK Marketplace after the startup structure is in place.

---

## Phase 1 — Foundation (Do First)

These steps unblock everything else and should be completed before any feature work.

1. **Finalise brand and domain**
   - Confirm the final marketplace name and domain
   - Update all `@ek-marketplace/` package names if needed

2. **Set up the monorepo tooling**
   - Initialise a monorepo manager (Turborepo or pnpm workspaces)
   - Add root `package.json`, `pnpm-workspace.yaml` (or equivalent)
   - Add shared `tsconfig.json` base in `packages/config`
   - Add shared ESLint config

3. **Define shared types (`packages/types`)**
   - Define core domain models: `Listing`, `User`, `Business`, `WantedAd`, `Plan`, `Boost`
   - Define listing categories, types, and condition enums
   - Define UK regions
   - This unblocks both API and frontend work

4. **Set up infrastructure**
   - Provision OVH VPS
   - Install Docker, Nginx, PostgreSQL, Redis
   - Set up GitHub Actions CI/CD pipeline (build, lint, deploy)
   - Configure environment variable management (`.env` files, secrets)

---

## Phase 2 — Backend API (`apps/api`)

Build the data layer before the frontend so the web app has real endpoints to connect to.

5. **Scaffold the API server**
   - Initialise Node.js + TypeScript + Express (or Fastify)
   - Connect PostgreSQL with Prisma or Drizzle ORM
   - Set up database schema from `packages/types` models
   - Add Redis connection

6. **Auth system**
   - User registration and login (email + password)
   - JWT access tokens + refresh tokens
   - Role-based access (buyer, seller, trader, admin)

7. **Core listing endpoints**
   - Create, read, update, delete listings
   - Search and filter listings (category, type, condition, location)
   - Image upload (S3-compatible storage)

8. **Business profile endpoints**
   - Create and manage business profiles
   - Business search and directory listing

9. **Wanted ads endpoints**

10. **Subscription and plan endpoints**
    - Plan management
    - Boost creation and expiry

---

## Phase 3 — Worker Service (`apps/worker`)

Set up async processing in parallel with or just after the API.

11. **Scaffold the worker**
    - Initialise BullMQ with Redis
    - Define queue types: `ai`, `email`, `moderation`, `seo`

12. **Email queue**
    - Transactional emails: registration, listing alerts, lead notifications
    - Use a provider like Resend or Postmark

13. **Moderation queue**
    - Basic spam/risk scoring for new listings and accounts
    - Feed results into the admin moderation queue

---

## Phase 4 — AI Module (`packages/ai`)

Build AI features after the core platform is working — do not block MVP on AI.

14. **Scaffold the AI module**
    - Initialise LLM client (OpenAI API)
    - Add prompt versioning structure

15. **Seller AI tools (highest value first)**
    - Listing title generation
    - Listing description writing
    - Category suggestion

16. **Buyer AI tools**
    - Natural-language marketplace search
    - Service matching

17. **Admin AI tools**
    - Spam detection
    - Moderation triage

---

## Phase 5 — Frontend (`apps/web`)

Build the frontend once API endpoints and types are established.

18. **Scaffold Next.js app**
    - Initialise with App Router
    - Connect Tailwind CSS
    - Set up `packages/ui` component library

19. **Public pages (SEO priority)**
    - Homepage
    - Service category pages
    - Equipment category pages
    - Business directory
    - Wanted ads
    - Individual listing pages
    - Business profile pages

20. **User account area**
    - Registration and login
    - My Listings
    - Post an Ad flow (with AI assistance)
    - Favourites and Alerts

21. **Business dashboard**
    - Profile management
    - Lead management

22. **Monetisation pages**
    - Pricing page
    - Subscription upgrade flow
    - Boost purchasing

23. **AI-powered search interface**
    - Natural-language search UI
    - AI suggestion panels in the post-ad flow

---

## Phase 6 — Polish and Launch Prep

24. Structured data (JSON-LD) on listing and category pages
25. Sitemap generation
26. Performance and Core Web Vitals audit
27. Trust & Safety / FAQ / Help Center content
28. End-to-end testing of critical flows
29. Soft launch with seeded listings and businesses

---

## Summary Order

```
packages/types → apps/api → apps/worker → packages/ai → apps/web → launch
```

Build the contracts first, then the data layer, then async processing, then AI, then the frontend.
