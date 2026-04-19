# packages/config — Shared Configuration

## Responsibility

Shared constants, environment helpers, and configuration values used across `apps/web`, `apps/api`, and `apps/worker`.

Keeps configuration **DRY** — define once, use everywhere.

## What Lives Here

- Category slugs and IDs (seed-matched)
- Pagination defaults
- File upload limits
- Role constants
- Feature flags
- Environment variable helpers

## Usage

```typescript
import { PAGINATION, CATEGORIES, isProduction } from '@ek/config';

// Use pagination defaults
const listings = await db.listing.findMany({
  take: PAGINATION.DEFAULT_LIMIT,
});

// Check environment
if (isProduction()) {
  // production-only logic
}
```

## Development

```bash
cd packages/config
npm run build
```
