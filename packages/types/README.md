# packages/types — Shared TypeScript Types

> Single source of truth for all TypeScript types, interfaces, and enums used across the EK Marketplace monorepo.

---

## Purpose

This package ensures that `apps/web`, `apps/api`, and `apps/worker` all agree on the shape of core data structures. Without shared types:

- API responses and frontend expectations drift out of sync
- Refactoring requires changes in multiple places
- Type safety breaks at app boundaries

With shared types:
- One change to `User` or `Listing` propagates everywhere
- API responses and frontend data are always aligned
- Onboarding new developers is faster

---

## What This Package Exports

| Type / Interface | Description |
|-----------------|-------------|
| `User` | Platform user — id, email, role, plan |
| `UserRole` | Enum: buyer, seller, business, admin |
| `Listing` | Marketplace listing — title, description, category, price, status |
| `ListingStatus` | Enum: draft, pending, active, expired, rejected |
| `ListingType` | Enum: for_sale, wanted, service_request, hire |
| `Business` | Business profile — name, categories, location |
| `Category` | Marketplace category tree |
| `Enquiry` | Message/enquiry from buyer to seller |
| `Plan` | Subscription plan definition |
| `BoostType` | Listing boost types |
| `ApiResponse<T>` | Standard API response wrapper |
| `PaginatedResponse<T>` | Paginated list response |

---

## Folder Structure

```
packages/types/
├── src/
│   ├── user.ts          # User, UserRole, UserPlan
│   ├── listing.ts       # Listing, ListingStatus, ListingType
│   ├── business.ts      # Business, BusinessCategory
│   ├── enquiry.ts       # Enquiry, Message
│   ├── api.ts           # ApiResponse<T>, PaginatedResponse<T>
│   ├── plan.ts          # Plan, BoostType
│   └── index.ts         # Re-exports all types
├── package.json
└── tsconfig.json
```

---

## Usage

```typescript
import type { Listing, ListingStatus } from '@ek/types';

function updateListingStatus(listing: Listing, status: ListingStatus): Listing {
  return { ...listing, status };
}
```

---

## Rules

- This package contains **types only** — no runtime code, no utilities
- Types must reflect the **agreed data contract**, not database internals
- When the database schema changes, update types here first, then fix downstream errors

---

## TODO

- [ ] Initialise package
- [ ] Define `User` and `UserRole` types
- [ ] Define `Listing`, `ListingStatus`, `ListingType` types
- [ ] Define `ApiResponse<T>` and `PaginatedResponse<T>` wrappers
- [ ] Add JSDoc comments on all exported types
