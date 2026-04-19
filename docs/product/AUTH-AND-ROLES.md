# EK Marketplace — Authentication & User Roles

**docs/product/AUTH-AND-ROLES.md**

---

## Overview

EK Marketplace uses a role-based access control (RBAC) model. Roles determine what a user can see, post, and manage across the platform.

Roles are defined in `packages/types/src/roles.ts` as a TypeScript enum.

---

## User Roles

| Role | Enum Value | Description | Cost |
|------|------------|-------------|------|
| **Buyer** | `buyer` | Browse listings, save favourites, create alerts, contact sellers | Free |
| **Private Seller** | `private_seller` | Post individual/personal listings (equipment, parts) | Free (limited) |
| **Trader** | `trader` | Higher listing volume, basic analytics | Paid |
| **Dealer** | `dealer` | Verified dealer with a dedicated public business profile | Paid |
| **Business** | `business` | Service providers, suppliers, installers — full business listing | Paid |
| **Admin** | `admin` | Full platform access: user management, moderation, settings | Internal |

> **Assumption:** A user has exactly one role at registration time. Role upgrades (e.g. buyer → trader) are handled via the subscription/upgrade flow (not yet implemented).

> **TODO:** Add `moderator` role for trusted human reviewers in the moderation queue.

---

## Account Types

In addition to role, each account has an `AccountType`:

| Account Type | Description |
|--------------|-------------|
| `personal` | Individual user (buyer or private seller) |
| `business` | General business account |
| `dealer` | Equipment dealer |
| `service_provider` | Installation, repair, or maintenance business |

Account type is separate from role to allow future flexibility (e.g. a business account could hold admin-level access in a multi-tenant setup).

---

## Access Levels by Area

### Public Area (`/`)
- **Access:** Everyone (no auth required)
- **Includes:** Homepage, listings browse, services browse, business directory, wanted ads, guides, pricing, about, contact, FAQ

### Auth Area (`/login`, `/register`)
- **Access:** Unauthenticated users only (redirect to `/account` if already logged in)

### Account Dashboard (`/account/*`)
- **Access:** Any authenticated user (all roles)
- **Includes:**
  - `/account` — Dashboard overview
  - `/account/listings` — Manage own listings (visible but limited for buyers)
  - `/account/favourites` — Saved listings
  - `/account/alerts` — Saved search alerts
  - `/account/messages` — Messages/leads inbox
  - `/account/subscription` — Plan management
  - `/account/settings` — Profile and preferences

### Seller Area (`/seller/*`)
- **Access:** `private_seller`, `trader`, `dealer`, `business`, `admin`
- **Includes:**
  - `/seller/post` — Post a new listing
  - `/seller/edit/[id]` — Edit existing listing

### Business Area (`/business/*`)
- **Access:** `dealer`, `business`, `trader`, `admin`
- **Includes:**
  - `/business` — Business dashboard
  - `/business/leads` — Incoming leads and enquiries
  - `/business/profile` — Edit public business profile
  - `/business/analytics` — TODO: Phase 4

### Admin Area (`/admin/*`)
- **Access:** `admin` only
- **Includes:**
  - `/admin` — Admin overview
  - `/admin/moderation` — Content moderation queue
  - `/admin/users` — User management
  - `/admin/settings` — Platform settings

---

## Route Protection Implementation

Route protection is configured in `packages/config/src/routes.ts`.

**Frontend (Next.js):**
- `apps/web/src/middleware.ts` reads the session and enforces `PROTECTED_ROUTES`
- TODO: Wire to real session (NextAuth / JWT) once auth is implemented

**Backend (Express API):**
- `authenticateMiddleware` in `apps/api/src/middleware/auth.middleware.ts` verifies JWT
- `requireRole([...])` in `apps/api/src/roles/roles.guard.ts` enforces role checks on routes

---

## MVP vs Later

### MVP (Phase 1–2)

| Feature | Status |
|---------|--------|
| Email + password registration | TODO: implement |
| Login / logout | TODO: implement |
| JWT session management | TODO: implement |
| Role enum and types | ✅ Done (`packages/types`) |
| Route protection config | ✅ Done (`packages/config`) |
| Middleware stubs | ✅ Done (`apps/api`) |
| Next.js middleware stub | ✅ Done (`apps/web`) |
| Account dashboard shell | ✅ Done (placeholder pages) |
| Business area shell | ✅ Done (placeholder pages) |
| Admin area shell | ✅ Done (placeholder pages) |

### Phase 2

| Feature | Notes |
|---------|-------|
| Email verification | Confirm email after registration |
| Password reset | Forgot password flow |
| Role upgrade/subscription flow | Buyer → Trader/Business |
| Social login (Google, Apple) | Via OAuth2 |
| Session refresh tokens | Long-lived sessions |
| Token blocklisting | Logout from all devices |

### Phase 3+

| Feature | Notes |
|---------|-------|
| Multi-session management | See all active sessions |
| Audit log | Track admin actions |
| IP-based fraud detection | Risk scoring for new accounts |
| 2FA / MFA | TOTP or SMS-based |

---

## Assumptions

1. **Single role per user** — no multi-role system at MVP.
2. **Role stored in JWT** — role is embedded in the session token, not fetched on every request.
3. **Prisma User model** — will include `id`, `email`, `passwordHash`, `role`, `accountType`, `emailVerified`, `active`, `createdAt`, `updatedAt` at minimum.
4. **No SSO at MVP** — enterprise SSO (SAML, OIDC) is explicitly out of scope.
5. **Admin accounts created manually** — no self-registration for admin role.

---

## Gaps Intentionally Left

- No DB schema defined (Prisma schema to be added in a future task)
- No actual JWT signing/verification implemented (stubs in `apps/api/src/auth/auth.service.ts`)
- No email provider integrated
- No OAuth provider integrated
- No real session reading in Next.js middleware (stub returns null)

---

## Recommended Next Task

**Implement auth foundation:**
1. Add Prisma with minimal User + Session schema
2. Implement `auth.service.ts` (register + login)
3. Implement `/auth/register` and `/auth/login` endpoints
4. Replace Next.js middleware stub with real JWT reading
5. Test end-to-end: register → login → access `/account`
