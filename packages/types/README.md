# packages/types — Shared TypeScript Types

Single source of truth for all TypeScript types used across Kold Market. Imported by `apps/web`, `apps/api`, and `apps/worker` to ensure consistent data structures.

---

## Responsibility

- Defines all domain entity types (User, Listing, Business, etc.)
- Defines API request and response shapes
- Prevents type drift between frontend, backend, and worker
- Keeps interfaces in one place — change once, update everywhere

---

## Tech Stack

| Tool | Purpose |
|---|---|
| TypeScript | Type definitions only — no runtime code |

---

## Key Exports

```typescript
// Domain entities
export type User
export type Listing
export type Business
export type WantedAd
export type ServiceRequest
export type Category
export type Subscription

// Listing subtypes
export type ListingDraft
export type ListingStatus   // 'active' | 'expired' | 'pending' | 'removed'
export type ListingType     // 'for-sale' | 'wanted' | 'hire' | 'trade'
export type Condition       // 'new' | 'used' | 'refurbished' | 'ex-display'

// API shapes
export type ApiResponse<T>
export type PaginatedResponse<T>
export type ApiError

// Auth
export type AuthSession
export type UserRole        // 'buyer' | 'seller' | 'business' | 'admin'
```

---

## Usage

```typescript
// In apps/api
import { Listing, ApiResponse } from "@koldmarket/types";

// In apps/web
import { User, ListingType } from "@koldmarket/types";

// In apps/worker
import { ListingDraft } from "@koldmarket/types";
```

---

## Dependencies

- No runtime dependencies — pure TypeScript definitions
- Must be set up and compiled before other apps can import from it

---

## Related Docs

- [ROADMAP.md](../../ROADMAP.md)
- [NEXT-STEPS.md](../../NEXT-STEPS.md)
- [packages/config](../config/README.md)
