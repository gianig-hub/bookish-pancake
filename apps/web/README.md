# apps/web — EK Marketplace Frontend

Next.js 14 App Router frontend for EK Marketplace.

## Responsibility

- Public pages (home, categories, listings, businesses)
- Auth pages (login, register)
- Protected user dashboard (/account)
- Protected business dashboard (/business — dealer/business/admin)
- Protected admin panel (/admin — admin only)
- Route protection via Next.js middleware

## Quick Start

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`.

## Auth Structure

```
src/
  app/
    (auth)/
      login/       → /login
      register/    → /register
    (protected)/
      layout.tsx   → Wraps all protected routes with RoleGuard
      account/     → /account — any authenticated user
      business/    → /business — dealer, business, admin
      admin/       → /admin — admin only
    api/
      auth/
        login/     → POST /api/auth/login
        register/  → POST /api/auth/register
        logout/    → POST /api/auth/logout
  contexts/
    AuthContext.tsx  → Client-side user/session state
  components/
    guards/
      RoleGuard.tsx  → Role-aware React component guard
  lib/
    auth/         → User creation, credential verification
    session/      → In-memory session store (server-only)
  middleware.ts   → Next.js edge middleware (route protection)
```

## TODO

- Connect auth routes to apps/api instead of in-process store
- Use HttpOnly cookies throughout (partial — login/register set cookies)
- Add password reset flow
- Add email verification
- Add OAuth / social login
- Replace in-memory stores with real DB
- Add Tailwind CSS or component library
- Add proper error boundary
