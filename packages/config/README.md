# packages/config — Shared Configuration

Centralised configuration for Kold Market. Exports constants, environment helpers, validation schemas, and feature flags. Used by all apps to keep config DRY and consistent.

---

## Responsibility

- Provides a single place to define and validate environment variables
- Exports constants used across multiple apps (categories, plans, limits)
- Manages feature flags to safely enable/disable features by phase
- Provides validation schemas (e.g. Zod) for API inputs and data models

---

## Tech Stack

| Tool | Purpose |
|---|---|
| TypeScript | Type-safe config access |
| Zod | Schema validation and env parsing |

---

## Key Exports

```typescript
// Environment helpers
export const env                // Validated, typed environment object
export function requireEnv()    // Throws at startup if required vars missing

// Constants
export const CATEGORIES         // Marketplace categories and slugs
export const LISTING_TYPES      // 'for-sale' | 'wanted' | 'hire' | 'trade'
export const SUBSCRIPTION_PLANS // Free, Seller Plus, Trader Pro, Business
export const MAX_IMAGES         // Max images per listing (default: 10)
export const MAX_FILE_SIZE_MB   // Max upload size (default: 5)

// Feature flags
export const FEATURES = {
  AI_ENABLED: false,            // Master AI switch (Phase 2+)
  AI_LISTING_ASSIST: false,     // Listing generation (Phase 2+)
  AI_MODERATION: false,         // Auto-moderation (Phase 3+)
  AI_SEARCH_RANKING: false,     // Semantic search (Phase 3+)
  PAYMENTS_ENABLED: false,      // Stripe integration (Phase 2+)
}

// Validation schemas
export const listingSchema      // Zod schema for listing creation
export const userSchema         // Zod schema for user registration
export const businessSchema     // Zod schema for business profiles
```

---

## Usage

```typescript
// In apps/api
import { env, CATEGORIES, listingSchema } from "@koldmarket/config";

// In apps/worker
import { FEATURES, requireEnv } from "@koldmarket/config";

// In apps/web
import { SUBSCRIPTION_PLANS, LISTING_TYPES } from "@koldmarket/config";
```

---

## Dependencies

- No app dependencies — pure shared logic
- Requires `packages/types` for schema type alignment

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [packages/types](../types/README.md)
