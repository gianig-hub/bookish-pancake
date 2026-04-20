# Auth & Roles – EK Marketplace

> MVP Foundation: Auth shell, user roles, and protected route placeholders.

---

## Overview

EK Marketplace uses a simple **role-based access control (RBAC)** model at the MVP stage.
There is no advanced permission matrix yet – roles map directly to route groups.

---

## User Roles

| Role        | Description                                               |
|-------------|-----------------------------------------------------------|
| `guest`     | Unauthenticated visitor. Can browse public listings.      |
| `buyer`     | Registered user. Can favourite, save alerts, message.     |
| `seller`    | Personal seller. Can post listings.                       |
| `business`  | Verified business account. Unlocks Business Dashboard.    |
| `moderator` | Platform moderator. Can review flagged content.           |
| `admin`     | Full platform access including admin dashboard.           |

Role privilege is ordered linearly:
```
guest < buyer < seller < business < moderator < admin
```

This hierarchy is defined in `packages/config/src/roles.ts` (`ROLE_HIERARCHY`).

---

## Account Types

| AccountType  | Description                               |
|--------------|-------------------------------------------|
| `personal`   | Default. Can post individual-seller ads.  |
| `business`   | Unlocks Business Dashboard and leads.     |

> TODO: Define account-upgrade flow (personal → business) once billing is in scope.

---

## Protected Route Groups

Defined in `packages/config/src/routes.ts`:

| Group      | Paths                                                               | Min Role    |
|------------|---------------------------------------------------------------------|-------------|
| `account`  | `/account`, `/account/listings`, `/account/favourites`, `/account/alerts` | `buyer` |
| `business` | `/business`, `/business/leads`, `/business/profile`                | `business`  |
| `admin`    | `/admin`, `/admin/moderation`                                      | `moderator` |

---

## Web – Route Structure (`apps/web`)

```
src/app/
├── layout.tsx                        ← root layout (metadata, global CSS)
├── page.tsx                          ← / (public homepage – TODO: real hero)
├── globals.css
│
├── (auth)/                           ← auth route group (centred card layout)
│   ├── layout.tsx
│   ├── login/page.tsx                ← /login
│   └── register/page.tsx             ← /register
│
├── (account)/                        ← requires: any authenticated user
│   ├── layout.tsx                    ← account nav (TODO: session guard)
│   └── account/
│       ├── page.tsx                  ← /account
│       ├── listings/page.tsx         ← /account/listings
│       ├── favourites/page.tsx       ← /account/favourites
│       └── alerts/page.tsx           ← /account/alerts
│
├── (business)/                       ← requires: role = business
│   ├── layout.tsx                    ← business nav (TODO: session guard)
│   └── business/
│       ├── page.tsx                  ← /business
│       ├── leads/page.tsx            ← /business/leads
│       └── profile/page.tsx          ← /business/profile
│
└── (admin)/                          ← requires: role = admin | moderator
    ├── layout.tsx                    ← admin nav (TODO: session guard)
    └── admin/
        ├── page.tsx                  ← /admin
        └── moderation/page.tsx       ← /admin/moderation
```

### Middleware (`src/middleware.ts`)

Next.js Edge middleware intercepts requests to protected route groups and:
1. Checks for an `ek_session` cookie.
2. Parses the role from the cookie payload.
3. Compares against `ROUTE_GROUP_MIN_ROLE`.
4. Redirects to `/login?next=<path>` if unauthenticated, or `/` if insufficient role.

> **TODO**: Replace cookie-parsing stub with real JWT verification once the auth provider is chosen.

---

## API – Module Structure (`apps/api`)

```
src/
├── index.ts                          ← Express app entry, route mounting
├── config/index.ts                   ← env-var config
├── middleware/
│   ├── auth.ts                       ← authenticate(), requireRole() stubs
│   └── errors.ts                     ← global error handler, 404 handler
└── modules/
    ├── health/health.router.ts       ← GET /health
    ├── auth/auth.router.ts           ← POST /auth/register, /auth/login, /auth/logout, GET /auth/me
    ├── users/users.router.ts         ← GET /users, GET /users/:id, PATCH /users/:id
    ├── roles/roles.router.ts         ← GET /roles
    └── sessions/sessions.router.ts   ← GET /sessions, DELETE /sessions/:sessionId
```

### Key TODOs in the API

- [ ] `authenticate()` middleware: decode & verify Bearer JWT, set `req.user`
- [ ] `POST /auth/register`: validate body (zod), hash password (bcrypt), insert user, issue session
- [ ] `POST /auth/login`: validate credentials, issue signed JWT, set httpOnly cookie
- [ ] `POST /auth/logout`: invalidate session in Redis
- [ ] User model + DB layer (once schema is agreed)
- [ ] Session store (Redis)
- [ ] Rate limiting on `/auth/*` routes

---

## Shared Types (`packages/types`)

| Type           | Location          | Purpose                                      |
|----------------|-------------------|----------------------------------------------|
| `UserRole`     | `src/auth.ts`     | Union of all role strings                    |
| `AccountType`  | `src/auth.ts`     | `'personal' \| 'business'`                   |
| `AuthUser`     | `src/auth.ts`     | JWT/session payload (safe to expose)         |
| `SessionUser`  | `src/auth.ts`     | Server-side session record                   |
| `ApiResponse`  | `src/api.ts`      | `ApiSuccess<T> \| ApiError` envelope          |
| `PaginatedList`| `src/api.ts`      | Generic paginated list wrapper               |

---

## Shared Config (`packages/config`)

| Module           | Key Exports                             |
|------------------|-----------------------------------------|
| `src/roles.ts`   | `ROLES`, `ROLE_HIERARCHY`, `roleAtLeast` |
| `src/routes.ts`  | `PROTECTED_ROUTE_GROUPS`, `ROUTE_GROUP_MIN_ROLE`, `ALL_PROTECTED_PATHS` |
| `src/features.ts`| `AUTH_FEATURES` (feature flags)         |

---

## Assumptions

1. **Auth provider not yet chosen** – the middleware stubs assume a future JWT/cookie-based system; next-auth or a custom JWT implementation are both compatible with this shell.
2. **No DB schema yet** – all data-layer calls are stubbed with `TODO` comments.
3. **No real session store** – Redis integration is noted but not implemented.
4. **Role assignment on registration** – defaulting to `buyer` for personal accounts, `business` for business signups. This will be enforced in the registration endpoint.
5. **Personal vs business upgrade** – the path from `personal` → `business` account type is noted but not built (deferred to billing/boost step).

---

## Next Steps

See `NEXT-STEPS.md` for the full recommended build order.

Immediate next tasks for auth:
1. Choose and wire up auth provider (recommend: custom JWT + httpOnly cookie + Redis sessions)
2. Implement `POST /auth/register` and `POST /auth/login` with real DB
3. Replace `authenticate()` stub with real JWT verification
4. Add zod validation to all auth request bodies
5. Wire `getCurrentUser()` in web layouts to replace placeholder null
