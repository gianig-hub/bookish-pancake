# packages/config — EK Marketplace Shared Configuration

Shared configuration constants and utilities used across all apps and packages.

## Usage

```typescript
import { APP_CONFIG, CATEGORIES, UK_REGIONS, LISTING_TYPES } from '@ek/config'
```

## Exports

| Export | Description |
|--------|-------------|
| `APP_CONFIG` | App name, URL, support email, locale |
| `CATEGORIES` | Marketplace categories with slugs |
| `UK_REGIONS` | UK regions for location filtering |
| `LISTING_TYPES` | Equipment, service, wanted, business |
| `CONDITIONS` | Item condition enum |
| `USER_ROLES` | User role types |
| `SUBSCRIPTION_PLANS` | Pricing plan definitions |
| `PAGINATION` | Default pagination values |
| `IMAGE_LIMITS` | Upload constraints |
| `isDev`, `isProd`, `isTest` | Environment helpers |

## Guidelines

- All constants should be `as const` for TypeScript inference
- Export types derived from constants where useful
- Keep business logic out — only constants and config
