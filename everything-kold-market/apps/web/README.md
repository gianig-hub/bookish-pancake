# apps/web — EK Marketplace Frontend

Next.js 14 frontend application for EK Marketplace.

## Development

```bash
# From monorepo root
npm run dev

# Or directly
cd apps/web
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).

## Stack
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- TypeScript (strict)

## Structure

```
apps/web/
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Page-specific components
│   └── lib/          # Client utilities
└── public/           # Static assets
```

## Environment Variables

Copy `.env.example` from the root and fill in:
- `NEXT_PUBLIC_API_URL` — API base URL
- `NEXTAUTH_URL` — Full URL of this app
- `NEXTAUTH_SECRET` — Random secret for NextAuth

## TODO
- [ ] App Router pages (home, browse, listing detail)
- [ ] NextAuth authentication
- [ ] TailwindCSS global styles
- [ ] Layout components
