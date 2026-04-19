# packages/ui — Shared UI Component Library

## Responsibility

Shared React UI components used by `apps/web`.

Built with the EK Marketplace design system in mind — clean, professional, and trade-industry appropriate.

## What It Contains

- **Base components** — Button, Input, Select, Textarea, Checkbox, Badge, Tag
- **Layout components** — Container, Grid, Stack, Divider
- **Navigation** — Navbar, Footer, Breadcrumb, Pagination
- **Cards** — ListingCard, BusinessCard, WantedAdCard
- **Forms** — Form wrappers, field groups, validation display
- **Modals and Drawers** — Dialog, Confirmation modal, Side drawer
- **Feedback** — Alert, Toast notification, Loading spinner, Empty state
- **AI UI** — AI suggestion panels, prompt input, suggestion chips

## Design Principles

- Built on **Tailwind CSS** utility classes
- Components should be **accessible** (ARIA-compliant)
- Keep components **generic and reusable** — avoid baking in marketplace business logic
- Export from a single index for clean imports: `import { Button } from '@ek-marketplace/ui'`

## Status

🚧 **Placeholder — UI library not yet implemented.**
