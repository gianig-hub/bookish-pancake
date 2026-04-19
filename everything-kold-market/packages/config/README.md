# packages/config — Shared Configuration

Shared constants and configuration values used across all apps and packages.

## Usage

```typescript
import { DEFAULT_PAGE_SIZE, UK_REGIONS, SUBSCRIPTION_PLANS } from '@ek/config';
```

## Contents

- `APP_NAME`, `APP_DESCRIPTION` — Application metadata
- `DEFAULT_PAGE_SIZE`, `MAX_PAGE_SIZE` — Pagination defaults
- `MAX_LISTING_IMAGES`, `MAX_IMAGE_SIZE_BYTES` — Listing image limits
- `UK_REGIONS` — Valid UK region names
- `SUBSCRIPTION_PLANS` — Plan details and pricing
- `API_TIMEOUT_MS`, `RATE_LIMIT_*` — API/rate limit defaults

## Rules
- No runtime logic in this package — only constants and types
- No external dependencies
- All values should be derivable from environment or hardcoded defaults
