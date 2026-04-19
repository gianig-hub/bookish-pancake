# packages/ui

EK Marketplace — Shared UI Component Library

## Purpose

Centralises reusable React components used across `apps/web` (and potentially any future admin app), preventing duplication and ensuring visual consistency.

## Technology

- **React** + **TypeScript**
- **Tailwind CSS** (via shared config)

> TODO: Initialise with a component library scaffold (Storybook optional).

---

## Planned Components

### Layout
- `Header` — main site navigation with auth-aware links
- `Footer` — site links, legal, social
- `Sidebar` — account/dashboard side navigation
- `PageContainer` — consistent max-width page wrapper

### UI Primitives
- `Button` — primary, secondary, ghost, danger variants
- `Input` — text, email, password with validation state
- `Select` — dropdown
- `Checkbox`, `Radio`
- `Badge` — role/status labels
- `Alert` — success, warning, error, info banners
- `Spinner` / `Skeleton` — loading states
- `Modal` / `Dialog`

### Marketplace
- `ListingCard` — compact listing preview
- `ListingGrid` — responsive grid of ListingCards
- `BusinessCard` — business directory card
- `CategoryPill` — clickable category filter

### Auth
- `LoginForm`
- `RegisterForm`
- `AuthGuard` — client-side wrapper that redirects unauthenticated users

---

## Usage

```tsx
import { Button, ListingCard } from '@ek/ui';
```

---

## TODOs

- [ ] Initialise package with React + TypeScript + Tailwind
- [ ] Build Button and Input primitives first
- [ ] Add Storybook for component documentation (optional, post-MVP)
- [ ] Create ListingCard once listing data shape is defined
