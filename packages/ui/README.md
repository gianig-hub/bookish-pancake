# packages/ui — Shared Component Library

## Responsibility

This package is the **shared React component library** for EK Marketplace.

It contains reusable UI components used by `apps/web`. Components are built with React and styled with TailwindCSS.

---

## Why a Shared Component Library?

- Components are defined once and used consistently across the marketplace
- Style updates (colours, spacing, typography) propagate everywhere
- Onboarding designers or frontend developers is easier with documented components
- Components can be replaced or upgraded without touching page code

---

## Folder Structure (Planned)

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button/           # Primary, secondary, danger variants
│   │   ├── Card/             # Listing card, business card
│   │   ├── Badge/            # Status badges, category labels
│   │   ├── Input/            # Text, select, textarea, file upload
│   │   ├── Modal/            # Confirmation, full-screen modals
│   │   ├── Pagination/       # Page navigation
│   │   ├── SearchBar/        # Search input with filters
│   │   ├── ListingCard/      # Marketplace listing preview card
│   │   ├── BusinessCard/     # Business directory card
│   │   └── EmptyState/       # No results, no listings states
│   ├── hooks/                # Shared UI hooks (useModal, useToast)
│   └── index.ts              # Re-exports all components
├── tsconfig.json
└── package.json
```

---

## Tech Stack

- **React 18+**
- **TypeScript**
- **TailwindCSS** for styling
- Components are unstyled by default (use Tailwind class props where appropriate)

---

## Usage

```typescript
import { Button, ListingCard, Badge } from '@ek/ui';

<Button variant="primary" onClick={handlePost}>
  Post Ad
</Button>

<ListingCard
  title="True T-49 Commercial Fridge"
  price={450}
  location="London"
  condition="used"
  imageUrl="/images/fridge.jpg"
/>
```

---

## Design Principles

- Components are **generic** — no marketplace-specific business logic inside components
- Components accept **props for all configurable behaviour** — no hardcoded strings
- Components are **accessible** — use semantic HTML, ARIA labels where needed
- Components are **responsive** — mobile-first by default

---

## TODO

- [ ] Set up package with TypeScript + TailwindCSS
- [ ] Create `Button` component (primary, secondary, danger, outline variants)
- [ ] Create `Card` component
- [ ] Create `Badge` component (status, category)
- [ ] Create `Input` component (text, select, textarea)
- [ ] Create `ListingCard` component
- [ ] Create `EmptyState` component
- [ ] Export all components from `index.ts`
