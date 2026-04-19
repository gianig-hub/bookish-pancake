# packages/config — EK Marketplace Shared Configuration

## Responsibility

The `config` package is the **shared configuration and constants layer** for EK Marketplace. It centralises values, settings, and utility functions that are used across multiple apps — keeping configuration DRY and consistent.

---

## Key Principle

> Any constant, configuration value, or utility used in more than one app belongs here.
> Secrets and environment-specific values stay in `.env` files — never hardcoded in this package.

---

## Package Structure

```
packages/config/
  src/
    constants/
      plans.ts            # Subscription plan definitions
      boosts.ts           # Listing boost definitions
      categories.ts       # Category slugs and labels
      listing.ts          # Listing limits, expiry, conditions
      regions.ts          # UK regions and postcodes
      pagination.ts       # Default page sizes
    validation/
      listing.schema.ts   # Zod schema: listing create/update
      user.schema.ts      # Zod schema: user register/update
      business.schema.ts  # Zod schema: business create/update
      search.schema.ts    # Zod schema: search filters
    helpers/
      env.ts              # Environment variable helpers
      currency.ts         # Price formatting (GBP)
      date.ts             # Date formatting utilities
      slug.ts             # Slug generation
      pagination.ts       # Pagination helpers
    feature-flags.ts      # Feature flag helpers (reads from env)
  index.ts                # Re-exports all constants, schemas, helpers
  package.json
  tsconfig.json
```

---

## Key Constants

### Subscription Plans
```typescript
export const PLANS = {
  FREE: { id: 'free', name: 'Free', price: 0, maxListings: 3 },
  SELLER_PLUS: { id: 'seller-plus', name: 'Seller Plus', price: 999, maxListings: 20 },
  TRADER_PRO: { id: 'trader-pro', name: 'Trader Pro', price: 2499, maxListings: 100 },
  DEALER_BUSINESS: { id: 'dealer-business', name: 'Dealer / Business', price: 5999, maxListings: 500 },
} as const;
```

### Listing Conditions
```typescript
export const LISTING_CONDITIONS = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'refurbished', label: 'Refurbished' },
  { value: 'ex-display', label: 'Ex-Display' },
  { value: 'trade-stock', label: 'Trade Stock' },
  { value: 'clearance', label: 'Clearance' },
  { value: 'hire', label: 'Hire / Rental' },
] as const;
```

### Feature Flags
```typescript
import { isFeatureEnabled } from '@ek/config';

if (isFeatureEnabled('AI_SEARCH')) {
  // show AI search UI
}
```

---

## Usage (from apps)

```typescript
import { PLANS, LISTING_CONDITIONS, listingCreateSchema, formatGBP } from '@ek/config';

// Validate a listing form
const result = listingCreateSchema.safeParse(formData);

// Format a price
const price = formatGBP(999); // → "£9.99"

// Check plan limits
const plan = PLANS.SELLER_PLUS;
console.log(plan.maxListings); // → 20
```

---

## What Goes Here vs `.env`

| Belongs in `packages/config` | Belongs in `.env` |
|-------------------------------|-------------------|
| Plan prices (hardcoded business rules) | API keys |
| Category slugs and labels | Database URLs |
| UK regions list | Stripe price IDs |
| Validation schemas | Secrets |
| Feature flag helpers | Port numbers |
| Currency formatters | Email credentials |

---

## Status

> **Placeholder — ready for Phase 1 implementation.**
> Next: Define `LISTING_CONDITIONS`, `UK_REGIONS`, `listingCreateSchema`, and `formatGBP` first — needed for post-ad form and API validation.
