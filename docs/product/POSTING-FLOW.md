# Posting Flow – EK Marketplace

## Overview

The posting flow is the multi-step wizard that guides a seller or service provider through creating a listing on EK Marketplace. It is designed to be fast, clear, and mobile-friendly, with future AI-assisted enhancements planned at key steps.

---

## MVP Journey (8 Steps)

| # | Step | Key Field(s) | Notes |
|---|------|-------------|-------|
| 1 | Choose Purpose | `purpose` (enum) | For Sale / Wanted / Service Request / Hire |
| 2 | Choose Category | `category` (enum) | Filtered by purpose |
| 3 | Title & Description | `title`, `description` | Character limits enforced |
| 4 | Condition | `condition` (enum) | Skipped for Service Requests |
| 5 | Price | `pricePence`, `negotiable` | Stored in pence; 0 = Free/POA |
| 6 | Location | `city`, `postcode` | UK postcode optional |
| 7 | Photos | `photos[]` | **Placeholder only – upload not yet implemented** |
| 8 | Preview & Submit | — | Summary + submit to API |

---

## Data Model (Draft)

The `ListingDraft` interface in `packages/types/src/listing.ts` captures all fields during the flow. All fields are optional to support incremental step-saving.

```ts
interface ListingDraft {
  draftId?: string;
  purpose?: ListingPurpose;
  category?: ListingCategory;
  title?: string;
  description?: string;
  condition?: ListingCondition;
  pricePence?: number;
  negotiable?: boolean;
  location?: ListingLocation;
  photos?: ListingPhoto[];
  updatedAt?: string;
}
```

---

## Posting Limits (MVP)

Defined in `packages/config/src/listing.ts`:

| Limit | Value |
|-------|-------|
| Max title length | 100 characters |
| Max description length | 3,000 characters |
| Max photos | 10 |
| Max price | £99,999.99 |
| Free listings/month (basic) | 3 |

---

## Deferred / Out of Scope for MVP

- **Real photo upload** – UI placeholder only; no S3/R2 integration yet
- **Draft auto-save** – draft is held in React state only; browser refresh loses data
- **Authentication gate** – the post page should require login (TODO in auth phase)
- **UK postcode validation** – format check not yet implemented
- **Listing expiry / renewal** – post-MVP feature
- **Subscription enforcement** – free plan posting limits not enforced yet
- **Moderation queue** – listings go straight to DRAFT status; review flow TBD

---

## Future AI Entry Points

These AI features are planned but not implemented in MVP:

| Step | AI Feature | Notes |
|------|-----------|-------|
| Step 2 | AI category suggestion | Based on title/description input |
| Step 3 | AI title generator | Seller copilot: suggests optimised titles |
| Step 3 | AI description writer | Seller copilot: drafts from bullet points |
| Step 7 | AI photo quality hint | Flags blurry/dark photos, suggests improvements |
| Step 8 | AI duplicate detection | Warns if similar listing already exists |

---

## Component Structure

```
apps/web/src/
  components/posting/
    PostingFlow.tsx             ← Wizard orchestrator
    types.ts                    ← Shared StepProps interface
    steps/
      StepChoosePurpose.tsx
      StepChooseCategory.tsx
      StepTitleDescription.tsx
      StepChooseCondition.tsx
      StepSetPrice.tsx
      StepSetLocation.tsx
      StepUploadPhotos.tsx      ← Placeholder
      StepPreviewSubmit.tsx
  pages/post/
    index.tsx                   ← /post route
```

---

## API Integration

On submit (Step 8), the draft is sent to:

```
POST /api/listings/draft
Content-Type: application/json
Body: { "draft": { ...ListingDraft } }
```

The API validates the draft using `apps/api/src/modules/listings/listings.validation.ts` and returns either a `ListingRecord` or validation errors.

**TODO:** Connect real DB persistence in Phase 2.

---

## Next Best Task After Posting Flow

1. **Authentication** – Add NextAuth.js to `apps/web` and protect the `/post` route
2. **Draft persistence** – Save draft to DB via `POST /api/listings/draft` on each step
3. **Photo upload** – Integrate Cloudflare R2 or S3 for real image storage
4. **Listing browse/search page** – `GET /api/listings` with filters
5. **My Listings page** – `GET /api/listings?userId=<id>`
