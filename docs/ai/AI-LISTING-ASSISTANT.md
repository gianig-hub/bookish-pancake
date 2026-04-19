# AI Listing Assistant — EK Marketplace

## Overview

The AI Listing Assistant is an **optional, modular copilot** embedded inside the EK Marketplace posting flow. Its purpose is to help sellers write better listings — not to automate posting, replace human input, or pretend AI is live when only placeholder endpoints exist.

> ⚠️ **MVP Status:** All AI assist components are present in the UI but the backend endpoints are **placeholder stubs only**. No real AI model or OpenAI integration is wired up. Components set `isPlaceholder: true` in all responses. Feature flags allow the entire AI layer to be toggled without code changes.

---

## Where AI Appears in the Posting Flow

| Step | AI Assist Available | Component |
|---|---|---|
| 1. Purpose | ✅ Optional | `AiSuggestPurpose` — suggests listing purpose if user is unsure |
| 2. Category | ✅ Optional | `AiSuggestCategory` — suggests best-fit category from draft context |
| 3. Title & Description | ✅ Optional | `AiSuggestTitle` — generates a keyword-rich title |
| 3. Title & Description | ✅ Optional | `AiImproveDescription` — rewrites/improves the description |
| 4. Condition | ✅ Optional | `AiSuggestCondition` — suggests condition from description |
| 8. Preview & Submit | ✅ Optional | `AiDetectMissing` — flags incomplete/weak fields (live heuristic) |
| 8. Preview & Submit | ✅ Optional | `AiAssistPanel` — "Improve my listing" full review panel |

All AI components are:
- **Modular** — each can be included or excluded independently
- **Non-mandatory** — the user can complete and submit a listing without interacting with any AI feature
- **State-aware** — each renders a clear `idle → loading → success/error → applied/dismissed` UI state

---

## MVP Assist Points

### 1. Title Generation (`AiSuggestTitle`)
- Triggered by the user pressing "Suggest a title"
- Uses draft category, condition, and any free-text hint as context
- Returns a suggested title the user must explicitly accept
- User can retry for another suggestion or ignore and write their own

### 2. Description Improvement (`AiImproveDescription`)
- Available once the description reaches a minimum length (20 characters)
- Returns a rewritten/improved version the user must explicitly apply
- The original description is preserved until the user accepts
- User can keep their own description and dismiss the suggestion

### 3. Category Suggestion (`AiSuggestCategory`)
- Available when the user hasn't selected a category yet, or at any point
- Suggests the most relevant EK category from the draft
- Returns a confidence level (`low / medium / high`) for transparency

### 4. Purpose Suggestion (`AiSuggestPurpose`)
- Appears when the user hasn't selected a listing purpose
- Suggests `for_sale`, `wanted`, `service_request`, etc. from draft context

### 5. Condition Suggestion (`AiSuggestCondition`)
- Appears on the condition step alongside the manual radio options
- Suggests a condition class from the description text

### 6. Missing Info Detection (`AiDetectMissing`)
- Always visible on the Preview step (runs client-side heuristics, no API call)
- Flags incomplete fields: title, description, category, purpose, condition, price, location, photos
- Provides a short tip for each missing field
- This check runs automatically; the user doesn't need to trigger it

### 7. "Improve My Listing" Panel (`AiAssistPanel`)
- A collapsible panel on the Preview step
- Runs a full AI review of the draft and surfaces all suggestions together
- User must explicitly press "Apply suggestions" — nothing changes automatically
- Displays a disclaimer: *"AI suggestions are optional. Always review before applying. No content is published automatically."*

---

## AI Request/Response Architecture

All AI calls use the `AiListingAssistRequest` discriminated union type:

```typescript
// packages/types/src/ai.ts
type AiListingAssistRequest =
  | AiGenerateTitleRequest
  | AiImproveDescriptionRequest
  | AiSuggestCategoryRequest
  | AiSuggestPurposeRequest
  | AiSuggestConditionRequest
  | AiDetectMissingInfoRequest
  | AiImproveListingRequest;
```

All responses include `isPlaceholder: boolean` so the UI can communicate clearly when real AI is not yet available.

The API dispatcher (`apps/api/src/modules/ai-listing-assistant/routes.ts`) routes each request type to the correct handler module.

---

## Feature Flags

All AI features can be toggled via constants in `packages/config/src/ai.ts`:

```typescript
// Master switch — disables all AI UI elements
export const AI_LISTING_ASSIST_ENABLED = true;

// Per-feature toggles
export const AI_SUGGESTION_FLAGS: Record<AiSuggestionType, boolean> = { ... };
```

Set `AI_LISTING_ASSIST_ENABLED = false` to hide all AI components without code changes.

> TODO: Drive these flags from environment variables or a remote feature flag service in production.

---

## What Is Deferred (Not in MVP)

The following are intentionally **not** implemented in this shell:

| Deferred Item | Reason |
|---|---|
| Real OpenAI / AI model integration | No AI provider wired up yet; placeholder stubs only |
| Photo analysis (suggest condition from photo) | Requires vision model; deferred to post-MVP |
| Auto-population of multiple fields at once | Risk of overwriting user input; UX needs careful design |
| AI-generated SEO metadata (slug, meta description) | Deferred; not needed for MVP listing creation |
| Listing quality score / star rating | Requires trained quality model; deferred |
| AI duplicate/spam detection | Admin/moderation concern; separate pipeline |
| Saving AI interaction history per user | Requires user session + DB; deferred |
| Per-plan AI usage quotas | Requires plan/entitlement checks; deferred to billing step |
| Real-time AI streaming responses | UX enhancement; deferred |

---

## What Should NOT Be Automated

The following must **never** be automated by AI in EK Marketplace, regardless of technical capability:

1. **Auto-publishing listings** — A human must always explicitly submit their listing. AI suggestions must be accepted by the user before any content is stored.
2. **Auto-setting price** — Price is a seller's commercial decision. AI must not suggest or auto-fill prices.
3. **Auto-selecting paid boosts or plans** — Any monetisation decision is exclusively the seller's.
4. **Auto-approving or bypassing moderation** — All listings go through the moderation pipeline regardless of AI involvement.
5. **Fabricating product details** — AI must never invent model numbers, specifications, or claims not present in the user's draft.
6. **Rewriting in a way that changes factual meaning** — The description improvement prompt must preserve all factual claims.

---

## Safe Fallback Behaviour

When the AI backend is unavailable or returns an error:
- The UI renders an `AiErrorState` with a safe fallback message
- The safe messages are defined in `packages/config/src/ai.ts` (`AI_FALLBACK_MESSAGES`)
- No empty strings or raw error messages are ever shown to the user
- The posting flow continues normally — the user is not blocked

---

## How This Connects to Broader Product Direction

The AI Listing Assistant is the first piece of EK Marketplace's seller-side AI layer. It is designed to connect to:

1. **AI search** — the same category/purpose taxonomy used here feeds into natural-language search classification
2. **Business profile AI** — similar description improvement patterns will apply to business profiles
3. **Moderation AI** — listing quality signals from the assistant feed into spam/duplicate detection
4. **SEO AI** — improved listing titles and descriptions feed into category page content quality
5. **Recommendation AI** — well-structured listings (thanks to AI assist) improve recommendation signal quality

The shared types (`packages/types/src/ai.ts`) and config (`packages/config/src/ai.ts`) are designed to be extended as these adjacent systems are built.

---

## Files Created / Changed

### New Files

| File | Purpose |
|---|---|
| `packages/types/src/ai.ts` | Shared AI types: `AiListingAssistRequest`, `AiListingAssistResponse`, `AiSuggestionType`, `AiSuggestionState`, `MissingListingField`, `ListingImprovementResult` |
| `packages/types/src/listing.ts` | Listing domain types: `ListingPurpose`, `ListingCategory`, `ListingCondition`, `ListingDraft`, `ListingStatus`, `ListingCard` |
| `packages/types/src/index.ts` | Barrel export |
| `packages/config/src/ai.ts` | AI feature flags, suggestion actions, limits, fallback messages |
| `packages/config/src/listing.ts` | Listing purposes, categories, conditions, MVP limits |
| `packages/config/src/index.ts` | Barrel export |
| `apps/api/src/modules/ai-listing-assistant/index.ts` | Module entry point |
| `apps/api/src/modules/ai-listing-assistant/routes.ts` | Central dispatcher for AI assist requests |
| `apps/api/src/modules/ai-listing-assistant/title-generator.ts` | Title generation placeholder handler |
| `apps/api/src/modules/ai-listing-assistant/description-improver.ts` | Description improvement placeholder handler |
| `apps/api/src/modules/ai-listing-assistant/category-suggester.ts` | Category and purpose suggestion placeholder handlers |
| `apps/api/src/modules/ai-listing-assistant/missing-info-analyzer.ts` | Missing info detection + "improve listing" placeholder handlers |
| `apps/web/src/components/ai-assist/AiAssistStates.tsx` | Shared placeholder/loading/error/success state components |
| `apps/web/src/components/ai-assist/AiSuggestTitle.tsx` | Title generation UI component |
| `apps/web/src/components/ai-assist/AiImproveDescription.tsx` | Description improvement UI component |
| `apps/web/src/components/ai-assist/AiSuggestCategory.tsx` | Category, purpose, and condition suggestion UI components |
| `apps/web/src/components/ai-assist/AiDetectMissing.tsx` | Missing field detection UI component |
| `apps/web/src/components/ai-assist/AiAssistPanel.tsx` | "Improve my listing" panel UI component |
| `apps/web/src/components/ai-assist/index.ts` | Barrel export |
| `apps/web/src/hooks/usePostingFlow.ts` | Posting flow state hook |
| `apps/web/src/pages/post/PostingFlow.tsx` | Main multi-step posting flow entry component |
| `apps/web/src/pages/post/StepPurpose.tsx` | Purpose selection step |
| `apps/web/src/pages/post/StepCategory.tsx` | Category selection step |
| `apps/web/src/pages/post/StepDetails.tsx` | Title & description step with AI assist |
| `apps/web/src/pages/post/StepCondition.tsx` | Condition selection step with AI assist |
| `apps/web/src/pages/post/StepPreview.tsx` | Preview & submit step with AI assist panel |
| `docs/ai/AI-LISTING-ASSISTANT.md` | This document |

---

## Assumptions

1. The web app uses React (JSX/TSX) — no framework-specific router or SSR logic is assumed.
2. Tailwind or a component library may be added later; all class names are simple BEM-style strings for now.
3. The API layer is framework-agnostic — route handlers are plain async functions; wiring to Express/Fastify/Hono is a separate step.
4. TypeScript path aliases (`@ek-marketplace/types`, `@ek-marketplace/config`) are resolved via `tsconfig.json` paths in each package.
5. No database or persistence layer is included — all state is in-memory/component-local for now.

---

## Unfinished Gaps

- **No real AI provider** — all handlers return placeholder responses with `isPlaceholder: true`
- **No API routing** — route handlers exist but are not wired to an HTTP server
- **No authentication guard** — AI assist endpoints must be protected when the real backend is built
- **No rate limiting or quota enforcement** — `AI_ASSIST_SESSION_LIMIT` is a constant only; no middleware
- **No draft persistence** — draft state lives only in React component memory
- **No photo upload** — photo step renders a placeholder message
- **No submission** — the submit button shows an alert; no API call is made

---

## Best Next Task

After merging this AI listing assistant shell, the recommended next task is:

> **Implement the EK Marketplace moderation queue and listing review pipeline.**

This includes:
- Listing submission → pending review state
- Moderation dashboard (admin role)
- Approve / reject / flag actions
- Basic spam/duplicate checks (can use the same `detectMissingInfo` heuristics as a quality gate)
- Email notification placeholder for approval/rejection

This is the natural next step because the posting flow now submits to "pending" and needs somewhere for that draft to go.
