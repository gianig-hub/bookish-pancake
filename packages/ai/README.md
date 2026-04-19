# packages/ai — AI Module

## Responsibility

Shared AI utilities, prompt templates, and LLM client wrappers used across the platform.

Used by:
- `apps/api` — for inline AI endpoints (e.g., listing suggestions)
- `apps/worker` — for async AI processing jobs

## What It Contains

- **LLM client** — OpenAI (or equivalent) wrapper with retry logic and token management
- **Prompt templates** — structured, versioned prompts for each AI feature:
  - Listing title generation
  - Listing description writing
  - Category suggestion
  - Condition/spec suggestion
  - Buyer search intent parsing
  - Business profile writing
  - Review response drafting
  - Spam / risk detection prompts
  - FAQ generation
- **Output parsers** — validate and clean AI responses before use
- **Feature flags** — control which AI features are active

## Design Principles

- Use AI where it adds **real value** — no thin or low-quality auto-generated content
- All AI outputs should be **reviewed or guided by the user** before publishing
- Prompts should be **versioned** so behaviour changes are trackable
- Keep costs predictable with **token budgets** per feature

## Status

🚧 **Placeholder — AI module not yet implemented.**
