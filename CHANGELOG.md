# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Monorepo structure: apps/web, apps/api, packages/types, infra, docs
- Shared TypeScript types: `UserRole`, `User`, `Session`, `AuthResponse`
- Auth shell: email/password login, register, logout
- Protected routes: /account, /business, /admin with role-based guards
- In-memory session and user stores (placeholder — TODO: replace with DB)
- Role-aware middleware (Next.js) for route protection
- `RoleGuard`, `AdminGuard`, `BusinessGuard` React components
- API auth routes: POST /auth/register, POST /auth/login, POST /auth/logout, GET /auth/me
- Startup documentation: README, ROADMAP, AUTH-AND-ROLES, AI-PLACEMENT-MAP, VPS-SETUP
- Docker Compose starter (web, api, worker, postgres, redis, nginx)
- Nginx reverse proxy config

---

## [0.1.0] — Initial Startup Pack

### Added
- Initial monorepo structure
- Startup documentation and planning files
- AI placement map and VPS setup notes
