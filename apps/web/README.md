# apps/web — EK Marketplace Frontend

Next.js 15 frontend for the EK Marketplace.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, TailwindCSS
- **Types**: Shared from `@ek/types`
- **Components**: Shared from `@ek/ui`
- **Config**: Shared from `@ek/config`

## Local Setup

From the monorepo root:

```bash
# Install all dependencies
npm install

# Start development server (all services)
npm run dev

# Start only the web app
npm run dev --workspace=apps/web
```

The app will be available at `http://localhost:3000`.

## Environment Variables

See `../../.env.example` for the full list. Key variables for this app:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
```

## Structure

```
apps/web/
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Page-specific components
│   └── lib/          # Utilities and helpers
├── public/           # Static assets
├── next.config.js
├── tsconfig.json
└── package.json
```

## TODO

- [ ] Set up App Router layout
- [ ] Implement authentication (NextAuth.js)
- [ ] Create homepage
- [ ] Build listing browse page
- [ ] Build listing detail page
- [ ] Create post-an-ad flow
