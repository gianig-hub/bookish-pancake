# @ek/ai

AI module interfaces, prompt templates, and utility helpers for EK Marketplace.

## Status

TODO (Phase 3): This package will contain:
- OpenAI client wrapper (`src/openai.ts`)
- Prompt templates (`prompts/`)
- Listing AI helpers (title generation, description, category suggestion)
- Moderation helpers (spam scoring)
- Search AI helpers (natural-language query parsing)

## Feature Flags

All AI features are gated by environment variables:

```
FEATURE_AI_LISTING_ASSIST=false
FEATURE_AI_SEARCH=false
FEATURE_AI_MODERATION=false
```

## See Also

- [docs/ai/AI-PLACEMENT-MAP.md](../../docs/ai/AI-PLACEMENT-MAP.md) for the full AI module plan.
