# packages/types — EK Marketplace Shared TypeScript Types

## Responsibility

The `types` package is the **single source of truth for all shared TypeScript types** across the EK Marketplace monorepo. It defines the core data models used in the API, web, and worker apps.

Using shared types ensures consistency across the stack and prevents type drift between the frontend and backend.

---

## Key Principle

> Any type used by more than one app belongs here.
> App-specific types stay in their own `src/types/` folder.

---

## Package Structure

```
packages/types/
  src/
    user.ts         # User, UserRole, UserProfile
    listing.ts      # Listing, ListingType, ListingCondition, ListingStatus
    category.ts     # Category, CategoryTree
    business.ts     # Business, BusinessType, VerificationStatus
    service.ts      # ServiceRequest, ServiceStatus
    search.ts       # SearchQuery, SearchFilters, SearchResults
    api.ts          # ApiResponse, PaginatedResponse, ApiError
    auth.ts         # AuthUser, JWTPayload, SessionUser
    subscription.ts # Plan, PlanType, Boost, BoostType
    upload.ts       # UploadedFile, ImageVariant
    common.ts       # UKRegion, Currency, SortDirection, etc.
  index.ts          # Re-exports all types
  package.json
  tsconfig.json
```

---

## Core Types Overview

### User Types
```typescript
type UserRole = 'buyer' | 'seller' | 'business' | 'admin';

interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanType;
  createdAt: Date;
}
```

### Listing Types
```typescript
type ListingType = 'for-sale' | 'wanted' | 'service-request';
type ListingCondition = 'new' | 'used' | 'refurbished' | 'ex-display' | 'trade-stock' | 'clearance' | 'hire';
type ListingStatus = 'draft' | 'active' | 'expired' | 'sold' | 'moderation' | 'rejected';

interface IListing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  condition: ListingCondition;
  status: ListingStatus;
  categoryId: string;
  price?: number;
  location: string;
  images: string[];
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}
```

### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
```

---

## Usage (from apps)

```typescript
import type { IListing, ListingCondition, ApiResponse } from '@ek/types';

// In apps/api
const listing: IListing = await listingService.findById(id);

// In apps/web
const response: ApiResponse<IListing> = await apiClient.get(`/listings/${id}`);
```

---

## Naming Convention

| Pattern | Example |
|---------|---------|
| Interfaces | `IListing`, `IUser`, `IBusiness` |
| Union types | `ListingType`, `UserRole`, `ListingCondition` |
| Enum-like types | `PlanType`, `BoostType` |
| Response wrappers | `ApiResponse<T>`, `PaginatedResponse<T>` |

---

## Status

> **Placeholder — ready for Phase 1 implementation.**
> Next: Define core types for `IUser`, `IListing`, `ICategory`, `ApiResponse` as API routes are built.
