# packages/ui — Shared Component Library

## Responsibility

Shared React components used across the marketplace frontend.

- Keeps the design system consistent
- Avoids duplicating UI code in `apps/web`
- Built with TailwindCSS for composable styling

## What Lives Here

- **Primitives**: Button, Input, Select, Textarea, Badge, Spinner
- **Cards**: ListingCard, CategoryCard
- **Layout**: Container, Grid, PageHeader
- **Forms**: FormField, FormError
- **Feedback**: Alert, Toast, EmptyState

## Usage

```tsx
import { Button, ListingCard } from '@ek/ui';

<Button variant="primary" onClick={handleClick}>
  Post a Listing
</Button>
```

## Design Principles

- Mobile-first responsive design
- TailwindCSS utility classes only (no custom CSS files)
- Accessible (ARIA attributes, keyboard navigation)
- Minimal dependencies (no heavy component library)

## Development

```bash
cd packages/ui
npm run build
```

> Note: Phase 1 — start with simple, functional components.
> Polish and accessibility refinements come in Phase 2.
