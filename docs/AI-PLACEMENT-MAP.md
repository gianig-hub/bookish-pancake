# AI Placement Map — EK Marketplace

> **Status:** Planning / Architecture Phase  
> **Audience:** Developers, product leads  
> **Last updated:** 2026-04-19

---

## 1. Overview

### What AI Is (for this platform)

AI is a set of **targeted tools** that reduce friction for users and reduce manual overhead for operations. It sits inside a defined service layer (`packages/ai/`) and is called explicitly — it does not run autonomously on anything that matters.

Concrete examples of what AI does here:
- Helps sellers write better listings (title, description, category)
- Scores incoming listings for spam/risk before a human reviews
- Surfaces relevant results when a buyer types a vague search query
- Suggests auto-reply templates to businesses handling leads
- Flags duplicate or suspicious accounts for admin review

### What AI Is Not

- **AI is not the final decision-maker** on approvals, bans, or refunds
- **AI is not a content factory** — no thin auto-generated pages
- **AI is not a trust signal** — users do not need to know AI is running in the background
- **AI is not magic** — every AI output must have a defined fallback if it fails

### Guiding Principles

| Principle | What it means in practice |
|-----------|--------------------------|
| Assistive, not autonomous | AI suggests; humans or confirmed logic confirms |
| Always fallback | If AI call fails, the user flow continues without it |
| Logged decisions | Every AI call that affects moderation or visibility is logged |
| Feature-flagged | New AI features ship behind a flag; can be disabled without code change |
| No user-facing AI labels at MVP | Don't market "powered by AI" — just make the product work better |
| Confidence thresholds required | Auto-actions only fire above a defined confidence level (e.g. ≥95% for auto-reject) |

---

## 2. AI by User Role

### 2.1 Public Buyer AI

Visible to all visitors, including unauthenticated users. Must be fast and non-blocking.

| Feature | Description | Phase |
|---------|-------------|-------|
| Smart search | Typo correction, synonym expansion (e.g. "fridge" → refrigeration) | MVP |
| Autocomplete | Category and brand suggestions as user types | MVP |
| Listing recommendations | "Similar listings" on listing detail page | Phase 3 |
| Spam feedback signal | If many users report a listing, AI score is re-evaluated | Phase 3 |
| Natural language search | "3kW wall-mounted Daikin in London under £500" parsed to structured query | Future |
| Comparison assist | Help users compare two listings side-by-side | Future |

### 2.2 Seller AI

Available to authenticated users with `SELLER`, `INSTALLER`, or `SHOP` role during listing creation and editing.

| Feature | Description | Phase |
|---------|-------------|-------|
| Title generator | Suggests title from category, brand, model, condition inputs | MVP |
| Description writer | Generates a draft description; user edits before submitting | MVP |
| Category suggester | Recommends category based on title/description text | MVP |
| Duplicate detector | Warns if similar listing already exists from this seller | MVP |
| Pricing recommendation | Suggests price range based on category, condition, and recent listings | Phase 3 |
| Photo quality hint | Warns if uploaded image is too small, blurry, or missing | Phase 3 |
| SEO title scorer | Rates listing title for search-friendliness | Future |

### 2.3 Business AI (Shops / Installers)

Available to users with `SHOP` or `INSTALLER` role in their dashboard.

| Feature | Description | Phase |
|---------|-------------|-------|
| Profile optimisation prompts | Suggests missing fields (bio, phone, service area, certifications) | MVP |
| Auto-reply templates | Pre-written response starters for common inquiry types | Phase 3 |
| Inquiry categorisation | Tags incoming messages as quote request, availability check, complaint, etc. | Phase 3 |
| Service/product matching | Suggests which listings a lead might be interested in | Future |
| FAQ generator | Generates draft FAQ answers from business profile and listing data | Future |

### 2.4 Admin AI

Available only to users with `ADMIN` role. All outputs are suggestions — admin confirms.

| Feature | Description | Phase |
|---------|-------------|-------|
| Moderation risk score | Rates each submitted listing 0–100 on spam/quality risk | MVP |
| Spam detection | Flags listings with spammy patterns (contact info in title, excessive caps, etc.) | MVP |
| Duplicate listing flag | Identifies near-identical listings across different accounts | MVP |
| Suspicious account flag | Detects unusual behaviour patterns (mass posting, new account + paid boost) | Phase 3 |
| Auto-reject (≥95% confidence) | Only for obvious spam — logged, reversible | Phase 3 |
| Support triage | Categorises incoming support tickets by type and urgency | Phase 3 |
| Content gap analysis | Suggests underserved categories or locations with few listings | Future |

---

## 3. Page-by-Page AI Placement

### 3.1 Homepage

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Smart search bar | Hero section search input | Typo correction + autocomplete on keypress |
| Category autocomplete | Search input dropdown | Triggered after 2 characters |
| Featured listing ranking | "Featured Listings" section | Boost score + recency + completeness score |

### 3.2 Search & Browse

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Query rewriting | Server-side before DB query | Expand typos, synonyms; log original vs rewritten |
| No-results suggestion | Empty state UI | "Did you mean...?" or related category links |
| Listing quality score | Result cards (internal only) | Used for sorting; not shown to users |

### 3.3 Listing Detail

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Similar listings | Below main listing content | Based on category + brand + location, not ML at MVP |
| Spam report signal | Report button flow | User report feeds into AI re-score queue |

### 3.4 Create / Edit Listing

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Title assistant | Title field, inline CTA button | "Generate title" — fires on click, not automatically |
| Description writer | Description field, inline CTA button | "Write description" — user always edits output |
| Category suggester | Category dropdown | Fires automatically after title is entered; can be ignored |
| Duplicate warning | Pre-submit validation step | Warning toast, not a hard block |

### 3.5 Seller Dashboard

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Listing health hints | Listing list view, per-listing | "Add photos", "Title too short" — rules-based at MVP |
| Duplicate alerts | Active listings list | Banner if near-duplicate detected |

### 3.6 Shop / Installer Profiles

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Profile completeness prompt | Edit profile page | Checklist with AI-generated suggestions for missing fields |
| Auto-reply templates | Messages / leads inbox | Suggested reply starters per inquiry category |

### 3.7 Admin Dashboard

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Moderation risk score | Pending listings queue, per listing | Score badge (0–100) + reason tags |
| Bulk spam flagging | Listing moderation table | Filter by AI risk score; admin reviews before action |
| Duplicate cluster view | Duplicate listings report | Group near-duplicates for batch review |
| Suspicious account alerts | User management table | Flag badge on accounts with anomalous patterns |

### 3.8 Messages

| AI Element | Placement | Notes |
|------------|-----------|-------|
| Inquiry type tag | Message list view (seller/business) | Auto-tagged: quote / info / complaint / other |
| Suggested reply | Message detail, inline | One-click reply starters; editable before sending |

---

## 4. AI Features by Phase

### Phase 1–2 (MVP)

These features ship in the first working version of the product. They are the minimum needed to make AI useful without being a distraction.

- [ ] Smart search with typo correction and synonym handling
- [ ] Autocomplete for categories and brands on search input
- [ ] AI title generator on listing creation form (manual trigger)
- [ ] AI description writer on listing creation form (manual trigger)
- [ ] Category suggestion on listing creation (auto-trigger after title entry)
- [ ] Duplicate listing detector (warn on submit, not hard block)
- [ ] Moderation risk scorer (0–100) on all submitted listings
- [ ] Spam pattern detection feeding into moderation queue
- [ ] Profile completeness hints on business/seller dashboard

### Phase 3–4 (Enhanced)

Shipped after MVP is stable. Requires AI infrastructure to be in place and monitored.

- [ ] Pricing recommendation on listing creation
- [ ] Auto-reject obvious spam at ≥95% confidence (logged, reversible)
- [ ] Suspicious account behaviour detection
- [ ] Auto-reply template suggestions in messages
- [ ] Inquiry categorisation (quote / info / complaint / other)
- [ ] Support ticket triage for admin
- [ ] Photo quality hint on image upload
- [ ] Similar listings on listing detail page

### Future (Nice-to-Have)

Not planned for active development yet. Revisit after Phase 3–4 is stable.

- [ ] Natural language search parsing
- [ ] Buyer listing comparison assist
- [ ] SEO title scorer for sellers
- [ ] Service/product matching for businesses
- [ ] FAQ auto-generator from business profile data
- [ ] SEO and content gap analysis for admin

---

## 5. What NOT to Automate

These actions require a human decision. AI may inform the decision but must not trigger it automatically.

### Manual Verification Steps

| Action | Reason |
|--------|--------|
| Business account verification | Legal and trust responsibility — requires document review |
| Approval of paid features (boosts, featured listings) | Payment is involved; approval must be traceable |
| Identity or trading standard compliance checks | Legal exposure if automated incorrectly |

### Human Judgment Calls

| Action | Reason |
|--------|--------|
| Dispute resolution between buyer and seller | Context, intent, and fairness require human interpretation |
| Final listing rejection (below 95% confidence) | False positives have real commercial impact on sellers |
| Content policy edge cases | Rules evolve; edge cases need human accountability |

### Safety-Critical Decisions

| Action | Reason |
|--------|--------|
| Account bans and suspensions | Affects access, income, and reputation — must be auditable |
| Large refunds or compensation | Financial impact; requires human sign-off |
| Removal of verified business profiles | Trust signal for buyers; removal must be justified and logged |

### Brand and Quality Control

| Action | Reason |
|--------|--------|
| Guide or blog content publication | AI drafts are allowed; human edit and approval is required |
| Homepage featured selections (editorial) | Curation is a trust signal — must not be fully automated |
| Category or taxonomy changes | Structural changes affect SEO and UX broadly |

---

## 6. Implementation Guidelines

### 6.1 Code Location

All AI code lives in `packages/ai/`. No AI logic in `apps/web` or `apps/api` directly.

```
packages/ai/
├── src/
│   ├── services/
│   │   ├── moderationScorer.ts     # Risk scoring for listings
│   │   ├── spamDetector.ts         # Spam pattern detection
│   │   ├── duplicateDetector.ts    # Near-duplicate listing detection
│   │   ├── titleGenerator.ts       # Listing title generation
│   │   ├── descriptionWriter.ts    # Listing description generation
│   │   ├── categoryMatcher.ts      # Category suggestion from text
│   │   ├── searchRewriter.ts       # Query expansion / typo correction
│   │   └── pricingAdvisor.ts       # Pricing suggestion (Phase 3)
│   ├── types/
│   │   └── index.ts                # Shared input/output types
│   ├── utils/
│   │   └── logger.ts               # AI decision logging
│   └── index.ts                    # Public exports
├── package.json
└── tsconfig.json
```

### 6.2 Service Interface Pattern

Every AI service must follow this interface pattern:

```typescript
// packages/ai/src/types/index.ts

export interface AIResult<T> {
  success: boolean;
  data: T | null;
  confidence?: number;       // 0–1 float
  reason?: string;           // short label for logging
  fallbackUsed?: boolean;    // true if AI failed and default was returned
}

export interface ModerationScore {
  score: number;             // 0–100
  flags: string[];           // e.g. ["contact_in_title", "all_caps"]
  autoReject: boolean;       // true only if score >= 95
}
```

Example service:

```typescript
// packages/ai/src/services/moderationScorer.ts

import type { AIResult, ModerationScore } from '../types';
import { logAIDecision } from '../utils/logger';

export async function scoreListing(
  listingId: string,
  title: string,
  description: string,
): Promise<AIResult<ModerationScore>> {
  try {
    // TODO: replace with real model call
    const score = runHeuristicScorer(title, description);
    
    await logAIDecision({
      service: 'moderationScorer',
      input: { listingId, title },
      output: score,
    });

    return {
      success: true,
      data: score,
      confidence: score.score / 100,
    };
  } catch (err) {
    // Always fall back — never block a listing because AI failed
    return {
      success: false,
      data: { score: 0, flags: [], autoReject: false },
      fallbackUsed: true,
    };
  }
}
```

### 6.3 Integration Patterns

**From `apps/api`:**

```typescript
// apps/api/src/routes/listings/submit.ts

import { scoreListing } from '@ek/ai';

const aiResult = await scoreListing(listing.id, listing.title, listing.description);
const moderationScore = aiResult.data?.score ?? 0;

// Store score; do not block submission if AI failed
await db.listing.update({
  where: { id: listing.id },
  data: { aiModerationScore: moderationScore },
});
```

**Feature flags** (using env vars at MVP, proper flag service later):

```typescript
// packages/config/src/featureFlags.ts

export const AI_FLAGS = {
  TITLE_GENERATOR:        process.env.FF_AI_TITLE_GENERATOR === 'true',
  DESCRIPTION_WRITER:     process.env.FF_AI_DESCRIPTION_WRITER === 'true',
  MODERATION_SCORER:      process.env.FF_AI_MODERATION_SCORER === 'true',
  AUTO_REJECT_SPAM:       process.env.FF_AI_AUTO_REJECT_SPAM === 'true',
  PRICING_ADVISOR:        process.env.FF_AI_PRICING_ADVISOR === 'true',
};
```

### 6.4 Logging Requirements

Every AI decision that affects content visibility, moderation, or user messaging **must be logged**. Minimum log record:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | UUID |
| `service` | string | e.g. `moderationScorer` |
| `entityType` | string | `listing`, `user`, `message` |
| `entityId` | string | The affected record ID |
| `input` | JSON | Sanitised — no PII unless necessary |
| `output` | JSON | Full AI output including confidence |
| `fallbackUsed` | boolean | Was the AI bypassed? |
| `createdAt` | datetime | UTC |

Logs must be retained for **90 days minimum** and be queryable by admin.

### 6.5 Monitoring

- Alert if any AI service has an error rate > 5% over a 1-hour window
- Alert if moderation scorer average score drops or spikes significantly (could indicate prompt drift or abuse pattern)
- Dashboard widget on admin: "AI decisions today" — counts by service and outcome
- Monthly review: compare auto-reject decisions to manually rejected listings for accuracy drift

---

## Quick Reference

### AI Yes/No Checklist

Use this when deciding whether a new feature should use AI:

```
✅ Does it reduce friction for the user or admin?
✅ Can it fail gracefully without breaking the user flow?
✅ Can the decision be logged and reviewed?
✅ Is there a human override path?
✅ Is there a feature flag to disable it?

❌ Would it make an irreversible change automatically?
❌ Would a false positive have serious commercial or legal consequences?
❌ Does it involve identity, payment, or account-level trust decisions?
❌ Does it publish content without human review?
```

If any ❌ applies, the feature needs human confirmation in the loop.

---

*This document is the source of truth for AI placement decisions on EK Marketplace. Update it when features are added, changed, or removed.*
