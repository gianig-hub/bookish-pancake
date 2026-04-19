# apps/web — EK Marketplace Frontend

> Next.js public site and authenticated account area for EK Marketplace.

---

## Responsibility

This app is the **user-facing frontend** of the platform. It handles:

- Public browsing — homepage, category pages, listing pages, business directory
- Search — keyword and filtered search results
- Posting — the "Post an Ad" multi-step flow
- Account area — dashboard, my listings, saved searches, messages
- Business profiles — view and manage business pages
- Authentication — login, register, session management (NextAuth)

This app **does not** contain business logic. It calls `apps/api` for all data.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js (App Router) | Framework, routing, SSR/SSG |
| React | UI components |
| TailwindCSS | Styling |
| NextAuth.js | Authentication (session, OAuth, credentials) |
| TypeScript | Type safety |

---

## Folder Structure

```
apps/web/
├── src/
│   ├── app/           # Next.js App Router pages and layouts
│   ├── components/    # Page-level and shared UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # API client, auth helpers, utilities
│   └── types/         # Local type extensions (prefer packages/types)
├── public/            # Static assets (images, icons, fonts)
├── .env.local         # Local environment (copy from .env.example)
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Key Pages (Planned)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — search, featured listings, category nav |
| `/equipment` | Equipment marketplace browse |
| `/services` | Services marketplace browse |
| `/businesses` | Business directory |
| `/wanted` | Wanted ads |
| `/listings/[id]` | Listing detail page |
| `/post` | Post an Ad flow |
| `/account` | User dashboard |
| `/account/listings` | My listings |
| `/pricing` | Plans and pricing |
| `/help` | FAQ and help centre |

---

## Local Development

```bash
# From repo root
docker-compose up web

# Or run directly (requires api to be running)
cd apps/web
npm install
npm run dev
```

Available at: `http://localhost:3000`

---

## TODO

- [ ] Initialise Next.js project (`npx create-next-app@latest`)
- [ ] Configure TailwindCSS
- [ ] Set up NextAuth with credential provider
- [ ] Build homepage shell
- [ ] Connect to API via fetch client in `src/lib/api.ts`
