# AI Placement Map – EK Marketplace

This document defines where AI features appear in the product, what each module does, and what should remain human-controlled. It guides development prioritisation and ensures AI is modular, safe, and genuinely useful.

---

## Principle

AI is used where it adds measurable value — **not** for thin content generation, fake activity, or replacing human judgment on safety and trust.

All AI features must be:
- **Feature-flagged** — off by default, enabled per environment
- **Isolated** — in `packages/ai` or `apps/worker`, never inline in route handlers or React components
- **Reversible** — human can always override or ignore AI output
- **Transparent** — users know when AI is helping

---

## Module Overview

### 1. Public AI (Buyer-facing)

| Feature | Description | Where | MVP? |
|---------|-------------|-------|------|
| Natural-language search | Convert free-text query to structured category/location filters | Search bar → `packages/ai` | Phase 3 |
| Service matching | Match buyer needs to relevant service categories | Browse/search page | Phase 3 |
| Recommendation | Surface related listings based on viewed items | Listing detail page | Phase 3 |
| FAQ assistant | Answer common questions via chat widget | Help center | Phase 3 |

**What should NOT be automated:** Trust signals, verified badges, pricing guidance.

---

### 2. Seller AI (Posting Copilot)

| Feature | Description | Where | MVP? |
|---------|-------------|-------|------|
| Title generator | Suggest optimised listing titles based on category/condition | Step 3 of posting flow | Phase 3 |
| Description writer | Draft a description from bullet points or short notes | Step 3 of posting flow | Phase 3 |
| Category suggestion | Predict best-fit category from title input | Step 2 of posting flow | Phase 3 |
| Duplicate detection | Warn if a very similar listing already exists | Step 8 (preview) | Phase 3 |
| Photo quality hint | Flag blurry/dark photos, suggest improvements | Step 7 (photos) | Phase 3 |

**What should NOT be automated:** Pricing decisions, condition labelling, final submission.

**MVP status:** Posting flow is built; AI hooks are marked with `// TODO` comments at the relevant steps. No AI calls in MVP.

---

### 3. Business AI (Business Copilot)

| Feature | Description | Where | MVP? |
|---------|-------------|-------|------|
| Profile writer | Draft business description from key facts | Business onboarding | Phase 3 |
| FAQ generator | Auto-generate FAQ from listing/service data | Business dashboard | Phase 3 |
| Lead reply drafts | Suggest response to buyer enquiries | Inbox / leads panel | Phase 3 |
| Review response | Draft polite reply to customer reviews | Review management | Phase 3 |

**What should NOT be automated:** Pricing quotes, booking confirmations, compliance statements.

---

### 4. Admin AI (Moderation & Operations)

| Feature | Description | Where | MVP? |
|---------|-------------|-------|------|
| Spam detection | Flag low-quality, duplicate, or suspicious listings | Moderation queue | Phase 3 |
| Risk scoring | Score a listing submission for policy violations | API: `POST /listings/draft` | Phase 3 |
| Support triage | Suggest category/priority for support tickets | Admin support inbox | Phase 3 |
| SEO gap analysis | Identify missing category or location pages | Admin content dashboard | Phase 4 |

**What should NOT be automated:** Final removal decisions, account bans, legal actions.

---

## MVP AI vs Later AI

| Phase | AI Work |
|-------|---------|
| Phase 1 (now) | Zero AI calls. Hooks/TODOs in place. `packages/ai` directory created. |
| Phase 2 | Add feature flags infrastructure. No AI calls yet. |
| Phase 3 | Implement Seller Copilot (title/description). Add Buyer semantic search. Admin spam scoring. |
| Phase 4 | Business Copilot, advanced moderation ML, recommendation engine. |

---

## Why AI Should Be Modular

- **Safety:** Isolating AI prevents a broken prompt or API outage from taking down core marketplace functions.
- **Cost control:** AI calls are expensive; feature flags allow fine-grained rollout and cost monitoring.
- **Iteration:** AI prompts and models change rapidly. Isolation makes upgrades easy.
- **Trust:** Users trust platforms that are transparent. Surfacing AI suggestions (not invisible overrides) builds confidence.

---

## Implementation Notes

- AI prompt templates live in `packages/ai/prompts/`
- AI worker jobs live in `apps/worker/src/jobs/`
- Feature flags: `FEATURE_AI_LISTING_ASSIST`, `FEATURE_AI_SEARCH`, `FEATURE_AI_MODERATION` in `.env`
- TODO: Add OpenAI client wrapper in `packages/ai/src/openai.ts` (Phase 3)
