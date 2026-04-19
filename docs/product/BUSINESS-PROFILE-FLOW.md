# Business Profile Flow — EK Marketplace

> **Status:** MVP Shell · **Last updated:** 2026-04

---

## Overview

The Business Profile Flow is the onboarding journey for **service providers, equipment dealers, installers, and other trade businesses** joining EK Marketplace. It is a multi-step wizard that collects the minimum viable information needed to create a public-facing business profile.

The flow is intentionally lean at MVP stage. All deferred features are clearly marked with `TODO` comments in code and listed in the [Deferred Features](#deferred-features) section below.

---

## Onboarding Journey (11 Steps)

| Step | Screen | Required? | MVP Status |
|------|--------|-----------|------------|
| 1 | Business Type Selection | Optional | ✅ Built |
| 2 | Business Name | Required | ✅ Built |
| 3 | Logo & Cover Image | Optional | 🔲 Placeholder (no storage) |
| 4 | Description & Tagline | Required | ✅ Built |
| 5 | Services Offered | Optional | ✅ Built |
| 6 | Equipment Categories Sold | Optional | ✅ Built |
| 7 | Service Areas | Required | ✅ Built |
| 8 | Contact Details | Required (phone or email) | ✅ Built |
| 9 | Opening Hours | Optional | 🔲 Placeholder |
| 10 | Verification Status | Read-only info | 🔲 Placeholder |
| 11 | Profile Preview & Save | — | 🔲 Shell (no API call) |

### Step Details

#### Step 1 — Business Type
The user selects their primary business role from a curated list:
- Installer / Engineer
- Parts Supplier
- Equipment Dealer
- Service Provider
- Manufacturer / Brand
- Other

This choice drives category suggestions in later steps (TODO: implement suggestion logic).

#### Step 2 — Business Name
Free-text input, max 120 characters. Used as the primary display name and slug base.

#### Step 3 — Logo & Cover Image
Placeholder upload UI only. Both images are optional for MVP.
- Logo: 400×400 px recommended, PNG/JPG
- Cover: 1200×400 px recommended, PNG/JPG

No actual file storage is implemented at MVP. Clicking upload shows a "Coming soon" message.

#### Step 4 — Description & Tagline
- **Tagline** (optional): 160 characters max, shown in search results
- **Description** (required): minimum 20 characters, up to 2000. Supports plain text; markdown rendering is a TODO.

#### Step 5 — Services Offered
Multi-select checklist organised by service group:
- Air Conditioning (installation, servicing, repair)
- Refrigeration (fridge/freezer/cold room/freezer room)
- Contracts & Callouts (maintenance, emergency)
- Specialist (refrigerant recovery, system design, commissioning)

#### Step 6 — Equipment Categories Sold
Multi-select checklist organised by category group:
- Air Conditioning units (split, multi-split, cassette, portable, VRF/VRV)
- Refrigeration (display fridges, coolers, freezers, cold room panels, compressors)
- Parts & Consumables (refrigerant gas, controls, tools, filters)

#### Step 7 — Service Areas
Searchable multi-select list of UK regions and major cities. Current MVP set includes:
- Nationwide (UK)
- All 9 English regions
- Scotland, Wales, Northern Ireland
- 10 major cities

#### Step 8 — Contact Details
Fields: phone, email, website, address, postcode.
At least one of **phone** or **email** is required before the profile can be published.

#### Step 9 — Opening Hours
Placeholder screen only. Full per-day time picker is a deferred feature.

#### Step 10 — Verification Status
Read-only information screen. Shows the current verification status (always `unverified` at onboarding time). Document upload and review queue are deferred.

#### Step 11 — Preview & Save
Shows:
1. A profile-completion checklist and percentage bar (required vs optional fields)
2. A lightweight preview card of the business profile
3. A Save Draft or Save & Publish CTA (no API call yet — placeholder alert)

---

## MVP Profile Fields

### Required to Publish

| Field | Source |
|-------|--------|
| `businessName` | Step 2 |
| `description` (min 20 chars) | Step 4 |
| At least one `serviceArea` | Step 7 |
| `contactDetails.phone` or `contactDetails.email` | Step 8 |

### Optional (Improve Completion Score)

| Field | Source |
|-------|--------|
| `businessType` | Step 1 |
| `tagline` | Step 4 |
| `servicesOffered` (≥1) | Step 5 |
| `equipmentCategories` (≥1) | Step 6 |
| `logoUrl` | Step 3 |
| `openingHours` | Step 9 |
| `contactDetails.website` | Step 8 |
| `contactDetails.address` | Step 8 |

---

## Shared Types & Config

| Module | Location | Purpose |
|--------|----------|---------|
| `BusinessType` | `packages/types/src/business.ts` | Union type for business roles |
| `BusinessProfileDraft` | `packages/types/src/business.ts` | Draft state shape for the onboarding flow |
| `BusinessServiceArea` | `packages/types/src/business.ts` | A geographic area label/slug pair |
| `VerificationStatus` | `packages/types/src/business.ts` | Verification lifecycle enum |
| `ContactDetails` | `packages/types/src/business.ts` | Contact info interface |
| `OpeningHours` | `packages/types/src/business.ts` | Weekly hours structure |
| `BUSINESS_TYPE_OPTIONS` | `packages/config/src/businessTypes.ts` | UI labels + icons for Step 1 |
| `SERVICE_AREA_OPTIONS` | `packages/config/src/serviceAreas.ts` | UK region/city list for Step 7 |
| `SERVICES_OFFERED` | `packages/config/src/services.ts` | Service checklist for Step 5 |
| `EQUIPMENT_CATEGORIES` | `packages/config/src/services.ts` | Equipment checklist for Step 6 |
| `VERIFICATION_STATUS_META` | `packages/config/src/verificationStatuses.ts` | Status labels + colours |
| `PROFILE_COMPLETION_REQUIREMENTS` | `packages/config/src/profileCompletion.ts` | Completion rules + check functions |
| `calcProfileCompletion` | `packages/config/src/profileCompletion.ts` | Completion percentage calculator |
| `isProfilePublishable` | `packages/config/src/profileCompletion.ts` | Publish gate check |

---

## API Modules (MVP Shell)

| Module | Location | Routes |
|--------|----------|--------|
| Businesses | `apps/api/src/modules/businesses/` | `GET/POST /businesses`, `GET/PATCH/DELETE /businesses/:id` |
| Business Profiles | `apps/api/src/modules/business_profiles/` | `GET/POST /businesses/:id/profile`, `PATCH/publish/unpublish /businesses/:id/profile/:id` |
| Service Areas | `apps/api/src/modules/service_areas/` | `GET/PUT /businesses/:id/profile/:id/service-areas` |
| Verification Status | `apps/api/src/modules/verification_status/` | `GET/PATCH /businesses/:id/verification` |

All modules use **in-memory stores** at MVP. No DB schema is required to run the shells.

---

## Connection to Listings & Leads

### Listings
- A verified business profile unlocks the **Business Listings** post type
- `businessId` will be a foreign key on the `listings` table
- Service area slugs will be used to geo-filter listing search results
- Equipment categories drive listing category pre-fill (AI suggestion TODO)

### Leads
- Contact details (phone, email) power the **lead form** shown to buyers on a business profile page
- Opening hours data will gate "response time" expectations shown to leads
- Verification status controls trust signals shown on lead forms and profile cards

---

## AI Opportunities

| Opportunity | When | Notes |
|-------------|------|-------|
| Description writing assistant | Step 4 | Prompt: business type + services → draft description |
| Category auto-suggestion | Step 5/6 | Based on business name and type |
| Service area suggestion | Step 7 | Based on postcode entered in Step 8 |
| SEO tagline generator | Step 4 | Prompt: description → SEO-optimised tagline |
| Profile quality score | Step 11 | LLM-based completeness and tone scoring |

All AI features are **deferred post-MVP**. Placeholders exist in the code via `TODO` comments.

---

## Deferred Features

The following features are intentionally **out of scope** for MVP and should be tackled in Phase 2 or later:

- **File storage** — logo and cover image upload (S3 / Cloudflare R2)
- **Opening hours editor** — per-day time picker, split shifts, bank holiday overrides
- **Verification workflow** — document upload, admin review queue, status notifications
- **Auto-save to API** — draft is currently localStorage-only; needs API persistence
- **Auth guard** — onboarding page requires authenticated session
- **AI description assistant** — Step 4 writing helper
- **DB schema** — businesses, business_profiles, service_areas tables
- **Slug uniqueness** — enforce unique slugs at DB level
- **Markdown rendering** — render description as markdown on public profile
- **Social links** — WhatsApp, LinkedIn, Instagram on contact details
- **Review/rating system** — post-onboarding feature
- **Leads engine** — inquiry forms, lead routing, lead tracking
- **Billing/subscription gating** — profile visibility tiers
- **Duplicate business detection** — prevent duplicate registrations
- **Analytics** — profile views, enquiry rates, completion funnels

---

## Recommended Next Task

1. **Wire up auth** — protect the onboarding route with NextAuth or equivalent
2. **Connect Step 11 to the API** — POST draft to `POST /businesses` + `POST /businesses/:id/profile`
3. **Add Prisma schema** — `businesses`, `business_profiles`, `service_areas`, `verification_records` tables
4. **Build public profile page** — `GET /business/:slug` — renders the BusinessProfileCard
5. **Add file-upload support** — integrate Cloudflare R2 or S3 for logo/cover
