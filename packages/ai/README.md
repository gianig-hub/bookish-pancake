# packages/ai — KoldMarket AI Modules

Shared AI utilities and prompt wrappers used across `apps/api` and `apps/worker`.

---

## Responsibility

This package provides:

- **OpenAI client** — configured singleton with error handling
- **Listing writer** — generates listing titles and descriptions from seller input
- **Search interpreter** — converts natural language queries into database filters
- **Service matcher** — matches buyer needs to relevant service providers
- **Business writer** — generates business profile descriptions
- **Lead reply assistant** — drafts replies to buyer enquiries
- **Moderation helper** — flags potential spam or policy violations
- **Help assistant** — answers common marketplace questions

All AI calls are centralised here so that:
- Model selection is consistent
- PII stripping is enforced
- Logging is in one place
- Cost controls are easy to update

---

## Usage

```typescript
import { generateListingDraft } from '@koldmarket/ai'

const draft = await generateListingDraft({
  category: 'commercial-freezers',
  condition: 'used',
  keyDetails: 'Williams upright freezer, 2 years old, good working order',
})

// draft.title  → "Used Williams Upright Commercial Freezer – Good Working Order"
// draft.description → full structured description
```

---

## Structure

```
packages/ai/
├── src/
│   ├── client.ts               # OpenAI client setup + base helpers
│   ├── listing-writer.ts       # Generate listing title + description
│   ├── search-interpreter.ts   # Natural language → search filters
│   ├── service-matcher.ts      # Match buyers to service providers
│   ├── business-writer.ts      # Business profile generation
│   ├── lead-reply.ts           # Lead reply draft
│   ├── moderation.ts           # Content moderation
│   ├── help-assistant.ts       # FAQ / help chat
│   └── index.ts                # Public exports
└── README.md
```

---

## Environment Variables Required

```
OPENAI_API_KEY=sk-...
OPENAI_DEFAULT_MODEL=gpt-4o-mini
OPENAI_PREMIUM_MODEL=gpt-4o
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
```

---

## AI Safety Notes

- Strip PII (names, emails, phone numbers) before any OpenAI call
- Log all AI inputs/outputs for audit purposes
- Use `gpt-4o-mini` for speed/cost; `gpt-4o` only for quality-critical tasks
- AI output is always a draft — never auto-publish without human confirmation

See [AI-PLACEMENT-MAP.md](../../AI-PLACEMENT-MAP.md) for full strategy.
