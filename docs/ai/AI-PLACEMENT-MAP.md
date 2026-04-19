# AI Placement Map — EK Marketplace

> Defines where AI exists in the product, what each AI module does, and how it should be built.
>
> **Principle:** AI-first means AI where it genuinely helps — not AI everywhere to look impressive.

---

## Module Overview

| Module | Phase | Location |
|--------|-------|----------|
| Public search assistant | 3 | `packages/ai` |
| Seller listing assistant | 3 | `packages/ai` |
| Business profile writer | 3 | `packages/ai` |
| Admin moderation AI | 3 | `packages/ai` + `apps/worker` |
| Lead reply drafting | 3 | `packages/ai` |
| FAQ/help assistant | 3 | `packages/ai` |
| Spam/duplicate detection | 3 | `apps/worker` |
| Support triage | 4 | `apps/worker` |
| SEO content gap analysis | 4 | `apps/worker` |

---

## A. Public AI

AI-assisted features visible to all visitors (no account required).

### Homepage Search
- **What it does:** Accepts natural-language queries ("I need someone to service my fridge in Manchester") and returns relevant listings or businesses
- **Where it appears:** Homepage search bar
- **Input:** Free text from user
- **Output:** Search results ranked by relevance + intent match
- **Phase:** 3
- **Fallback:** Standard keyword search if AI is unavailable

### Marketplace Page Search
- **What it does:** Enriches category search with smart query expansion and intent detection
- **Where it appears:** Equipment marketplace, services marketplace listing pages
- **Input:** Search query + active filters
- **Output:** Ranked listings, optional "did you mean" suggestions
- **Phase:** 3
- **Fallback:** SQL full-text search

### Services Page Matching
- **What it does:** Matches service requests to suitable businesses based on job description, location, and category
- **Where it appears:** Post a Service Request flow
- **Input:** Job description, location, category
- **Output:** Suggested businesses to notify
- **Phase:** 3
- **Fallback:** Show all businesses in category

### Wanted Ads Intelligence
- **What it does:** Parses wanted ads to extract intent and match against live listings
- **Where it appears:** Wanted Ads section
- **Input:** Wanted ad text
- **Output:** Similar listings already on platform
- **Phase:** 4 (deferred — nice but not MVP)

### FAQ / Help Assistant
- **What it does:** Answers common questions using a knowledge base of help articles
- **Where it appears:** FAQ page, Help Centre, listing pages (contextual help)
- **Input:** User question
- **Output:** Relevant answer or link to help article
- **Phase:** 3
- **Fallback:** Static FAQ page

---

## B. Seller AI

AI tools available to users posting or managing listings.

### Listing Title Assistant
- **What it does:** Suggests an optimised listing title based on category, condition, and key details entered
- **Where it appears:** Post an Ad form — title field
- **Input:** Category, condition, partial description
- **Output:** 2–3 title suggestions
- **Phase:** 3

### Listing Description Writer
- **What it does:** Drafts a listing description from structured fields (model, age, condition, features)
- **Where it appears:** Post an Ad form — description field
- **Input:** Structured listing fields
- **Output:** Draft description in plain English
- **Phase:** 3

### Category Auto-Suggest
- **What it does:** Predicts the correct category and subcategory from a partial title or description
- **Where it appears:** Post an Ad flow — category selection step
- **Input:** Draft title or description
- **Output:** Suggested category path
- **Phase:** 3
- **Note:** User always confirms — AI does not force a category

### Missing Info Detection
- **What it does:** Flags likely missing fields before a listing is submitted (e.g. condition, price, location)
- **Where it appears:** Post an Ad form — review step
- **Input:** Listing draft data
- **Output:** List of suggested improvements ("Your listing is missing a condition — buyers are 3× more likely to enquire")
- **Phase:** 3

### Edit Ad Suggestions
- **What it does:** When editing an existing listing, suggests improvements to low-performing listings
- **Where it appears:** My Listings dashboard — edit view
- **Input:** Listing data + view/enquiry stats
- **Output:** 1–3 actionable improvement suggestions
- **Phase:** 4

---

## C. Business AI

AI tools for trade/business accounts.

### Business Profile Writer
- **What it does:** Generates a professional business description from basic inputs (name, services, location, years trading)
- **Where it appears:** Create/edit Business Profile form
- **Input:** Business name, category, services, location
- **Output:** Draft professional description (2–3 paragraphs)
- **Phase:** 3

### Lead Reply Drafting
- **What it does:** Suggests a professional reply to an inbound enquiry or service request
- **Where it appears:** Business inbox / leads section
- **Input:** Enquiry text, business profile context
- **Output:** Draft reply
- **Phase:** 3
- **Note:** Business always edits and sends — AI does not auto-reply

### FAQ Generation
- **What it does:** Suggests FAQ questions and answers a business can publish on their profile
- **Where it appears:** Business Profile → FAQ section
- **Input:** Business category, services, existing description
- **Output:** 5–10 suggested Q&A pairs
- **Phase:** 3

### Review Response Assistant
- **What it does:** Drafts a professional response to a customer review (positive or negative)
- **Where it appears:** Business Dashboard → Reviews tab
- **Input:** Review text and rating
- **Output:** Draft response
- **Phase:** 4

---

## D. Admin AI

Internal tools for platform operators.

### Moderation Assistant
- **What it does:** Scores new listings for policy violations, misleading content, or low quality
- **Where it appears:** Admin moderation queue
- **Input:** Listing title, description, images (image analysis Phase 4)
- **Output:** Risk score (0–1), flagged issues, suggested action
- **Phase:** 3

### Spam Detection
- **What it does:** Detects repeat offenders, scraped content, and fake listings
- **Where it appears:** Automated — runs on listing submit via worker queue
- **Input:** Listing data, user history
- **Output:** Spam probability score, auto-reject if above threshold
- **Phase:** 3
- **Runs in:** `apps/worker`

### Duplicate Listing Detection
- **What it does:** Identifies listings that appear to be duplicates of existing live listings
- **Where it appears:** Automated — runs on listing submit
- **Input:** New listing content
- **Output:** List of potentially duplicate listings with similarity score
- **Phase:** 3
- **Runs in:** `apps/worker`

### Support Triage
- **What it does:** Classifies inbound support messages by intent (billing, listing issue, abuse report, general) and routes accordingly
- **Where it appears:** Admin support inbox
- **Input:** Support message text
- **Output:** Category tag + suggested priority
- **Phase:** 4

### SEO Content Gap Analysis
- **What it does:** Identifies categories or location combinations with thin content and suggests improvements
- **Where it appears:** Admin content tools
- **Input:** Site structure data, listing density
- **Output:** Report of gaps and recommendations
- **Phase:** 4

---

## What Should NOT Be Automated

The following must always involve human action or review:

| Action | Reason |
|--------|--------|
| Sending messages to buyers/sellers | Risk of spam, impersonation, or incorrect information |
| Approving business account upgrades | Financial/trust decision |
| Publishing AI-written pages as-is | SEO/quality risk — human must review |
| Auto-banning users | False positive risk — human must confirm |
| Auto-replying to customer enquiries | Trust and legal risk |
| Generating pricing or valuations | Liability risk |

---

## MVP AI vs Later AI

### Phase 3 (MVP AI — build these first)
- Category auto-suggest
- Listing title/description assistant
- Spam and duplicate detection (worker)
- Moderation scoring
- Basic natural-language search
- Business profile writer
- FAQ generation

### Phase 4 (Later AI — defer these)
- Support triage
- SEO content gap analysis
- Edit ad suggestions
- Review response assistant
- Wanted ads matching
- Price benchmarking
- Recommendation engine

---

## Why AI Must Be Modular

1. **Cost control** — AI calls have per-token costs. Disabling unused features reduces spend.
2. **Reliability** — If OpenAI has an outage, the core marketplace must still work.
3. **Flexibility** — Swapping from OpenAI to Anthropic or a local model should not require rewriting the product.
4. **Testing** — AI modules can be mocked independently in tests.
5. **Feature flags** — `FEATURE_AI_ENABLED=false` disables all AI with one config change.

All AI calls are routed through `packages/ai` which handles:
- Model selection
- Prompt versioning
- Error handling and fallbacks
- Response parsing and validation
- Rate limiting

---

## Technical Architecture

```
packages/ai/
├── src/
│   ├── client.ts          # OpenAI client initialisation
│   ├── router.ts          # Model routing (gpt-4o-mini default, gpt-4o for complex tasks)
│   ├── prompts/           # Versioned prompt templates
│   │   ├── listing.ts     # Listing title/description prompts
│   │   ├── moderation.ts  # Moderation scoring prompts
│   │   ├── business.ts    # Business profile prompts
│   │   └── search.ts      # Search query expansion prompts
│   ├── modules/           # Individual AI feature implementations
│   │   ├── suggest-listing.ts
│   │   ├── suggest-category.ts
│   │   ├── moderate.ts
│   │   └── search-rank.ts
│   └── index.ts           # Public exports
```

All modules export typed async functions. All functions accept a feature-flag check before execution.
