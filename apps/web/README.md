# apps/web — KoldMarket Frontend

The marketplace web application. Built with Next.js 14 (App Router).

---

## Responsibility

This app is the **public-facing marketplace UI**. It handles:

- Homepage and marketing pages
- Equipment listing browse and search
- Individual listing pages
- Wanted ads browse/post
- Services marketplace browse/post
- Business directory browse
- User registration, login, and account area
- AI-assisted ad posting flow
- Responsive layout for desktop and mobile

It communicates with `apps/api` for all data.

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) — React framework with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS
- [NextAuth.js](https://next-auth.js.org/) — authentication
- Shared components from `packages/ui`
- Shared types from `packages/types`

---

## Local Development

```bash
# From repo root (recommended — starts all services)
docker-compose up

# Or run web app only (requires API already running)
cd apps/web
npm run dev
# → http://localhost:3000
```

---

## Structure

```
apps/web/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout (fonts, global styles, nav)
│       ├── page.tsx        # Homepage
│       ├── (auth)/         # Login, register pages
│       ├── equipment/      # Browse listings, listing detail
│       ├── services/       # Services marketplace
│       ├── businesses/     # Business directory
│       ├── wanted/         # Wanted ads
│       ├── post/           # Post an ad (multi-step)
│       └── account/        # My listings, profile, subscription
├── public/                 # Static assets
├── Dockerfile.dev          # Development container
├── package.json
└── tsconfig.json
```

---

## Environment Variables

See `.env.example` in the repo root. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

Key variables:
- `NEXT_PUBLIC_API_URL` — URL of the API service
- `NEXTAUTH_URL` — Public URL of this app (for auth callbacks)
- `NEXTAUTH_SECRET` — Random secret for session encryption
