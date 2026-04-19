# packages/ai — AI Service Layer

## Responsibility

The AI package provides reusable AI service functions for the marketplace.

**This package is designed for Phase 3. Do not implement Phase 1 functionality here.**

## Planned AI Features

### Phase 3 — Seller AI
- `generateListingTitle(prompt)` — AI-generated listing title
- `generateListingDescription(details)` — AI-generated description
- `suggestCategory(title, description)` — Category suggestion
- `suggestCondition(description)` — Condition suggestion

### Phase 3 — Search AI
- `semanticSearch(query, listings)` — Natural language search
- `rankListings(query, listings)` — Relevance ranking

### Phase 3 — Moderation AI
- `detectSpam(listing)` — Spam/abuse detection
- `detectDuplicate(listing, existing)` — Duplicate detection

## Design Principles

- **Swappable**: Can switch between OpenAI / Anthropic / local models
- **Lazy-loaded**: Disabled in Phase 1 — zero cost until needed
- **Fallback-safe**: Every AI function has a non-AI fallback
- **Rate-limited**: Never expose AI directly to user input without limits

## Structure

```
packages/ai/
├── src/
│   ├── index.ts          # Exports (all disabled in Phase 1)
│   ├── listing.ts        # Listing generation helpers
│   ├── search.ts         # Search ranking helpers
│   └── moderation.ts     # Spam/moderation helpers
└── README.md
```

## Usage (Phase 3)

```typescript
import { generateListingDescription } from '@ek/ai';

const description = await generateListingDescription({
  category: 'refrigeration',
  condition: 'used',
  brand: 'Bitzer',
  model: 'CS-8573',
});
```

## Environment Variables

```bash
OPENAI_API_KEY=sk-...       # Required for OpenAI
OPENAI_MODEL=gpt-4o-mini    # Cheaper model for bulk tasks
# or
ANTHROPIC_API_KEY=...       # Alternative to OpenAI
```
