# Changelog

All notable changes to EK Marketplace are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- `packages/types`: `ListingPurpose`, `ListingCategory`, `ListingCondition`, `ListingDraft`, `ListingStatus`, `ListingRecord`, `ListingLocation`, `ListingPhoto` enums and interfaces
- `packages/config`: `PURPOSE_LABELS`, `CATEGORY_LABELS`, `CONDITION_LABELS`, `PURPOSE_OPTIONS`, `CATEGORY_OPTIONS`, `CONDITION_OPTIONS`, `POSTING_LIMITS`, `POSTING_STEPS` constants
- `apps/web`: 8-step posting flow wizard (`PostingFlow.tsx`) with step components for purpose, category, title/description, condition, price, location, photos (placeholder), and preview/submit
- `apps/web`: `/post` page at `apps/web/src/pages/post/index.tsx`
- `apps/api`: Express API entry point with `/health`, `/api/listings`, and `/api/categories` routes
- `apps/api`: `listings` module — router, types, and validation
- `apps/api`: `categories` module — router returning all categories grouped by type
- `apps/worker`: Background worker shell with TODO markers for BullMQ/Redis integration
- `docs/product/POSTING-FLOW.md`: Posting journey documentation, MVP fields, deferred items, AI entry points
- `docs/ai/AI-PLACEMENT-MAP.md`: AI module placement guide
- `docs/deployment/VPS-SETUP.md`: VPS deployment guide (Ubuntu 24.04, Docker, Nginx, PostgreSQL, Redis)
- Root files: `README.md`, `ROADMAP.md`, `.env.example`, `docker-compose.yml`, `.gitignore`
- `.github/copilot-instructions.md`: Development standards and rules
- `infra/nginx/nginx.conf` and `infra/nginx/sites/example.conf`: Nginx reverse proxy starter

---

## Notes

- Photo upload is a placeholder; real storage integration (Cloudflare R2 / S3) is deferred to a later sprint.
- Database integration and authentication are the next priorities.
