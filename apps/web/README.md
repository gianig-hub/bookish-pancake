# apps/web — Next.js Frontend

## Responsibility

The **web** app is the user-facing marketplace interface. It handles:

- Browsing and searching listings
- Viewing listing detail pages
- Posting and managing listings (authenticated)
- User registration and login
- Account and settings pages
- Category and subcategory pages

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | React framework |
| TailwindCSS | Styling |
| NextAuth.js | Authentication |
| React Query | Server state management |
| Zod | Form validation |

## Structure

```
apps/web/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout (header, footer)
│   │   ├── page.tsx          # Homepage
│   │   ├── listings/         # Listings browse & detail
│   │   ├── post/             # Post a listing
│   │   ├── account/          # User account pages
│   │   └── api/              # Next.js API routes (NextAuth)
│   ├── components/           # Page-specific components
│   └── lib/                  # Utilities, API client, auth helpers
├── public/                   # Static assets
├── package.json
├── tsconfig.json
└── next.config.js
```

## Key Pages

| Route | Description |
|-------|------------|
| `/` | Homepage — featured listings |
| `/listings` | Browse all listings with filters |
| `/listings/:id` | Single listing detail |
| `/post` | Post a listing (auth required) |
| `/account` | Account dashboard (auth required) |
| `/account/listings` | My listings (auth required) |

## Development

```bash
# From repo root
npm run dev

# Or directly
cd apps/web
npm run dev
```

Runs at: http://localhost:3000

## Environment Variables

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Connects To

- **API**: `apps/api` at `http://localhost:4000`
- **Shared types**: `packages/types`
- **Shared UI components**: `packages/ui`
- **Shared config**: `packages/config`
