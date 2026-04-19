# AI Placement Map — EK Marketplace

This document defines where AI is used in the product, what each AI module does, and what must stay human-controlled.

AI is modular, isolated, and phased. It enhances the marketplace — it does not replace human judgment on critical decisions.

---

## A. Public AI (Buyer-facing)

These AI features are visible to all site visitors. They help buyers find what they are looking for faster.

### Homepage
- Natural-language search bar powered by AI query understanding
- Category suggestions based on search input
- "What are you looking for?" guided flow for first-time visitors

### Marketplace Pages (Equipment)
- Smart filter suggestions based on search query
- Related listings recommendations
- "Similar items" module on listing detail pages

### Services Pages
- Service matching based on location and requirement description
- "Describe your problem" free-text input → matches to service categories and engineers

### Wanted Ads
- AI-assisted "What do you need?" form that structures the wanted ad
- Matches existing listings to new wanted ads (post-publish notification)

### FAQ / Help Center
- AI-powered FAQ assistant (answers common questions, routes to relevant help articles)
- "I need help with…" chatbot for buyers

---

## B. Seller AI (Listing creation and management)

These AI features help sellers create better listings faster and with less friction.

### Post Ad Flow
- Category suggestion based on title input
- Title improvement suggestions ("This title could be clearer — try: …")
- Description generation from structured fields (condition, make, model, location)
- Missing info detection ("Your listing is missing: price, location, condition")

### Edit Ad Flow
- Description rewrite assistant
- Category correction suggestions if listing appears miscategorised
- Photo prompt suggestions ("Buyers convert more with these photo angles")

### Listing Quality Score
- Completeness score shown to seller before publishing
- Flagging of likely-spam content before submission

---

## C. Business AI (Business profile and lead management)

These features are available on paid business plans.

### Business Profile Writer
- Generates a professional business description from structured inputs (name, services, location, years in trade)
- Tone: professional, trustworthy, UK-focused

### Lead Reply Drafting
- When a lead comes in, suggests a draft reply for the business owner
- Draft is shown as a suggestion — not sent automatically

### FAQ Generation
- Generates a starter FAQ for a business profile based on their service categories
- Owner reviews and edits before publishing

### Review Reply Drafting
- When a review is posted, suggests a draft reply
- Owner reviews and approves — AI does not post on their behalf

---

## D. Admin AI (Internal moderation and operations)

These features are internal tools for the marketplace admin team.

### Moderation Assistant
- Flags listings that may violate policies for human review
- Provides a reason for each flag (e.g., "suspected spam", "price anomaly", "prohibited item")
- Human moderator makes the final decision

### Spam Detection
- Scores incoming listings and user registrations for spam probability
- High-confidence spam (score > 0.95) is quarantined for review — not auto-deleted
- Low-confidence flags are surfaced to moderator queue

### Duplicate Listing Detection
- Detects listings that appear to be duplicates of existing active listings
- Alerts admin for review — does not auto-remove

### Support Triage
- Categorises incoming support requests (refund, dispute, technical, account)
- Routes to appropriate internal queue
- Suggests draft response for common queries

### Content Gap Suggestions
- Analyses search queries that return no results
- Surfaces category or content gaps to admin team for action (new categories, new FAQ content, etc.)

---

## What Must NOT Be Automated

The following must always have a human in the loop:

| Action | Reason |
|---|---|
| Permanently banning a user | Irreversible, requires human judgement |
| Removing a listing without notice | User trust and legal risk |
| Posting on behalf of a business | Brand liability |
| Approving payment disputes | Financial and legal risk |
| Publishing FAQ or guide content | Accuracy and trust risk |
| Contacting users with AI-generated messages without disclosure | Regulatory and trust risk |

---

## MVP AI Features vs Later AI Features

### MVP AI Features (Phase 1–2, low complexity)
These should be considered for early implementation if resources allow:

- Missing info detection in post ad flow (rule-based first, AI later)
- Basic spam scoring on listing submission
- FAQ assistant with static knowledge base

### Phase 3 AI Features (require validated marketplace)
These require live data and user behaviour to be meaningful:

- Natural-language search
- Listing recommendations
- Category suggestions based on input
- Seller description generation
- Business profile writer
- Lead reply drafting

### Phase 4 / Later AI Features (advanced)
These require scale, data, and infrastructure investment:

- Custom fine-tuned models for UK refrigeration domain
- AI-powered pricing suggestions based on market data
- Predictive lead scoring
- Automated SEO content generation (with strict quality gate)

---

## Why AI Must Be Modular, Not Random

AI should be treated as a **service layer**, not scattered code. This means:

1. **All AI calls go through `packages/ai`** — not directly from web or api controllers
2. **AI is toggled by feature flags** — `AI_ENABLED`, `AI_MODERATION_ENABLED`, etc.
3. **Models are swappable** — the interface stays the same whether using OpenAI, Anthropic, or a local model
4. **Prompts are versioned** — prompts live in `packages/ai/prompts/` and are treated like code
5. **AI results are logged** — for evaluation, debugging, and safety review
6. **Failures are graceful** — if AI is unavailable, the feature degrades to a non-AI fallback (e.g., show the form without suggestions)

This modularity means:
- AI can be turned off without breaking the product
- AI providers can be changed without rewriting business logic
- AI quality can be evaluated and improved independently
- AI costs can be tracked and controlled

---

*See `packages/ai/README.md` for implementation details.*
*See `ROADMAP.md` for phase-by-phase AI delivery timeline.*
