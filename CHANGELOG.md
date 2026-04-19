# Changelog

All notable changes to EK Marketplace will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Added
- Monorepo structure: `apps/`, `packages/`, `infra/`, `docs/`, `.github/`
- `packages/types`: `UserRole`, `AccountType`, `AuthUser`, `SessionUser`, `LoginCredentials`, `RegisterInput`, API response types (`ApiSuccess`, `ApiError`, `ApiResponse`, `PaginatedData`)
- `packages/config`: role constants, protected route config, feature flags
- `apps/web`: Next.js App Router shell with route groups for public, auth, account, seller, business, and admin areas; placeholder pages for all MVP routes; middleware stub
- `apps/api`: Express API shell with modules for auth, users, roles, sessions, health, middleware, config, db; role guard; auth middleware; rate limiter; error handler
- `apps/worker`: Placeholder worker service
- `packages/ui`: README
- `packages/ai`: README
- `docs/product/AUTH-AND-ROLES.md`: Full roles, access levels, MVP vs later
- `docs/ai/AI-PLACEMENT-MAP.md`: AI placement strategy
- `docs/deployment/VPS-SETUP.md`: VPS setup guide
- `README.md`, `ROADMAP.md`, `CHANGELOG.md`, `NEXT-STEPS.md`
- `.env.example`, `docker-compose.yml`, `.gitignore`
- `infra/nginx/nginx.conf`, `infra/nginx/sites/example.conf`
- `.github/copilot-instructions.md`
