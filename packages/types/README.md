# packages/types — EK Marketplace Shared TypeScript Types

Shared TypeScript type definitions used across all apps and packages.

## Usage

```typescript
import type { Listing, User, ListingFilters, BusinessProfile } from '@ek/types'
```

## Type Modules

| File | Types |
|------|-------|
| `marketplace.ts` | Listing, Category, ContactMessage, filters |
| `user.ts` | User, BusinessProfile, Address, Auth types |

## Guidelines

- All types must be exported from `src/index.ts`
- Use `interface` for object shapes, `type` for unions/aliases
- Keep types in sync with the Prisma schema (`@ek/db`)
- Avoid `any` — use `unknown` if type is genuinely unknown
- Use optional (`?`) for fields that may not always be present
