# @ek/types

Shared TypeScript types, enums, and interfaces for EK Marketplace.

## Contents

- `ListingPurpose` — enum: `for_sale`, `wanted`, `service_request`, `hire`
- `ListingCategory` — enum: all equipment and service categories
- `ListingCondition` — enum: `new`, `used`, `refurbished`, etc.
- `ListingStatus` — enum: `draft`, `pending_review`, `active`, `sold`, `expired`, `removed`
- `ListingDraft` — interface for in-progress listing (posting flow)
- `ListingRecord` — interface for a persisted listing
- `ListingLocation` — city/postcode/region
- `ListingPhoto` — photo attachment shape

## Usage

```ts
import { ListingPurpose, ListingDraft } from '@ek/types';
```

All other apps and packages import from here — never define duplicate types locally.
