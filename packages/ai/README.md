# @ek/ai

AI prompt library, model routing, and guardrails for EK Marketplace.

## Status

Placeholder — not yet built. See [AI Placement Map](../../docs/ai/AI-PLACEMENT-MAP.md) for the full plan.

## Why This Package Exists

AI logic is centralised here to keep it:
- **Replaceable** — swap OpenAI for another provider without touching app code
- **Testable** — prompts and responses can be unit tested
- **Rate-limited** — one place to throttle API calls
- **Auditable** — all AI calls are logged and reviewable

## Planned Contents

```
prompts/
  listing-title.ts         → Generate listing title from facts
  listing-description.ts   → Generate listing description
  category-suggest.ts      → Suggest category from listing content
  spam-detect.ts           → Flag probable spam
  business-profile.ts      → Generate business profile text
routing/
  model-router.ts          → Select model based on task and cost
guardrails/
  content-filter.ts        → Flag unsafe or off-topic outputs
evaluations/
  listing-title.eval.ts    → Test cases for title generation
index.ts
```

## TODO

- Add OpenAI client wrapper (Phase 3)
- Add prompt library starters
- Add model router with cost tiers
- Add content guardrails
- Add evaluation test cases
