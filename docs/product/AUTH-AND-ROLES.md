# Auth & Roles — EK Marketplace

> **Status:** Auth shell complete (in-memory placeholder).
> Real DB, email verification, and OAuth are not yet built.

---

## Overview

EK Marketplace uses **email/password authentication** with a **role-based access model**.

Sessions are currently stored **in-memory** on the server. This resets on restart and does not scale across multiple processes. It is intentional at this stage — see [TODO](#todo).

---

## Roles

| Role             | Description                                             | Default |
| ---------------- | ------------------------------------------------------- | ------- |
| `buyer`          | Can browse, save listings, message sellers              | ✅ Yes  |
| `private_seller` | Can post personal ads (not trade)                       |         |
| `trader`         | Can post trade-level ads                                |         |
| `dealer`         | Full business listing + business dashboard access       |         |
| `business`       | Business dashboard (service providers, suppliers)       |         |
| `admin`          | Full platform access — assigned manually, not at signup |         |

**Admin accounts are not available at self-registration.** They must be assigned by an existing admin or by seeding the database.

---

## Auth Flow

### Registration

1. User submits email, password, name (optional), and account type
2. POST `/api/auth/register` or `/api/v1/auth/register`
3. Password hashed with bcrypt (12 rounds)
4. User created in store (in-memory → TODO: PostgreSQL)
5. Session created, session ID returned
6. Session ID stored in HttpOnly cookie (`ek_session`) + `ek_role` cookie

### Login

1. User submits email and password
2. POST `/api/auth/login` or `/api/v1/auth/login`
3. Credentials verified (email lookup + bcrypt compare)
4. Session created, session ID returned in response + cookies

### Logout

1. POST `/api/auth/logout`
2. Session deleted from store
3. Cookies cleared

### Session Validation

- Session ID is read from the `ek_session` HttpOnly cookie
- Validated against the in-memory session store
- If expired or missing → redirect to `/login`

---

## Route Protection

### Web (Next.js Middleware)

`apps/web/src/middleware.ts` runs on every request to protected paths.

| Path         | Auth required | Role required                |
| ------------ | ------------- | ---------------------------- |
| `/account/*` | ✅ Yes        | Any authenticated user       |
| `/business/*`| ✅ Yes        | `dealer`, `business`, `admin`|
| `/admin/*`   | ✅ Yes        | `admin` only                 |

Unauthorised users are redirected to `/login?redirect=<path>`.
Role-insufficient users are redirected to `/forbidden`.

### API (Express Middleware)

`apps/api/src/middleware/auth.ts` provides two middlewares:

```ts
requireAuth        // rejects unauthenticated requests
requireRole([...]) // rejects requests with insufficient role
```

Usage:

```ts
router.get('/admin/users', requireAuth, requireRole(['admin']), handler);
```

### Client Components (React)

`apps/web/src/components/guards/RoleGuard.tsx` provides:

```tsx
<RoleGuard roles={['admin']}>  // Renders children if user.role is in roles
<AdminGuard>                   // admin only
<BusinessGuard>                // dealer, business, admin
```

---

## Session Storage

**Current:** In-memory `Map<string, Session>` on the server.

**Limitations:**
- Resets on server restart
- Does not work with multiple API processes
- Not suitable for production

**TODO:** Replace with Redis session store or database-backed sessions.

---

## Security Notes

- Passwords are hashed with **bcrypt** (12 rounds)
- Session IDs are **random UUIDs** (no predictable sequence)
- Auth responses use **identical error messages** for wrong-email and wrong-password (prevents enumeration)
- Cookies are set with `httpOnly: true`, `sameSite: 'lax'`, `secure: true` in production
- Role cookie (`ek_role`) is used by the middleware for role checks — this is a placeholder and should be replaced with a signed JWT or server-side role lookup

---

## TODO

- [ ] Replace in-memory user store with PostgreSQL (Prisma)
- [ ] Replace in-memory session store with Redis
- [ ] Add email verification on registration
- [ ] Add password reset flow
- [ ] Add OAuth / social login (Google — most useful for UK market)
- [ ] Sign the `ek_role` cookie or replace with server-side session lookup
- [ ] Add rate limiting on auth endpoints (express-rate-limit)
- [ ] Add CSRF protection (Next.js route handlers)
- [ ] Add account deletion / GDPR right-to-erasure endpoint

---

## Files

| File | Purpose |
|------|---------|
| `packages/types/src/auth.ts` | Shared types: `UserRole`, `User`, `Session`, `LoginInput`, `RegisterInput` |
| `apps/web/src/middleware.ts` | Next.js route protection |
| `apps/web/src/lib/auth/index.ts` | User store + credential helpers (web-side placeholder) |
| `apps/web/src/lib/session/store.ts` | In-memory session store (web-side) |
| `apps/web/src/contexts/AuthContext.tsx` | Client-side user state |
| `apps/web/src/components/guards/RoleGuard.tsx` | React role guard components |
| `apps/web/src/app/(auth)/login/page.tsx` | Login form |
| `apps/web/src/app/(auth)/register/page.tsx` | Register form |
| `apps/web/src/app/(protected)/layout.tsx` | Protected route group layout |
| `apps/api/src/lib/users.ts` | User store + credential helpers (API-side) |
| `apps/api/src/lib/session.ts` | In-memory session store (API-side) |
| `apps/api/src/middleware/auth.ts` | Express auth + role middleware |
| `apps/api/src/routes/auth.ts` | Auth route handlers |
