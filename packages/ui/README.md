# packages/ui — Shared Component Library

> React component library for EK Marketplace. Built with TailwindCSS. Used by `apps/web`.

---

## Purpose

This package provides a set of **reusable, consistent UI components** that form the visual language of EK Marketplace. It prevents:

- duplicated button/card/form code across pages
- inconsistent styling decisions
- one-off components that drift from the design system

---

## What This Package Exports

### Core Components

| Component | Purpose |
|-----------|---------|
| `Button` | Primary, secondary, ghost, danger variants |
| `Card` | Container for listings, businesses, content blocks |
| `Input` | Text input with label, error state, helper text |
| `Select` | Dropdown select with label and error state |
| `Textarea` | Multi-line text input |
| `Badge` | Status badges (active, pending, featured, etc.) |
| `Modal` | Accessible dialog overlay |
| `Spinner` | Loading indicator |
| `Alert` | Info, success, warning, error messages |

### Marketplace-Specific Components

| Component | Purpose |
|-----------|---------|
| `ListingCard` | Compact listing preview for category pages |
| `BusinessCard` | Business directory card |
| `CategoryPill` | Clickable category filter tag |
| `PriceTag` | Formatted price display |
| `ImageGallery` | Listing image carousel |
| `SearchBar` | Search input with category selector |

---

## Folder Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── core/         # Buttons, inputs, modals, badges
│   │   └── marketplace/  # Listing cards, business cards, search bar
│   ├── styles/           # Base Tailwind utilities and class helpers
│   └── index.ts          # Re-exports all components
├── package.json
└── tsconfig.json
```

---

## Usage

```tsx
import { Button, ListingCard } from '@ek/ui';

export function ListingGrid({ listings }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
```

---

## Rules

- Components are **presentational only** — no API calls, no routing
- Props should use types from `@ek/types` where the data matches
- All components must be accessible (ARIA labels, keyboard nav)
- Use TailwindCSS classes — do not add custom CSS files

---

## TODO

- [ ] Initialise package with TailwindCSS peer dependency
- [ ] Build `Button`, `Card`, `Input` core components
- [ ] Build `ListingCard` component
- [ ] Add Storybook for visual component testing (Phase 2)
