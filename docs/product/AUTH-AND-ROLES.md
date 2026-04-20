# Auth & Roles — EK Marketplace

## Overview

This document describes the authentication model, user roles, and protected route structure for the EK Marketplace MVP.

---

## User Roles

| Role         | Description                                            |
|--------------|--------------------------------------------------------|
| `guest`      | Unauthenticated visitor. Browse-only access.           |
| `buyer`      | Registered user. Can save favourites and set alerts.   |
| `seller`     | Can create listings (for parts, equipment, etc.).      |
| `business`   | Business account. Unlocks leads, profile, boosts.      |
| `admin`      | Internal moderator. Access to admin dashboard.         |
| `super_admin`| Full platform access. Reserved for core team.          |

Roles are hierarchical — each higher role includes all privileges of lower roles.

---

## Account Types

| Type       | Description                                          |
|------------|------------------------------------------------------|
| `personal` | Default for individual buyers and private sellers.   |
| `business` | Businesses listing services, equipment, or cold rooms. Required for `/business` routes. |

---

## Protected Route Map

| Route                    | Minimum Role |
|--------------------------|-------------|
| `/account`               | `buyer`     |
| `/account/listings`      | `seller`    |
| `/account/favourites`    | `buyer`     |
| `/account/alerts`        | `buyer`     |
| `/business`              | `business`  |
| `/business/leads`        | `business`  |
| `/business/profile`      | `business`  |
| `/admin`                 | `admin`     |
| `/admin/moderation`      | `admin`     |

Public routes (no auth): `/`, `/login`, `/register`, `/browse`, `/listing/:id`

---

## Auth Flow (Planned)

```
1. User visits /register → fills email + password + account type
2. POST /api/auth/register → user created with role=buyer (default)
3. Verification email sent (if EMAIL_VERIFICATION_REQUIRED=true)
4. User clicks link → email verified
5. POST /api/auth/login → JWT issued, stored in httpOnly cookie
6. Subsequent requests → JWT decoded by middleware → req.user populated
7. Protected routes check req.user.role against PROTECTED_ROUTES map
```

---

## API Modules

| Module       | Routes                                                    |
|--------------|-----------------------------------------------------------|
| `auth`       | POST /register, POST /login, POST /logout, POST /refresh  |
| `users`      | GET /me, PUT /me, GET / (admin)                           |
| `roles`      | GET / (public)                                            |
| `sessions`   | GET /me, DELETE /me                                       |
| `health`     | GET /health                                               |

---

## Auth Feature Flags

Controlled via `AUTH_FLAGS` in `packages/config/src/auth.ts`:

| Flag                          | Default | Notes                                    |
|-------------------------------|---------|------------------------------------------|
| `EMAIL_LOGIN_ENABLED`         | `true`  | Email/password login                     |
| `SOCIAL_LOGIN_ENABLED`        | `false` | Google etc. — not implemented yet        |
| `MAGIC_LINK_ENABLED`          | `false` | Not implemented yet                      |
| `EMAIL_VERIFICATION_REQUIRED` | `true`  | Require email confirmation on sign-up    |
| `TWO_FACTOR_ENABLED`          | `false` | Not implemented yet                      |
| `GUEST_BROWSE_ENABLED`        | `true`  | Allow unauthenticated browsing           |
| `SELF_SERVICE_BUSINESS_UPGRADE` | `false` | Needs upgrade flow before enabling     |

---

## Unfinished / TODOs

- [ ] Real JWT verification in `apps/api/src/middleware/auth.ts`
- [ ] Password hashing (bcrypt) in `apps/api/src/auth/auth.router.ts`
- [ ] Database integration for user persistence
- [ ] Email verification flow
- [ ] Refresh token rotation
- [ ] Session utility in `apps/web/src/lib/auth/session.ts`
- [ ] Middleware guard wiring in Next.js (`middleware.ts`)
- [ ] Role check hook for client-side (`useSession`, `useRole`)
- [ ] Admin user seeding script

---

## Next Steps

See `NEXT-STEPS.md` for the recommended build order after this auth shell.
