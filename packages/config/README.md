# packages/config — Shared Configuration

## Responsibility

This package contains **shared configuration, constants, validation schemas, and environment helpers** for EK Marketplace.

It is imported by `apps/api`, `apps/worker`, and optionally `apps/web` for any shared constants (e.g., listing categories, plan limits, feature flag names).

---

## Why a Shared Config Package?

Without this package, configuration drifts:
- Category names defined differently in frontend and backend
- Feature flag names hardcoded as strings in multiple places
- Validation rules duplicated in API and worker
- Plan limits defined once in code, once in the database, and again in the frontend

With this package:
- One place to update a category name → all apps reflect it
- Feature flags are typed constants, not magic strings
- Validation schemas can be imported into both API request handlers and worker processors
- Plan limits have a single source of truth

---

## Folder Structure (Planned)

```
packages/config/
├── src/
│   ├── categories.ts         # Listing and service category definitions
│   ├── plans.ts              # Subscription plan limits and pricing
│   ├── featureFlags.ts       # Feature flag names as typed constants
│   ├── validation/
│   │   ├── listing.ts        # Zod schema for listing input validation
│   │   ├── user.ts           # Zod schema for user input validation
│   │   └── business.ts       # Zod schema for business input validation
│   ├── env.ts                # Type-safe environment variable helper
│   └── index.ts              # Re-exports all config
├── tsconfig.json
└── package.json
```

---

## Key Exports (Planned)

```typescript
// TODO: Implement these

// Categories
export const LISTING_CATEGORIES = [
  'refrigeration',
  'air-conditioning',
  'cold-rooms',
  'freezer-rooms',
  'parts-and-controls',
  'tools-and-accessories',
  'clearance',
] as const;

export type ListingCategory = typeof LISTING_CATEGORIES[number];

// Feature flags
export const FEATURE_FLAGS = {
  AI_SEARCH: 'FEATURE_AI_SEARCH',
  SELLER_COPILOT: 'FEATURE_SELLER_COPILOT',
  BOOSTS: 'FEATURE_BOOSTS',
  PAYMENTS: 'FEATURE_PAYMENTS',
} as const;

// Plan limits
export const PLAN_LIMITS = {
  free: { maxListings: 3, maxImages: 5 },
  sellerPlus: { maxListings: 20, maxImages: 10 },
  traderPro: { maxListings: 100, maxImages: 15 },
  dealer: { maxListings: 500, maxImages: 20 },
} as const;
```

---

## Usage

```typescript
import { LISTING_CATEGORIES, PLAN_LIMITS, FEATURE_FLAGS } from '@ek/config';
```

---

## TODO

- [ ] Set up package with TypeScript
- [ ] Define listing category constants
- [ ] Define plan limits and pricing constants
- [ ] Define feature flag constants
- [ ] Create Zod validation schemas for listing, user, and business input
- [ ] Create type-safe `env.ts` helper for reading environment variables
- [ ] Export all from `index.ts`
