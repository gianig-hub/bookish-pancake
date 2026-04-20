# AI Services — Guidelines

## Principles

1. **All AI code lives here.** No AI calls from `apps/` or other `packages/`. Apps call service interfaces only.
2. **Interfaces first.** Define the service interface before implementing it.
3. **Feature-flagged.** Every AI feature must respect the `AI_ENABLED` flag.
4. **Never block the user.** AI calls happen asynchronously (worker queue) or with graceful fallback.
5. **No hallucinated data.** AI-generated content must be clearly marked and never used as ground truth.
6. **Cost-conscious.** Use the smallest viable model. Cache results where appropriate.

## Adding a New AI Feature

1. Define the interface in `src/index.ts`
2. Create the implementation in `src/services/<feature>.ts`
3. Register it in `src/index.ts`
4. Add the corresponding worker queue job in `apps/worker/src/queues/`
5. Document the prompt template in this file

## Prompt Templates

### Listing Title Generation
```
You are an expert UK marketplace listing writer for air conditioning and refrigeration equipment.
Given: brand={brand}, model={model}, category={category}, condition={condition}
Write a concise, accurate, SEO-friendly listing title (max 80 chars). No emojis. No caps.
```

### Listing Description Generation
```
You are writing a marketplace listing description for UK buyers.
Product: {title}. Condition: {condition}. Notes: {sellerNotes}
Write a helpful, factual 3-paragraph description. No exaggeration. Flag any missing info as unknown.
```

### Moderation Check
```
You are a marketplace trust & safety moderator.
Review this listing: title={title}, description={description}
Return JSON: { approved: boolean, flags: string[], confidence: number }
Flag: spam, prohibited items, fake prices, misleading claims.
```

## TODO
- [ ] Implement `ListingAIServiceImpl` (OpenAI)
- [ ] Implement `ModerationAIServiceImpl`
- [ ] Implement `SearchAIServiceImpl`
- [ ] Add response caching layer
- [ ] Add usage tracking / cost monitoring
