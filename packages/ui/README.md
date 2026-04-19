# packages/ui — Shared UI Components

Shared React component library for Kold Market. Used by `apps/web` to build consistent, reusable UI across all pages and flows.

> **Phase 1**: Use basic Tailwind classes directly in the web app. Move components here as they stabilise and are reused across multiple pages.

---

## Responsibility

- Provides reusable, styled React components
- Keeps visual consistency across the marketplace
- Reduces duplication in `apps/web`
- Separates presentational logic from page logic

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React | Component framework |
| TailwindCSS | Utility-first styling |
| TypeScript | Type-safe component props |

---

## Key Exports

```typescript
// Layout
export { Button }         // Primary, secondary, ghost variants
export { Card }           // Listing cards, business cards
export { Modal }          // Dialog overlays
export { Drawer }         // Mobile side panel

// Forms
export { Input }          // Text input, textarea
export { Select }         // Dropdown select
export { Checkbox }       // Checkbox with label
export { ImageUpload }    // Image upload control

// Listings
export { ListingCard }    // Compact listing preview
export { ListingBadge }   // Status/type badge (For Sale, Wanted, etc.)
export { PriceTag }       // Formatted price display

// Filters
export { CategoryFilter } // Category sidebar/pills
export { SearchBar }      // Search input with suggestions

// Feedback
export { Alert }          // Success, error, warning, info
export { Spinner }        // Loading indicator
export { EmptyState }     // Empty search/category state
```

---

## Usage

```typescript
// In apps/web
import { Button, ListingCard, SearchBar } from "@koldmarket/ui";
```

---

## Dependencies

- Requires React and TailwindCSS in the consuming app
- Uses `packages/types` for prop type definitions

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [apps/web](../../apps/web/README.md)
- [packages/types](../types/README.md)
