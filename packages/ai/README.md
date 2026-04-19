# packages/ai — EK Marketplace AI Service Layer

## Responsibility

The `ai` package is the **centralised AI service layer** for EK Marketplace. It provides a clean, swappable interface for all AI-powered features across the monorepo.

All AI calls go through this package — no app calls an AI provider directly.

---

## Phase Gating

> ⚠️ **This package is disabled in Phase 1.**
> 
> AI features are Phase 3+. During Phase 1 and 2, this package exists as a placeholder only.
> All functions return mocked/empty responses when `AI_ENABLED=false`.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| OpenAI SDK | Default AI provider |
| Anthropic SDK | Alternative provider |
| Ollama | Local dev / no-cost provider |
| Zod | Prompt input/output validation |

---

## Supported Providers

Set via `AI_PROVIDER` environment variable:

| Value | Provider | Use Case |
|-------|----------|----------|
| `openai` | OpenAI (GPT-4o) | Staging + Production |
| `anthropic` | Anthropic (Claude) | Alternative production |
| `ollama` | Ollama (local) | Local dev, no API cost |

---

## Services

### `search` — AI-Assisted Search
- Semantic search with embeddings
- Rerank results by relevance
- Natural language query parsing

### `listing` — Listing AI Tools
- Generate listing title from user inputs
- Write listing description
- Suggest category for a listing
- Suggest condition and spec details

### `moderation` — AI Moderation
- Spam and duplicate detection score
- Risk score for new listings
- Flag suspicious content

### `business` — Business AI Tools
- Write business profile summary
- Suggest FAQ answers
- Summarise business for search snippets

### `buyer` — Buyer AI Tools
- Equipment comparison helper
- "What do I need?" matching
- Help centre FAQ answers

---

## Package Structure

```
packages/ai/
  src/
    search/
      semantic-search.ts
      rerank.ts
    listing/
      title-generator.ts
      description-writer.ts
      category-suggester.ts
    moderation/
      spam-detector.ts
      risk-scorer.ts
    business/
      profile-writer.ts
      faq-generator.ts
    buyer/
      comparator.ts
      matcher.ts
    lib/
      client.ts       # LLM provider client (swappable)
      logger.ts       # AI usage logging
      rate-limit.ts   # Per-user rate limiting
  prompts/            # Versioned prompt templates
    listing/
      title.prompt.txt
      description.prompt.txt
    moderation/
      spam.prompt.txt
  index.ts            # Public exports
  package.json
  tsconfig.json
```

---

## Usage (from apps)

```typescript
import { generateListingTitle } from '@ek/ai';

const result = await generateListingTitle({
  category: 'AC Units',
  condition: 'used',
  brand: 'Daikin',
  details: '3.5kW wall-mounted split unit, 5 years old, good working order',
});

// result.title → "Daikin 3.5kW Wall-Mounted Split AC Unit — Used, Good Condition"
// result.suggestions → ["Used Daikin Split AC 3.5kW", ...]
```

---

## Safety Rules

- All AI functions return `null` or empty results when `AI_ENABLED=false` (never throw)
- All AI-generated content is clearly labelled when surfaced to users
- All prompt templates are stored in `prompts/` and versioned
- All AI calls are logged for cost monitoring and debugging
- Rate limiting is enforced per user per endpoint

---

## Status

> **Placeholder — Phase 3 implementation.**
> No active AI code in Phase 1. Package structure is in place for when Phase 3 begins.
