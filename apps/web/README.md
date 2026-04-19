# apps/web — EK Marketplace Frontend

## Responsibility

This app is the **public-facing and account Next.js frontend** for EK Marketplace.

It serves:
- The public website (homepage, category pages, listing pages, search, business directory, wanted ads)
- The account area (my listings, favourites, alerts, profile, subscription)
- Static pages (About, Pricing, FAQ, Help Center, Contact)

It does **not** contain any business logic, database access, or AI calls. All data comes from `apps/api`.

---

## Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **TailwindCSS** for styling
- **NextAuth.js** for authentication
- **React Query** (or SWR) for data fetching
- Shared components from `packages/ui`
- Shared types from `packages/types`

---

## Folder Structure

```
apps/web/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (public)/     # Public pages (no auth required)
│   │   ├── (account)/    # Account pages (auth required)
│   │   └── api/          # Next.js API routes (auth callbacks only)
│   ├── components/       # Page-specific components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities (API client, auth config, etc.)
│   └── styles/           # Global styles
├── public/               # Static assets (favicon, og images, etc.)
├── Dockerfile            # Production multi-stage build (TODO)
├── next.config.js        # Next.js configuration (TODO)
├── tailwind.config.js    # Tailwind configuration (TODO)
├── tsconfig.json         # TypeScript configuration (TODO)
└── package.json          # Dependencies (TODO)
```

---

## Connects To

- `apps/api` — all data fetching and mutations
- `packages/ui` — shared components
- `packages/types` — shared TypeScript types

---

## Environment Variables

See `.env.example` at the root for required variables. Key ones for this app:

```
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SITE_NAME
NEXTAUTH_URL
NEXTAUTH_SECRET
```

---

## Local Development

```bash
# From repo root (with Docker Compose)
docker-compose up web

# Or standalone (requires api to be running separately)
cd apps/web
npm install
npm run dev
```

---

## TODO

- [ ] Initialise Next.js app (`npx create-next-app@latest`)
- [ ] Configure TailwindCSS
- [ ] Set up NextAuth.js
- [ ] Create homepage shell
- [ ] Set up API client (fetch wrapper with auth headers)
- [ ] Create `Dockerfile` for production build
