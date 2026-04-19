# packages/ui — EK Marketplace Shared Component Library

## Responsibility

The `ui` package is the **shared React component library** for EK Marketplace. It contains all reusable UI components used across the `apps/web` frontend.

By centralising components here, the design system stays consistent and components are easy to find, test, and maintain.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React | Component framework |
| TailwindCSS | Utility-first styling |
| TypeScript | Type-safe components |
| Storybook (Phase 2+) | Component documentation and visual testing |

---

## Package Structure

```
packages/ui/
  src/
    components/
      layout/
        Container.tsx
        Section.tsx
        Grid.tsx
      navigation/
        Header.tsx
        Footer.tsx
        Breadcrumb.tsx
        Tabs.tsx
      listings/
        ListingCard.tsx       # Listing preview card (grid/list view)
        ListingGrid.tsx       # Responsive listing grid
        ListingBadge.tsx      # Condition, type, boost badges
        ListingPrice.tsx      # Price display (with currency)
        ListingImageGallery.tsx
      forms/
        Input.tsx
        Textarea.tsx
        Select.tsx
        Checkbox.tsx
        RadioGroup.tsx
        FileUpload.tsx
        FormField.tsx         # Label + input + error wrapper
      search/
        SearchBar.tsx
        FilterPanel.tsx
        CategoryFilter.tsx
        LocationFilter.tsx
      buttons/
        Button.tsx
        IconButton.tsx
        LinkButton.tsx
      feedback/
        Alert.tsx
        Badge.tsx
        Spinner.tsx
        Skeleton.tsx
        Toast.tsx
        EmptyState.tsx
      modals/
        Modal.tsx
        ConfirmDialog.tsx
      business/
        BusinessCard.tsx
        BusinessBadge.tsx     # Verified, featured badges
  index.ts                    # Re-exports all components
  package.json
  tsconfig.json
  tailwind.config.ts          # Shared Tailwind config (extended by apps)
```

---

## Usage (from apps)

```tsx
import { ListingCard, Button, SearchBar, FilterPanel } from '@ek/ui';

export default function ListingsPage() {
  return (
    <div>
      <SearchBar placeholder="Search listings..." />
      <FilterPanel categories={categories} />
      <div className="grid grid-cols-3 gap-4">
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
```

---

## Design Tokens

The shared Tailwind config defines the EK Marketplace design system:

```
Colours:
  Primary: Blue (marketplace trust)
  Accent: Orange (CTAs, boosts)
  Success: Green
  Warning: Amber
  Error: Red
  Neutral: Grey scale

Typography:
  Font: Inter (web-safe stack)
  Heading sizes: text-2xl, text-xl, text-lg
  Body: text-base, text-sm

Spacing:
  Based on Tailwind 4-unit scale
```

---

## Component Conventions

- All components use named exports (no default exports)
- All components accept `className` prop for extension
- All interactive components are keyboard accessible
- All form elements have proper label associations
- Images always have `alt` text props

---

## Status

> **Placeholder — ready for Phase 1 implementation.**
> Next: Build `ListingCard`, `Button`, `Input`, `FormField` first — needed for homepage and post-ad form.
