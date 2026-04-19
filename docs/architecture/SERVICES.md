# EK Marketplace — Services Description

## apps/web — Next.js Frontend

**Technology**: Next.js 14 (App Router), React 18, TailwindCSS

**Responsibilities**:
- Server-side rendered marketplace pages (SEO-optimised)
- Authentication UI (NextAuth.js)
- Listing browse, search, and detail pages
- Post-an-ad multi-step form
- User account dashboard
- Admin moderation UI

**Key Routes (planned)**:
```
/                     → Homepage
/browse               → Listing browse with filters
/listing/[slug]       → Listing detail
/post-ad              → Post a new listing
/account              → User dashboard
/admin                → Admin panel (restricted)
```

---

## apps/api — Express API

**Technology**: Express 4, TypeScript, Prisma

**Responsibilities**:
- REST API for all data operations
- Authentication and session management
- Input validation (Zod)
- Business logic (listing lifecycle, messaging)
- File upload handling

**API Prefix**: `/api/v1/`

**Key Endpoints (planned)**:
```
GET    /api/v1/listings           → Browse listings
POST   /api/v1/listings           → Create listing
GET    /api/v1/listings/:id       → Get listing
PATCH  /api/v1/listings/:id       → Update listing
DELETE /api/v1/listings/:id       → Delete listing
POST   /api/v1/messages           → Send contact message
POST   /api/v1/auth/register      → Register user
POST   /api/v1/auth/login         → Login
GET    /api/v1/categories         → List categories
```

---

## apps/worker — Background Worker

**Technology**: Node.js, Bull, TypeScript

**Responsibilities**:
- Process listing images (resize, optimise)
- Send transactional emails
- AI moderation scoring (async)
- Saved search alerts
- Subscription renewal handling

**Queues**:
```
listings        → Post-processing after listing created
emails          → Transactional email delivery
ai-moderation   → Async AI content scoring
```

---

## packages/ui — Shared Component Library

Reusable React components shared across web and any future apps.

---

## packages/config — Shared Configuration

Business constants (categories, regions, limits) and environment helpers.

---

## packages/ai — AI Services

Isolated AI service layer. All external AI API calls go through here.

---

## packages/types — Shared TypeScript Types

Type definitions shared across all apps and packages.

---

## packages/db — Database Client

Prisma client singleton and schema. Used by API and worker.
