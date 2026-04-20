# EK Marketplace repo instructions

This project is an AI-first UK vertical marketplace for:
- air conditioning
- refrigeration
- cold rooms
- freezer rooms
- related equipment, parts, tools, and services

Main product areas:
- Services Marketplace
- Equipment Marketplace
- Businesses / Dealers Directory
- Wanted Ads
- Guides / FAQ / Help Center
- AI-assisted search, posting, moderation, and support

Working rules:
- Keep the MVP focused and production-oriented.
- Prefer clean, modular architecture.
- Do not generate placeholder logic without clearly marking it.
- Use TypeScript where possible.
- Keep security, rate limits, and validation in mind.
- Prefer reusable components and shared types.
- Add clear TODO notes where implementation is partial.
- When changing code, explain impacted files and next steps.
- Do not invent APIs or database columns without stating assumptions.
- Optimize for Docker-based deployment on Ubuntu VPS.
- Keep AI features modular under a dedicated package/service layer.

Initial monorepo structure:
- apps/web
- apps/api
- apps/worker
- packages/ui
- packages/config
- packages/ai
- packages/types
- infra
- docs

Current priority:
1. AI placement map
2. GitHub/VPS startup structure
3. settings/admin pack
4. schema later
