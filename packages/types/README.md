# packages/types — Shared TypeScript Types

## Responsibility

Single source of truth for all TypeScript types and interfaces shared across the monorepo.

**All apps import types from here — never define types locally that are shared.**

## Why This Matters

Without a shared types package:
- `apps/web` and `apps/api` drift in their type definitions
- You get runtime errors from mismatched shapes
- Refactoring breaks both apps independently

With shared types:
- One change propagates everywhere
- TypeScript catches mismatches at compile time
- API response shapes match frontend expectations

## Exported Types

```typescript
// Users
User, UserRole, CreateUserInput, UpdateUserInput

// Listings
Listing, ListingCondition, ListingType, ListingStatus
CreateListingInput, UpdateListingInput, ListingFilters

// Categories
Category

// API responses
ApiResponse<T>, PaginatedResponse<T>
```

## Usage

```typescript
// In apps/web
import type { Listing, ListingFilters } from '@ek/types';

// In apps/api
import type { CreateListingInput } from '@ek/types';
```

## Development

Types are TypeScript-only — no runtime code. They compile to `.d.ts` files.

```bash
cd packages/types
npm run build   # Compiles types
```
