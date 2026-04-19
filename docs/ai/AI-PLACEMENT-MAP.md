# EK Marketplace — AI Placement Map

**docs/ai/AI-PLACEMENT-MAP.md**

---

## Principle: AI Where It Adds Real Value

AI should enhance the platform — not replace real content or real listings with low-quality generated output.

**AI must be modular** because:
- AI providers and models change rapidly
- Costs must be controlled independently of app logic
- AI features need independent testing, versioning, and rollback
- Not every feature needs the same AI model or tier

All AI code lives in `packages/ai`. Apps call it as a service, not inline.

---

## A. Public AI

### Homepage
- **Natural language search:** Parse free-text queries into structured filters (category, location, price range, condition)
- **Phase 3**

### Marketplace / Listing Pages
- **Related listing suggestions:** "You might also like..." (embedding-based similarity)
- **Phase 3**

### Services Pages
- **Service matching:** Match buyer needs to available service providers by area + skill
- **Phase 3**

### Wanted Ads
- **"Does this listing match your wanted ad?"** — suggest existing listings to wanted ad creators
- **Phase 3**

### FAQ / Help Centre
- **AI chat assistant:** Answer questions using the help content knowledge base
- **Phase 3**

---

## B. Seller AI

### Post Ad Flow
- **Category suggestion:** Given a title/description, suggest the best category
- **Title generation:** Generate a compelling listing title from user input
- **Description writer:** Expand brief notes into a detailed, structured description
- **Missing info detection:** Flag incomplete fields (no price, no location, no condition)
- **Phase 3**

### Edit Ad Flow
- **Improvement suggestions:** "Your description is short — add more specs for better response rates"
- **Phase 3**

---

## C. Business AI

### Business Profile
- **Profile writer:** Generate a professional business description from bullet-point inputs
- **Phase 3**

### Lead Management
- **Reply drafting:** Suggest a professional reply to a buyer enquiry
- **Phase 3**

### FAQ Generation
- **Auto-generate FAQ:** Based on listing content and common questions in the category
- **Phase 3**

### Reviews
- **Review reply drafting:** Suggest a polite, professional response to a customer review
- **Phase 4**

---

## D. Admin AI

### Moderation Assistant
- **Spam detection:** Flag listings with spam signals (suspicious prices, keyword stuffing, template content)
- **Duplicate detection:** Identify near-duplicate listings from the same or different users
- **Content quality scoring:** Score listings for completeness and quality
- **Phase 3**

### Support Triage
- **Category classification:** Route support tickets to the right team/queue automatically
- **Urgency scoring:** Flag high-priority support issues
- **Phase 3**

### Platform Intelligence
- **Content gap detection:** "There are 50 searches for 'walk-in freezer Glasgow' with no results — suggest a content page"
- **Phase 4**

---

## What Should NOT Be Automated

| Action | Reason |
|--------|--------|
| Publishing listings | Human review prevents spam/fraud at scale |
| Approving business accounts | Trust and identity must be human-verified |
| Replying to users on behalf of sellers | Risk of miscommunication; must be user-controlled |
| Generating fake reviews | Illegal and damaging to trust |
| Pricing recommendations | Liability and market manipulation risk |
| Auto-banning users | Risk of false positives; must be human-confirmed |

---

## MVP AI vs Later AI

### MVP (Phase 1–2)
None. AI is **off by default** (controlled via feature flags in `packages/config/src/featureFlags.ts`).

### Phase 3 (AI-First Features)
| Feature | Module | Notes |
|---------|--------|-------|
| Listing title generator | `packages/ai/src/prompts/listing-title.ts` | Seller tool |
| Description writer | `packages/ai/src/prompts/listing-desc.ts` | Seller tool |
| Category suggester | `packages/ai/src/tools/category.tool.ts` | Seller tool |
| Natural language search | `packages/ai/src/prompts/search.ts` | Public AI |
| Business profile writer | `packages/ai/src/prompts/business-profile.ts` | Business AI |
| Spam/moderation detection | `packages/ai/src/guardrails/spam-detector.ts` | Admin AI |
| Lead reply drafting | `packages/ai/src/prompts/lead-reply.ts` | Business AI |

### Phase 4
| Feature | Module | Notes |
|---------|--------|-------|
| FAQ chat assistant | TBD | Public AI |
| Review response drafting | TBD | Business AI |
| Content gap analysis | TBD | Admin AI |
| Support triage | TBD | Admin AI |

---

## Technical Notes

- All AI calls are async — use `apps/worker` job queue for non-real-time tasks
- Use streaming for real-time generation (listing writer, search)
- All prompts must be versioned to allow regression testing
- Add cost tracking from day one (log model, token usage per call)
- Use the cheapest adequate model (GPT-4o Mini for classification, GPT-4o for generation)
