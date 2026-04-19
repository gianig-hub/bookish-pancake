# EK Marketplace — AI Placement Map

This document defines where, how, and when AI is integrated into EK Marketplace. It is a planning and safety reference for the whole project.

---

## AI Principle

> Use AI where it adds **real, measurable value** to users. Never use AI to generate thin content, replace quality, or create something a user could not easily do themselves.

AI is an **enhancement layer** — the marketplace works without it. AI makes it faster, smarter, and more valuable.

---

## Phase Gating

| Phase | AI Enabled? | Scope |
|-------|-------------|-------|
| Phase 1 | ❌ No | No AI features — focus on core marketplace |
| Phase 2 | ⚠️ Planning | Design AI prompts and service interfaces |
| Phase 3 | ✅ Yes | AI features go live gradually |
| Phase 4 | ✅ Yes | Expand, refine, and learn from real usage |

---

## AI Placement Map

### 🛒 Buyer AI

| Feature | Placement | Priority | Phase |
|---------|-----------|----------|-------|
| Natural language search | Search bar overlay | High | 3 |
| Service matching | Services page, request flow | High | 3 |
| Equipment comparison assistant | Listing detail page | Medium | 3 |
| FAQ / help chatbot | Help centre sidebar | Medium | 3 |
| "What do I need?" wizard | Homepage, services page | Low | 4 |

**Notes:**
- Search must still work without AI (fallback to standard keyword search)
- Chatbot must have a human escalation path
- Do not replace category browsing with AI-only search

---

### 📝 Seller AI

| Feature | Placement | Priority | Phase |
|---------|-----------|----------|-------|
| Listing title generator | Post ad form (step 1) | High | 3 |
| Description writer | Post ad form (step 2) | High | 3 |
| Category auto-suggest | Post ad form (step 1) | Medium | 3 |
| Condition / spec suggestions | Post ad form (step 3) | Low | 3 |
| Photo guidance (text, not CV) | Post ad form (photos step) | Low | 4 |

**Notes:**
- All AI-generated content must be editable by the user before posting
- AI suggestions must be clearly labelled ("AI suggested — please review")
- User is always responsible for final listing content

---

### 🏢 Business AI

| Feature | Placement | Priority | Phase |
|---------|-----------|----------|-------|
| Business profile writer | Business onboarding | High | 3 |
| Lead reply assistant | Business dashboard, lead inbox | High | 3 |
| FAQ generator for profiles | Business dashboard | Medium | 3 |
| Review response suggestions | Business dashboard | Low | 4 |

**Notes:**
- AI-generated profile content must be approved by the business before going live
- Lead replies are suggestions only — business sends manually

---

### 🛡️ Admin / Moderation AI

| Feature | Placement | Priority | Phase |
|---------|-----------|----------|-------|
| Spam and duplicate detection | Listing submission pipeline | High | 3 |
| Risk scoring for new listings | Moderation queue | High | 3 |
| Support ticket triage | Admin panel | Medium | 4 |
| SEO / content gap analysis | Admin panel | Low | 4 |

**Notes:**
- Moderation AI is a tool for human moderators, not a replacement
- Always allow human override of AI moderation decisions
- Log all AI moderation decisions for review

---

## AI Service Layer (`packages/ai`)

All AI features are centralised in `packages/ai/`. This keeps AI logic separate from application code and makes it easy to:
- Swap providers (OpenAI ↔ Anthropic ↔ Ollama for local dev)
- Disable AI entirely for testing
- Monitor and log AI usage centrally

### Service Structure

```
packages/ai/
  src/
    search/       # Semantic search, ranking
    listing/      # Title, description, category AI
    moderation/   # Spam detection, risk scoring
    business/     # Profile writing, lead replies
    buyer/        # Comparison, FAQ, matching
  prompts/        # Prompt templates (versioned)
  lib/
    client.ts     # LLM client (OpenAI, Anthropic)
    logger.ts     # AI usage logging
```

---

## Safety Rules

1. **Never block on AI** — if AI is unavailable, the feature falls back gracefully
2. **Always label AI content** — users must know when something is AI-generated
3. **Always allow human override** — users and admins can edit or reject AI output
4. **Never auto-publish AI content** — AI-generated listings, profiles, and replies require user confirmation
5. **Log all AI operations** — for review, debugging, and cost monitoring
6. **Rate limit AI calls** — prevent abuse and control API costs
7. **No AI in Phase 1** — prove the core marketplace works first

---

## Provider Strategy

| Environment | Provider |
|-------------|----------|
| Local dev | Ollama (local model, no API cost) or mocked |
| Staging | OpenAI (GPT-4o mini for cost control) |
| Production | OpenAI (GPT-4o) or Anthropic (Claude) |

Switch providers by updating environment variable:
```env
AI_PROVIDER=openai
# or
AI_PROVIDER=anthropic
# or
AI_PROVIDER=ollama
```

---

## Cost Control

- Use smaller/cheaper models for high-volume tasks (moderation, suggestions)
- Cache AI responses where appropriate (avoid repeat calls for same inputs)
- Set per-user and per-day AI call limits
- Monitor spend with OpenAI / Anthropic usage dashboards
- Budget alert at 75% of monthly AI spend limit

---

> **Status:** AI placement planned. No AI features in Phase 1. Phase 3 implementation starts after core marketplace is stable.
