# packages/types

Shared TypeScript types and contracts for EK Marketplace.

## Purpose

Centralises all cross-app types so that `apps/api`, `apps/web`, and `apps/worker` stay in sync without duplicating type definitions.

## Key Types

| Type | File | Purpose |
|------|------|---------|
| `UserRole` | `src/roles.ts` | Enum of all user roles: buyer, private_seller, trader, dealer, business, admin |
| `AccountType` | `src/roles.ts` | Account classification: personal, business, dealer, service_provider |
| `AuthUser` | `src/auth.ts` | Full authenticated user object (from DB / after login) |
| `SessionUser` | `src/auth.ts` | Lightweight JWT/session payload |
| `LoginCredentials` | `src/auth.ts` | Email + password login input |
| `RegisterInput` | `src/auth.ts` | New user registration input |
| `ApiSuccess<T>` | `src/api.ts` | Standard success envelope `{ success: true, data: T }` |
| `ApiError` | `src/api.ts` | Standard error envelope `{ success: false, error: {...} }` |
| `ApiResponse<T>` | `src/api.ts` | Union of ApiSuccess and ApiError |
| `PaginatedData<T>` | `src/api.ts` | Paginated list wrapper |

## Usage

```ts
import type { UserRole, AuthUser, ApiResponse } from '@ek/types';
```

## Assumptions

- No DB ORM types are defined here. Database-specific types (e.g. Prisma models) live in `apps/api/src/db`.
- `UserRole` is an enum (not a string union) to allow runtime use in middleware guards.

## TODOs

- [ ] Add `ListingType`, `ListingStatus` once listing schema is defined
- [ ] Add `BusinessProfile` type once business module is scoped
- [ ] Add `ServiceRequest` type for services marketplace
- [ ] Add `NotificationPayload` for worker jobs
