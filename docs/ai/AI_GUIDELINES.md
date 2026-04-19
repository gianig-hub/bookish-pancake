# EK Marketplace — AI Guidelines

How to add, use, and maintain AI features in this codebase.

---

## Core Rules

1. **All AI code lives in `packages/ai`**  
   Never call OpenAI or any AI API directly from `apps/web` or `apps/api`.

2. **Feature flags required**  
   Every AI feature must be guarded by an environment variable flag.  
   Example: `AI_LISTING_ASSIST_ENABLED=true`

3. **Non-AI fallback required**  
   Every AI-powered feature must work (possibly with reduced UX) when AI is disabled.

4. **Users review AI output before submission**  
   Never auto-post AI-generated content to the database without user confirmation.

5. **Async for moderation**  
   AI moderation runs as a background job (via worker queue), not in the request path.

---

## Adding a New AI Feature

### Step 1: Define types in `packages/ai/src/index.ts`

```typescript
export interface MyFeatureInput { ... }
export interface MyFeatureOutput { ... }
```

### Step 2: Implement the service function

```typescript
export async function myAiFeature(
  input: MyFeatureInput
): Promise<MyFeatureOutput> {
  if (!process.env.MY_FEATURE_ENABLED) {
    throw new Error('Feature not enabled')
  }
  // Call OpenAI or other provider
}
```

### Step 3: Add environment variable to `.env.example`

```env
MY_FEATURE_ENABLED=false
OPENAI_API_KEY=your_key_here
```

### Step 4: Call from API or Worker

```typescript
import { myAiFeature } from '@ek/ai'
```

---

## Prompt Engineering Guidelines

- Always include context: "You are a UK marketplace assistant..."
- Be specific about output format (word count, structure, field names)
- Include "Do not invent specifications" for product-related prompts
- Test prompts with edge cases before deploying

---

## Cost Management

| Model | Use Case | Cost |
|-------|---------|------|
| `gpt-4o-mini` | Default for all features | Low |
| `gpt-4o` | Complex tasks only (if needed) | High |

- Log token usage per request
- Set `max_tokens` limits on all calls
- Consider caching repeated queries

---

## Error Handling

```typescript
try {
  const result = await assistListingCreation(input)
  return result
} catch (err) {
  // Log error but don't break the user flow
  console.error('[AI] Listing assist failed:', err)
  // Return null → UI falls back to manual input
  return null
}
```
