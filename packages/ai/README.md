# packages/ai

EK Marketplace — AI Services Package

## Purpose

Isolates all AI/LLM integration logic from app code. All prompts, model routing, and AI tool wrappers live here — keeping `apps/api` and `apps/worker` clean.

## Why Modular

AI features are fast-moving. By isolating them here:
- Model providers can be swapped without touching app code
- Prompts can be versioned and tested independently
- AI features can be feature-flagged without app changes
- Cost controls and guardrails are centralised

---

## Planned Structure

```
src/
  prompts/              ← Versioned prompt templates
    listing-title.ts    ← Generate listing title from specs
    listing-desc.ts     ← Generate listing description
    business-profile.ts ← Business profile writer
    moderation.ts       ← Moderation assessment prompt
    search.ts           ← Natural language → search filters
    
  models/               ← Model routing and provider wrappers
    openai.ts           ← OpenAI API client wrapper
    router.ts           ← Route tasks to appropriate model/tier
    
  tools/                ← AI tool/function definitions
    category.tool.ts    ← Suggest listing categories
    condition.tool.ts   ← Detect item condition from description
    
  evaluation/           ← Test cases and expected outputs
    prompts.test.ts     ← (TODO) Prompt regression tests
    
  guardrails/           ← Safety and quality checks
    content-filter.ts   ← Flag inappropriate content
    spam-detector.ts    ← Detect spam patterns
    
  index.ts              ← Barrel export
```

---

## AI Feature Map

| Feature | Phase | Module |
|---------|-------|--------|
| Listing title generation | Phase 3 | `prompts/listing-title.ts` |
| Listing description writer | Phase 3 | `prompts/listing-desc.ts` |
| Category suggestion | Phase 3 | `tools/category.tool.ts` |
| Business profile writer | Phase 3 | `prompts/business-profile.ts` |
| AI-powered search | Phase 3 | `prompts/search.ts` |
| Spam/moderation detection | Phase 3 | `guardrails/spam-detector.ts` |
| Lead reply drafting | Phase 3 | `prompts/lead-reply.ts` |

---

## Environment Variables

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
AI_MAX_TOKENS=2000
```

---

## TODOs

- [ ] Install OpenAI SDK: `npm install openai`
- [ ] Build first prompt: listing title generation
- [ ] Add model router (cheap model for classification, expensive for generation)
- [ ] Add guardrails for content moderation
- [ ] Add evaluation cases to prevent prompt regressions
- [ ] Connect to apps/worker for async AI jobs
