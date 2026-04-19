# packages/types — KoldMarket Shared TypeScript Types

Shared TypeScript type definitions and interfaces used across all apps and packages.

---

## Responsibility

This package provides a **single source of truth** for all data types in the project:

- Database entity types (User, Listing, Category, Business, etc.)
- API request/response types
- Shared enums (ListingCondition, UserRole, ListingStatus, etc.)
- Utility types used across the codebase

Having types in one place ensures that `apps/web`, `apps/api`, and `apps/worker` all agree on data shapes — preventing runtime mismatches.

---

## Usage

```typescript
import type { Listing, ListingCondition, UserRole } from '@koldmarket/types'

const listing: Listing = {
  id: 'uuid-here',
  title: 'Used Williams Freezer',
  condition: ListingCondition.Used,
  price: 45000, // pence — always store money as integers
  // ...
}
```

---

## Structure

```
packages/types/
├── src/
│   ├── user.ts         # User, UserRole, UserProfile
│   ├── listing.ts      # Listing, ListingCondition, ListingStatus, ListingType
│   ├── category.ts     # Category, CategoryTree
│   ├── business.ts     # Business, BusinessProfile
│   ├── wanted.ts       # WantedAd
│   ├── api.ts          # ApiResponse<T>, PaginatedResponse<T>
│   └── index.ts        # Re-exports all types
└── README.md
```

---

## Conventions

- All monetary values are stored as **integers in pence** (e.g. £450.00 = `45000`)
- All dates are ISO 8601 strings when serialised
- UUIDs for all primary keys
- Enums over magic strings for constrained values
