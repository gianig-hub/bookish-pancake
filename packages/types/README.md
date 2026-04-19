# packages/types — Shared TypeScript Types

## Responsibility

Shared TypeScript types, interfaces, and enums used across all apps and packages in the monorepo.

Consumed by:
- `apps/web` — for typed API responses and UI data models
- `apps/api` — for request/response contracts and database models
- `apps/worker` — for typed job payloads
- `packages/ai` — for typed prompt inputs/outputs

## What It Contains

- **Domain models** — core entity types:
  - `Listing`, `ListingType`, `ListingStatus`, `ListingCategory`
  - `User`, `UserRole`, `UserPlan`
  - `Business`, `BusinessProfile`
  - `WantedAd`
  - `Enquiry`, `Message`
  - `Subscription`, `Plan`, `Boost`
  - `ModerationEntry`
- **API contracts** — request and response DTOs
- **Enums** — listing types, categories, condition states, plan tiers, UK regions
- **Utility types** — pagination, API responses, error shapes

## Design Principles

- This package has **zero runtime dependencies** (pure TypeScript types only)
- Types are the **single source of truth** — no duplicating type definitions across apps
- Keep types aligned with the database schema

## Status

🚧 **Placeholder — types not yet defined.**
