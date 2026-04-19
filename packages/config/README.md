# @ek/config

Shared constants, labels, and configuration for EK Marketplace.

## Contents

- `PURPOSE_LABELS` / `PURPOSE_OPTIONS` — display labels for `ListingPurpose`
- `CATEGORY_LABELS` / `CATEGORY_OPTIONS` — display labels for `ListingCategory`
- `CONDITION_LABELS` / `CONDITION_OPTIONS` — display labels for `ListingCondition`
- `EQUIPMENT_CATEGORIES` / `SERVICE_CATEGORIES` — grouped category arrays
- `POSTING_LIMITS` — `TITLE_MAX_LENGTH`, `DESCRIPTION_MAX_LENGTH`, `MAX_PHOTOS`, `MAX_PRICE_PENCE`, `FREE_LISTINGS_PER_MONTH`
- `POSTING_STEPS` — ordered step definitions for the posting wizard

## Usage

```ts
import { CATEGORY_OPTIONS, POSTING_LIMITS } from '@ek/config';
```

Depends on `@ek/types`. Import shared config here rather than hardcoding values in components or API handlers.
