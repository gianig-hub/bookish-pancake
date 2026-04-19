# EK Marketplace — AI Placement Map

Where AI is used in the EK Marketplace and how.

---

## Summary Matrix

| Feature | AI Type | Trigger | Phase |
|---------|---------|---------|-------|
| Listing title generator | LLM (GPT-4o-mini) | Seller clicks "Generate" | Phase 2 |
| Listing description writer | LLM (GPT-4o-mini) | Seller clicks "Generate" | Phase 2 |
| Category suggestion | LLM classification | On listing form input | Phase 2 |
| Condition suggestion | LLM classification | On title/description input | Phase 2 |
| Spam/scam moderation | LLM scoring | On listing submit (async) | Phase 2 |
| Duplicate detection | Embedding similarity | On listing submit (async) | Phase 3 |
| Natural-language search | Query enhancement | On search input | Phase 2 |
| FAQ chatbot | RAG / LLM | Help centre widget | Phase 3 |
| Review response assist | LLM | Business dashboard | Phase 3 |
| SEO content gap analysis | LLM | Admin dashboard | Phase 3 |

---

## 1. Listing Creation Assistant

**Where**: Post-an-ad form (apps/web)  
**How**: Seller fills in basic details → clicks "Improve with AI" → AI generates/refines title and description  
**Service**: `packages/ai` → `assistListingCreation()`  
**Model**: OpenAI GPT-4o-mini  
**Feature flag**: `AI_LISTING_ASSIST_ENABLED`

**Prompt template** (to be refined):
```
You are a UK marketplace listing assistant for HVAC and refrigeration equipment.
Given the input details, generate a clear, accurate, and SEO-friendly:
1. Title (max 80 characters)
2. Description (150-300 words)
Focus on key specs, condition, and benefits. Do not invent specifications.
```

---

## 2. Moderation Scoring

**Where**: Background worker (apps/worker)  
**How**: Listing submitted → API queues moderation job → Worker calls AI → Score stored  
**Service**: `packages/ai` → `moderateListing()`  
**Model**: OpenAI GPT-4o-mini  
**Feature flag**: `AI_MODERATION_ENABLED`

**Score meaning**:
- 0–30: Clean — auto-approve
- 31–70: Review — add to manual queue
- 71–100: High risk — hold for admin review

---

## 3. Natural-Language Search

**Where**: Search bar (apps/web → apps/api)  
**How**: User types query → API optionally calls AI to enhance → structured filters extracted  
**Service**: `packages/ai` → `enhanceSearchQuery()`  
**Feature flag**: `AI_SEARCH_ENABLED`

**Example**:
- Input: "second hand Samsung inverter AC London"
- Output: `{ brand: "Samsung", condition: "used", category: "air-conditioning", region: "London" }`

---

## AI Principles

1. **Optional**: All AI features are feature-flagged and can be disabled
2. **Async**: Heavy AI tasks (moderation) are processed in the background queue
3. **Isolated**: All AI calls go through `packages/ai` — never directly from apps
4. **Observable**: Log all AI calls, latency, and errors
5. **Fallback**: Every AI feature has a non-AI fallback path
6. **Cost-aware**: Use GPT-4o-mini by default; GPT-4o only where quality demands
7. **No hallucinations in listings**: Never auto-post AI content without user review
