# apps/web — Frontend Application

## Responsibility

This is the **main user-facing web application** for the EK Marketplace platform.

It handles:

- Public marketplace pages (home, categories, listings, services, businesses, wanted ads)
- SEO-optimised static and server-rendered pages
- User authentication, registration, and account area
- Listing creation and management (post an ad flow)
- Business profiles and dashboards
- AI-assisted search interface and listing tools
- Subscription and boost purchasing
- FAQ / Help Center

## Tech Direction

- **Framework:** Next.js (App Router, SSR + SSG)
- **Styling:** Tailwind CSS
- **UI Components:** `packages/ui`
- **API Communication:** REST calls to `apps/api`
- **AI Features:** via `packages/ai` or direct API calls to worker endpoints

## Structure

```
apps/web/
├── src/
│   ├── app/          # Next.js App Router pages and layouts
│   ├── components/   # Page-level and feature components
│   ├── lib/          # Utilities, API clients, helpers
│   └── styles/       # Global styles
├── public/           # Static assets
├── package.json
└── README.md
```

## Status

🚧 **Placeholder — not yet scaffolded.**

Run the project scaffolding step when ready to initialise Next.js here.
