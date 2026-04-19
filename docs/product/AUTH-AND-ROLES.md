# Auth & Roles – EK Marketplace

> **Status:** Auth shell scaffolded – no real auth implementation yet.  
> Real session management, JWT signing, and DB persistence are the next steps.

---

## Overview

EK Marketplace uses a role-based access control (RBAC) model with five user roles. The auth
system is intentionally minimal at this stage: the type definitions, route guards, and UI shell
are in place, but actual credential validation and session storage are stubbed with clear TODO
markers.

---

## User Roles

| Role        | Description                                                               |
|-------------|---------------------------------------------------------------------------|
| `guest`     | Unauthenticated visitor. Can browse public listings only.                 |
| `buyer`     | Registered user. Can favourite, alert, enquire, and post wanted ads.      |
| `seller`    | Registered user who can post equipment/parts/service listings.            |
| `business`  | Verified business account. Access to `/business` dashboard, leads, etc.  |
| `admin`     | Platform administrator. Full access including `/admin` and moderation.   |
| `moderator` | Content moderator. Access to `/admin/moderation` queue only.             |

Roles are **additive** – a user can hold multiple roles simultaneously (e.g. `seller` + `business`).

---

## Account Types

| Type         | Description                                              |
|--------------|----------------------------------------------------------|
| `personal`   | Individual buyer/seller                                  |
| `business`   | Registered business                                      |
| `trade`      | Trade/contractor account (future tier)                   |
| `admin`      | Internal platform admin account                          |

---

## Route Groups & Protection

```
/                           Public – no auth required
/login                      Public – redirect to /account if already signed in
/register                   Public – redirect to /account if already signed in
/account                    Protected – any authenticated user
/account/listings           Protected – any authenticated user
/account/favourites         Protected – any authenticated user
/account/alerts             Protected – any authenticated user
/business                   Protected + role: business | admin
/business/leads             Protected + role: business | admin
/business/profile           Protected + role: business | admin
/admin                      Protected + role: admin | moderator
/admin/moderation           Protected + role: admin | moderator
```

Route protection is enforced at **two levels**:

1. **Edge Middleware** (`apps/web/src/middleware.ts`) – runs before rendering, redirects
   unauthenticated users to `/login?from=<path>`.  
2. **Layout-level server check** – each protected group layout calls `getSessionUser()` and
   redirects again as a defence-in-depth measure.

---

## Auth Flow (Planned)

```
User submits login form
  → POST /auth/login (apps/api)
  → API validates credentials (TODO: DB lookup)
  → API returns access token + sets refresh token cookie (TODO)
  → Web stores access token in memory / session cookie (TODO)
  → Web redirects to `?from` param or /account
```

```
User accesses protected route
  → Edge middleware reads ek_session cookie
  → If missing → redirect /login?from=<path>
  → If present → verify JWT (TODO)
  → If role insufficient → redirect /account (403-equivalent)
  → Render page
```

---

## Packages & Files

| File | Purpose |
|------|---------|
| `packages/types/src/auth.ts` | `UserRole`, `AccountType`, `AuthUser`, `SessionUser` types |
| `packages/types/src/api.ts` | `ApiResponse`, `ApiError`, `PaginatedResponse` types |
| `packages/config/src/roles.ts` | `ROLES` constants, role group arrays |
| `packages/config/src/routes.ts` | `PUBLIC_ROUTES`, `AUTH_ROUTES`, `BUSINESS_ROUTES`, `ADMIN_ROUTES` |
| `packages/config/src/flags.ts` | `AUTH_FLAGS` feature flag placeholders |
| `apps/web/src/middleware.ts` | Next.js edge middleware – route-level protection |
| `apps/web/src/lib/auth/session.ts` | `getSessionUser()` server-side session helper (stub) |
| `apps/web/src/components/auth/AuthProvider.tsx` | `AuthProvider` + `useAuth()` client-side context |
| `apps/api/src/middleware/auth.ts` | `requireAuth`, `requireRole` Express middlewares |
| `apps/api/src/routes/auth/index.ts` | `/auth` route stubs (register, login, logout, refresh) |
| `apps/api/src/routes/users/index.ts` | `/users/me` route stubs |
| `apps/api/src/routes/roles/index.ts` | `/roles` admin-only route stubs |
| `apps/api/src/routes/sessions/index.ts` | `/sessions` route stubs |

---

## TODOs / Open Gaps

- [ ] Choose auth library (options: **lucia**, **next-auth v5**, **iron-session** + custom JWT)
- [ ] Implement JWT signing/verification in `apps/api`
- [ ] Implement `getSessionUser()` in `apps/web` using chosen library
- [ ] Add database schema for `users` and `sessions` tables
- [ ] Add email verification flow
- [ ] Enable OAuth (Google, Apple) via `AUTH_FLAGS`
- [ ] Add magic-link / passwordless option
- [ ] Implement 2FA
- [ ] Add audit log for role changes
- [ ] Implement session revocation (multiple device sign-out)
- [ ] Wire `AUTH_FLAGS` to a real feature-flag service

---

## Assumptions

- pnpm workspaces + Turborepo for the monorepo build pipeline.
- Next.js 14 App Router with server components for the web frontend.
- Express 4 for the API server.
- No real database yet – all data endpoints return `501 Not Implemented`.
- Auth library decision is deferred until the next sprint (see TODOs above).
