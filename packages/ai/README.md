# packages/ai — AI Service Layer

> Centralised AI module for EK Marketplace. All AI features route through here.
>
> **Status:** Scaffolded — implementation begins in Phase 3.
> **Feature flag:** Controlled by `FEATURE_AI_ENABLED` environment variable.

---

## Purpose

This package provides a **unified, modular interface** to AI capabilities used across the platform. It:

- Wraps the OpenAI (and future model) API calls
- Manages prompt templates in a versioned, testable way
- Provides typed async functions that other apps consume
- Handles fallbacks when AI is unavailable or the flag is disabled
- Keeps all AI logic out of `apps/web` and `apps/api` routes

---

## What This Package Exports

| Export | Purpose |
|--------|---------|
| `suggestListingTitle()` | Generate title suggestions from listing draft |
| `suggestListingDescription()` | Draft a listing description from structured fields |
| `suggestCategory()` | Predict listing category from title/description |
| `detectMissingFields()` | Flag incomplete listing data before submission |
| `moderateListing()` | Score a listing for policy violations |
| `detectSpam()` | Classify content as spam or legitimate |
| `writeBusinessProfile()` | Draft a business description from inputs |
| `generateBusinessFAQ()` | Suggest FAQ Q&A pairs for a business profile |
| `draftLeadReply()` | Suggest a reply to an inbound enquiry |
| `rankSearchResults()` | Re-rank search results by relevance and intent |

---

## Folder Structure

```
packages/ai/
├── src/
│   ├── client.ts          # OpenAI client initialisation
│   ├── router.ts          # Model routing (default: gpt-4o-mini)
│   ├── guard.ts           # Feature flag check (throws if AI disabled)
│   ├── prompts/           # Versioned prompt templates
│   │   ├── listing.ts
│   │   ├── moderation.ts
│   │   ├── business.ts
│   │   └── search.ts
│   ├── modules/           # Individual feature implementations
│   │   ├── suggest-listing.ts
│   │   ├── suggest-category.ts
│   │   ├── moderate.ts
│   │   ├── business-profile.ts
│   │   └── search-rank.ts
│   └── index.ts           # Public exports
├── package.json
└── tsconfig.json
```

---

## Design Principles

1. **Modular** — each AI feature is a separate function in `modules/`
2. **Testable** — prompts are in `prompts/`, easy to unit test without calling OpenAI
3. **Fallback-safe** — every function returns a fallback value if AI is unavailable
4. **Cost-aware** — cheap model (`gpt-4o-mini`) is default; expensive model only when needed
5. **Swappable** — model routing lives in `router.ts`; swap OpenAI → Anthropic without touching modules

---

## Usage Example

```typescript
import { suggestListingTitle } from '@ek/ai';

const titles = await suggestListingTitle({
  category: 'refrigeration',
  condition: 'used',
  description: 'Commercial upright fridge, 2 years old, working order',
});
// Returns: string[] — 2-3 title suggestions, or [] if AI disabled
```

---

## TODO

- [ ] Initialise package with TypeScript
- [ ] Set up OpenAI client in `client.ts`
- [ ] Implement `suggestListingTitle` module
- [ ] Implement `moderateListing` module
- [ ] Add unit tests for all prompt templates
- [ ] Add integration test with OpenAI (mocked)
