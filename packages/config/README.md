# packages/config

Shared configuration, constants, and feature flags for EK Marketplace.

## Purpose

Centralises cross-app configuration so that `apps/api`, `apps/web`, and `apps/worker` don't duplicate constants or route guards.

## Key Exports

| Export | File | Purpose |
|--------|------|---------|
| `ROLE_LABELS` | `src/roles.ts` | Human-readable role names for UI |
| `ROLE_DESCRIPTIONS` | `src/roles.ts` | Role descriptions for onboarding/pricing |
| `BUSINESS_ROLES` | `src/roles.ts` | Roles classified as business accounts |
| `SELLER_ROLES` | `src/roles.ts` | Roles allowed to post listings |
| `PROTECTED_ROUTES` | `src/routes.ts` | Route paths with required roles |
| `PUBLIC_ROUTES` | `src/routes.ts` | Routes accessible without auth |
| `AUTH_ONLY_ROUTES` | `src/routes.ts` | Routes to redirect away from if logged in |
| `DEFAULT_FEATURE_FLAGS` | `src/featureFlags.ts` | Default on/off for all features |
| `getFeatureFlags()` | `src/featureFlags.ts` | Read feature flags from env vars |

## Usage

```ts
import { PROTECTED_ROUTES, BUSINESS_ROLES, getFeatureFlags } from '@ek/config';
```

## Assumptions

- Feature flags are read from environment variables (server-side only).
- Route protection is enforced via Next.js middleware and Express middleware — not just client-side.

## TODOs

- [ ] Add `APP_CONSTANTS` (pagination defaults, max upload sizes, etc.)
- [ ] Add `PRICING_TIERS` once subscription plans are defined
- [ ] Connect `getFeatureFlags()` to a server-side config validation layer
- [ ] Consider LaunchDarkly / Unleash for production feature flags post-MVP
