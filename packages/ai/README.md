# packages/ai — EK Marketplace AI Services

Modular AI service layer. All AI calls in the platform should go through this package.

## Design Principles

- **Isolated** — AI logic stays in this package; apps call the interfaces
- **Typed** — All inputs and outputs have TypeScript types
- **Swappable** — Provider can be changed without modifying calling code
- **Observable** — Log all AI calls, latency, and errors
- **Guarded** — Feature flags control which AI features are active

## Service Interfaces

| Function | Description | Phase |
|----------|-------------|-------|
| `assistListingCreation` | Generate/improve listing title and description | Phase 2 |
| `moderateListing` | Score listing for spam/scam | Phase 2 |
| `enhanceSearchQuery` | Parse natural-language search to filters | Phase 2 |

## Usage

```typescript
import { assistListingCreation, moderateListing } from '@ek/ai'

// Generate listing content
const result = await assistListingCreation({
  title: 'Samsung AC unit',
  category: 'air-conditioning',
})

// Moderate a listing
const mod = await moderateListing({
  listingId: '123',
  title: result.title,
  description: result.description,
})
```

## Environment Variables

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o-mini
AI_LISTING_ASSIST_ENABLED=true
AI_MODERATION_ENABLED=false
```

## See Also

- [AI Placement Map](../docs/ai/AI_PLACEMENT_MAP.md)
- [AI Guidelines](../docs/ai/AI_GUIDELINES.md)
- [Moderation Strategy](../docs/ai/MODERATION_STRATEGY.md)
