# packages/ui — KoldMarket Shared UI Components

Shared React component library used by `apps/web`.

---

## Responsibility

This package provides **reusable UI components** consistent with the KoldMarket design:

- Layout components (Container, Grid, Stack)
- Form components (Input, Select, Textarea, Button, FileUpload)
- Listing components (ListingCard, ListingGrid, PriceDisplay)
- Navigation (Breadcrumb, Tabs, Pagination)
- Feedback components (Badge, Alert, Spinner, Toast)
- Modal and overlay components

Having shared components prevents style inconsistency and reduces duplication across marketplace pages.

---

## Usage

```typescript
import { Button, ListingCard, Badge } from '@koldmarket/ui'

export default function ListingPage() {
  return (
    <div>
      <Badge variant="condition" value="Used" />
      <ListingCard listing={listing} />
      <Button variant="primary">Contact Seller</Button>
    </div>
  )
}
```

---

## Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── ListingCard.tsx
│   │   └── ...
│   └── index.ts        # Re-exports all components
└── README.md
```

---

## Conventions

- Components use Tailwind CSS classes (same as `apps/web`)
- Each component is exported from `index.ts` with a named export
- Props are fully typed using `@koldmarket/types` where applicable
- Components should be accessible (ARIA labels, keyboard support)
- Keep components focused — one responsibility per component
