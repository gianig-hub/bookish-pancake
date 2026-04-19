# apps/web — Next.js Frontend

The user-facing web application for Kold Market — an AI-first UK marketplace for AC, refrigeration, cold rooms, freezer rooms, parts, tools, and services.

---

## Responsibility

- Renders all public and authenticated pages (listings, search, businesses, wanted ads, services)
- Handles user authentication via NextAuth
- Communicates with the API at `api.koldmarket.co.uk`
- Delivers SEO-optimised pages for category, listing, and business routes

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14+ | Framework (App Router, SSR/SSG) |
| React | UI layer |
| TailwindCSS | Styling |
| NextAuth.js | Authentication (email, social) |
| TypeScript | Type safety (via `packages/types`) |

---

## Key Features

- Browse listings by category (AC, refrigeration, cold rooms, etc.)
- Search and filter equipment, parts, tools
- Post a listing (for sale, wanted, hire)
- Business directory pages
- User account dashboard (my listings, favourites, alerts)
- Admin moderation dashboard
- AI-assisted listing creation (Phase 2+)

---

## Structure

```
apps/web/
├── src/
│   └── app/          # Next.js App Router pages
│       └── page.tsx  # Placeholder homepage
├── public/           # Static assets
├── next.config.js    # Next.js config (to be created)
├── tailwind.config.js # TailwindCSS config (to be created)
├── package.json      # App dependencies (to be created)
└── README.md
```

---

## Environment Variables

See `.env.example` at repo root. Key vars for this app:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Dependencies

- Requires `apps/api` to be running for data
- Uses shared types from `packages/types`
- Uses shared components from `packages/ui` (Phase 1+ builds this up)
- Uses shared config from `packages/config`

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [packages/ui](../../packages/ui/README.md)
- [packages/types](../../packages/types/README.md)
