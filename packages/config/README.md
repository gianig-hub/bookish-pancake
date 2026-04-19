# packages/config — Shared Configuration

> Shared constants, environment variable validation, and configuration helpers for EK Marketplace.

---

## Purpose

This package provides a **single source of truth** for configuration that is used by multiple apps. It prevents:

- duplicated env variable reading across `apps/api`, `apps/worker`
- hardcoded constants scattered across files
- inconsistent feature flag checks

---

## What This Package Exports

### Environment Schema

Validates environment variables at startup using Zod. Apps crash early with a clear message if required variables are missing.

```typescript
import { env } from '@ek/config';

console.log(env.DATABASE_URL);       // validated string
console.log(env.FEATURE_AI_ENABLED); // validated boolean
```

### Feature Flags

```typescript
import { features } from '@ek/config';

if (features.ai) {
  // run AI logic
}
```

### Constants

```typescript
import { PLANS, BOOST_TYPES, LISTING_LIMITS } from '@ek/config';

// PLANS.FREE, PLANS.SELLER_PLUS, PLANS.TRADER_PRO, PLANS.BUSINESS
// BOOST_TYPES.BUMP, BOOST_TYPES.FEATURED, BOOST_TYPES.URGENT
// LISTING_LIMITS.FREE_MAX, LISTING_LIMITS.SELLER_PLUS_MAX
```

### Categories

```typescript
import { CATEGORIES } from '@ek/config';
// Full category tree for equipment and services
```

---

## Folder Structure

```
packages/config/
├── src/
│   ├── env.ts           # Zod env schema and parsed env object
│   ├── features.ts      # Feature flag helpers
│   ├── plans.ts         # Subscription plan definitions and limits
│   ├── categories.ts    # Marketplace category tree
│   ├── constants.ts     # Other shared constants
│   └── index.ts         # Re-exports all config
├── package.json
└── tsconfig.json
```

---

## Rules

- This package has **no side effects** at import time (except env validation)
- Category definitions and plan limits are the authoritative source — do not duplicate in the database schema
- Feature flags must always default to `false` (opt-in, not opt-out)

---

## TODO

- [ ] Initialise package
- [ ] Define Zod env schema covering all variables in `.env.example`
- [ ] Define PLANS and BOOST_TYPES constants
- [ ] Define CATEGORIES tree (equipment and services)
- [ ] Export feature flag helpers
