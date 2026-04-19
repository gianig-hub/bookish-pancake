# AI Guidelines — EK Marketplace

## Overview

AI features in EK Marketplace are isolated in the `packages/ai` package.
No AI code should exist in `apps/` or other packages.

## Principles

### 1. Interfaces First
Before writing any AI implementation, define the interface in `packages/ai/src/index.ts`.
Apps depend on the interface, not the implementation.

```typescript
// ✅ Good — apps use the interface
import type { ListingAIService } from '@ek/ai';

// ❌ Bad — apps import implementation details
import { OpenAIListingService } from '@ek/ai/openai';
```

### 2. Never Block the User
AI calls are slow and can fail. Never make the user wait for AI:
- Use Bull queues in `apps/worker` for async AI processing
- Return a response to the user immediately
- Apply AI results in the background, notify if needed

```typescript
// ✅ Good
const job = await aiQueue.add({ listingId, title, description });
return { jobId: job.id }; // respond immediately

// ❌ Bad
const description = await ai.generateDescription(input); // blocks user
```

### 3. Feature Flags
Every AI feature must check `AI_ENABLED` and fall back gracefully:

```typescript
import { AI_ENABLED } from '@ek/ai';

if (!AI_ENABLED) {
  return { description: '' }; // graceful fallback
}
```

### 4. Mark AI-Generated Content
AI-generated content must be clearly marked in the database:

```prisma
model Listing {
  // ...
  aiGeneratedTitle Boolean @default(false)
  aiGeneratedDescription Boolean @default(false)
}
```

### 5. No Hallucinated Facts
AI must never invent technical specifications, prices, or warranty details.
Prompts must explicitly forbid fabrication:

> "If you do not have factual information about a specification, write 'Please confirm with seller'."

### 6. Cost Monitoring
- Use the smallest viable model for each task (e.g. `gpt-4o-mini` for moderation)
- Log token usage per job
- Set `max_tokens` on every call
- Cache responses where safe (e.g. category suggestions for the same title)

## Planned AI Features

| Feature | Service | Queue | Status |
|---|---|---|---|
| Listing title generation | `ListingAIService` | `ai-listing` | TODO |
| Listing description | `ListingAIService` | `ai-listing` | TODO |
| Category suggestion | `ListingAIService` | `ai-listing` | TODO |
| Spam/moderation check | `ModerationAIService` | `ai-moderation` | TODO |
| Natural language search | `SearchAIService` | sync (fast) | TODO |
| FAQ chatbot | `SupportAIService` | `ai-support` | TODO |

## Adding a New AI Feature

1. Define the interface method in `packages/ai/src/index.ts`
2. Implement in `packages/ai/src/services/<feature>.service.ts`
3. Export from `packages/ai/src/index.ts`
4. Create the Bull queue in `apps/worker/src/queues/<feature>.queue.ts`
5. Register the queue processor in `apps/worker/src/index.ts`
6. Add feature flag check
7. Document the prompt template in `packages/ai/src/README.md`
8. Write unit tests with mocked responses

## Testing AI Features

Never call real AI APIs in unit tests. Mock the service:

```typescript
jest.mock('@ek/ai', () => ({
  AI_ENABLED: true,
  listingAIService: {
    generateTitle: jest.fn().mockResolvedValue('Daikin 2.5kW AC Unit'),
  },
}));
```

Use integration tests with real API calls only in CI with a test budget.
