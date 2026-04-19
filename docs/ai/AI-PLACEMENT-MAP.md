# AI Placement Map — EK Marketplace

> **Status:** Planning document.
> No AI endpoints are built yet. This map defines where AI should go and what it should do.

---

## Principle: AI Must Be Modular

All AI logic lives in `packages/ai` or `apps/worker`. **Never** inline OpenAI calls directly in page components or API route handlers. This keeps the AI replaceable, testable, and auditable.

---

## A. Public AI

Features visible to unauthenticated users.

| Feature | Where | What it does | MVP? |
|---------|-------|--------------|------|
| Smart search bar | Homepage, category pages | Understands natural language queries, maps to categories/keywords | Phase 3 |
| "Not sure what you need?" helper | Homepage | Asks 2-3 questions, suggests category or service | Phase 3 |
| FAQ answer preview | Help centre | Answers common questions inline | Phase 3 |
| Category suggestion on search | Search results | "Did you mean commercial refrigeration?" | Phase 3 |

---

## B. Seller AI

Features for users posting or managing listings.

| Feature | Where | What it does | MVP? |
|---------|-------|--------------|------|
| Title assistant | Post ad — title field | Suggests a clear, SEO-friendly title from basic input | Phase 3 |
| Description writer | Post ad — description field | Generates a structured description from key facts | Phase 3 |
| Category suggester | Post ad — category step | Recommends the correct category from title/description | Phase 3 |
| Missing info detector | Post ad — review step | Flags missing info (no price, no location, no photos) | Phase 3 |
| Edit assistant | Edit listing | Suggests improvements to weak listings | Phase 4 |

**What NOT to automate for sellers:**
- Final price setting (user decision)
- Choosing whether to mark urgent/featured (user decision)
- Image selection or cropping (user decision)

---

## C. Business AI

Features for dealer/business accounts.

| Feature | Where | What it does | MVP? |
|---------|-------|--------------|------|
| Business profile writer | Business setup | Generates a professional description from basic info | Phase 3 |
| Lead reply drafting | Lead inbox | Suggests a reply to an enquiry | Phase 4 |
| FAQ generator | Business profile | Generates suggested FAQs from business info | Phase 4 |
| Review reply drafting | Reviews section | Suggests professional reply to a customer review | Phase 4 |

**What NOT to automate for businesses:**
- Actual lead responses (must be human-reviewed before sending)
- Pricing decisions
- Whether to accept or reject a job enquiry

---

## D. Admin AI

Features for platform administrators and moderation.

| Feature | Where | What it does | MVP? |
|---------|-------|--------------|------|
| Spam detection | Listing submission | Flags probable spam listings before they go live | Phase 3 |
| Duplicate listing detection | Listing submission | Detects near-duplicate listings | Phase 3 |
| Moderation assistant | Moderation queue | Suggests action (approve/reject/edit) with reason | Phase 3 |
| Support triage | Support inbox | Categorises and prioritises incoming support requests | Phase 4 |
| Content gap suggestions | Admin dashboard | Identifies missing categories or underserved areas | Phase 4 |

**What NOT to automate for admins:**
- Final moderation decision (AI suggests, human confirms)
- Account suspension / banning (always human decision)
- Pricing changes to platform plans

---

## MVP AI Features (Phase 3)

These are the minimum AI features to build first:

1. **Spam and duplicate detection** — low risk, high impact, keeps platform clean
2. **Listing title/description assistant** — improves listing quality, drives engagement
3. **Category suggester** — improves search relevance

Everything else is Phase 4 or later.

---

## Why AI Must Stay Modular

- **Replaceability:** OpenAI is not the only provider. If costs rise, swap models.
- **Auditability:** Isolated AI calls are easier to log, review, and fix.
- **Rate limiting:** Centralised AI usage means one place to throttle.
- **Testing:** Prompts and responses can be unit tested in `packages/ai`.
- **Guardrails:** Safety filters, content policies, and fallbacks live in one place.

---

## AI Module Structure (target — Phase 3)

```
packages/ai/
  prompts/
    listing-title.ts
    listing-description.ts
    category-suggest.ts
    spam-detect.ts
    business-profile.ts
  routing/
    model-router.ts     → Selects model based on task (GPT-4o vs mini)
  guardrails/
    content-filter.ts   → Flags unsafe or off-topic outputs
  evaluations/
    listing-title.eval.ts
  index.ts
```
