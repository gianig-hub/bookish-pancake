# apps/web

EK Marketplace — Frontend Application

## Technology

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **@ek/types** and **@ek/config** for shared types and constants

> TODO: Initialise with `npx create-next-app@latest` using the App Router template when starting development.

---

## Folder Structure

```
src/
  app/                      ← Next.js App Router root
    layout.tsx              ← Root layout (fonts, providers)
    page.tsx                ← Home page /
    
    (public)/               ← Public pages (no auth required)
      listings/             ← /listings — browse all equipment
      services/             ← /services — browse services
      businesses/           ← /businesses — business directory
      wanted/               ← /wanted — wanted ads board
      guides/               ← /guides — guides and blog
      pricing/              ← /pricing — subscription plans
      about/                ← /about
      contact/              ← /contact
      faq/                  ← /faq — frequently asked questions
      
    (auth)/                 ← Auth pages (redirect if already logged in)
      login/                ← /login
      register/             ← /register
      forgot-password/      ← /forgot-password
      reset-password/       ← /reset-password
      
    (account)/              ← Account dashboard (auth required, any role)
      account/
        page.tsx            ← /account — dashboard overview
        listings/           ← /account/listings — my listings
        favourites/         ← /account/favourites — saved listings
        alerts/             ← /account/alerts — saved search alerts
        messages/           ← /account/messages — inbox
        subscription/       ← /account/subscription — plan management
        settings/           ← /account/settings — profile & preferences
        
    (seller)/               ← Seller area (seller roles only)
      seller/
        post/               ← /seller/post — post a new listing
        edit/[id]/          ← /seller/edit/[id] — edit a listing
        
    (business)/             ← Business area (business/dealer/trader roles)
      business/
        page.tsx            ← /business — business dashboard
        leads/              ← /business/leads — incoming leads/enquiries
        profile/            ← /business/profile — edit business profile
        analytics/          ← /business/analytics — TODO: Phase 4
        
    (admin)/                ← Admin panel (admin role only)
      admin/
        page.tsx            ← /admin — admin overview
        moderation/         ← /admin/moderation — listing/content moderation queue
        users/              ← /admin/users — user management
        settings/           ← /admin/settings — platform settings
        
  components/               ← Shared UI components
    layout/                 ← Header, Footer, Nav, Sidebar
    ui/                     ← Buttons, Cards, Forms, Inputs
    auth/                   ← LoginForm, RegisterForm, AuthGuard
    listings/               ← ListingCard, ListingGrid
    
  lib/                      ← Utilities and helpers
    auth.ts                 ← Auth helpers / session utilities
    api.ts                  ← API client wrapper
    utils.ts                ← General utilities
    
  types/                    ← App-local types (extend @ek/types here)
  
  middleware.ts             ← Next.js middleware (route protection)
```

---

## Route Areas

| Area | Path Prefix | Auth Required | Roles |
|------|-------------|---------------|-------|
| Public | `/`, `/listings`, `/services`, etc. | No | All |
| Auth | `/login`, `/register` | No (redirect if authed) | — |
| Account | `/account/*` | Yes | Any role |
| Seller | `/seller/*` | Yes | seller roles |
| Business | `/business/*` | Yes | business/dealer/trader/admin |
| Admin | `/admin/*` | Yes | admin only |

See `packages/config/src/routes.ts` for the full route protection config.

---

## Environment Variables

Copy `.env.example` from the repo root and rename to `.env.local`.

Key variables for the web app:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
```

---

## Getting Started

```bash
# From repo root
npm install

# Run web app only
npm run dev --workspace=apps/web
```

> TODO: Add Next.js App Router initialisation and route files once app scaffold is bootstrapped.

## TODOs

- [ ] Initialise Next.js project (`npx create-next-app@latest`)
- [ ] Add Tailwind CSS config
- [ ] Implement `middleware.ts` using `packages/config` route guards
- [ ] Build root layout with header/footer placeholders
- [ ] Create all route page.tsx placeholder files
- [ ] Add NextAuth.js (or equivalent) for session handling
- [ ] Wire up `@ek/types` SessionUser to Next.js session types
