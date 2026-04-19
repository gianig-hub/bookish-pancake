# packages/types — Shared TypeScript Types

## Responsibility

This package is the **single source of truth for shared TypeScript types and contracts** across the EK Marketplace monorepo.

All apps (`apps/web`, `apps/api`, `apps/worker`) and packages (`packages/ai`, `packages/ui`) import types from here. Types are never duplicated across apps.

---

## Why This Matters

Without a shared types package:
- `apps/web` and `apps/api` can drift apart (different field names, optional vs required)
- Refactoring a type requires changes in multiple places
- Type errors only surface at runtime instead of compile time

With a shared types package:
- Change a type once → TypeScript flags every place that breaks
- API contracts are explicit and versioned
- Onboarding developers understand the data model immediately

---

## Folder Structure (Planned)

```
packages/types/
├── src/
│   ├── user.ts           # User, UserRole, UserProfile
│   ├── listing.ts        # Listing, ListingCategory, ListingStatus, ListingCondition
│   ├── business.ts       # Business, BusinessCategory, BusinessPlan
│   ├── wantedAd.ts       # WantedAd, WantedAdStatus
│   ├── service.ts        # ServiceRequest, ServiceCategory
│   ├── payment.ts        # Subscription, Boost, Plan
│   ├── api.ts            # API request/response envelope types
│   └── index.ts          # Re-exports all types
├── tsconfig.json
└── package.json
```

---

## Key Types (Planned Stubs)

```typescript
// TODO: Implement these types

export type UserRole = 'buyer' | 'seller' | 'business' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export type ListingStatus = 'draft' | 'pending' | 'active' | 'sold' | 'expired' | 'removed';
export type ListingCondition = 'new' | 'used' | 'refurbished' | 'ex-display' | 'trade-stock' | 'clearance';

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: ListingCondition;
  price?: number;
  location: string;
  status: ListingStatus;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  location: string;
  categories: string[];
  verified: boolean;
  userId: string;
  createdAt: Date;
}

// API response envelope
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
```

---

## Usage

```typescript
import type { User, Listing, ApiResponse } from '@ek/types';
```

---

## TODO

- [ ] Set up package with TypeScript
- [ ] Define `User` and `UserRole` types
- [ ] Define `Listing` and related enum types
- [ ] Define `Business` type
- [ ] Define `WantedAd` type
- [ ] Define `ApiResponse<T>` envelope type
- [ ] Export all types from `index.ts`
