# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Initial monorepo structure (`apps/`, `packages/`, `infra/`, `docs/`)
- Root documentation: README.md, ROADMAP.md, CHANGELOG.md, NEXT-STEPS.md
- `.env.example` with grouped environment variable template
- `docker-compose.yml` for local development (web, api, worker, postgres, redis, nginx)
- Nginx reverse proxy configuration (`infra/nginx/`)
- VPS deployment guide (`docs/deployment/VPS-SETUP.md`)
- AI placement map (`docs/ai/AI-PLACEMENT-MAP.md`)
- Copilot development standards (`.github/copilot-instructions.md`)
- App shells: `apps/web`, `apps/api`, `apps/worker`
- Package starters: `packages/ui`, `packages/types`, `packages/config`, `packages/ai`
- Project summary document (`ek_github_summary_README.md`)

---

<!-- Add new entries above this line in the following format:

## [x.y.z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing functionality

### Deprecated
- Features that will be removed in upcoming releases

### Removed
- Features removed in this release

### Fixed
- Bug fixes

### Security
- Security fixes and improvements

-->
