/**
 * packages/types/src/business.ts
 * Shared TypeScript types for EK Marketplace — Business Profile MVP
 *
 * TODO: expand with DB-backed IDs, relations, and audit fields once schema is finalised
 */

// ---------------------------------------------------------------------------
// BusinessType
// ---------------------------------------------------------------------------

/** The primary category/role of a business on the platform. */
export type BusinessType =
  | 'installer'
  | 'supplier'
  | 'dealer'
  | 'service_provider'
  | 'manufacturer'
  | 'other';

// ---------------------------------------------------------------------------
// VerificationStatus
// ---------------------------------------------------------------------------

/** Verification lifecycle for a business profile. */
export type VerificationStatus =
  | 'unverified'
  | 'pending_review'
  | 'verified'
  | 'rejected'
  | 'suspended';

// ---------------------------------------------------------------------------
// ContactDetails
// ---------------------------------------------------------------------------

/**
 * Contact information for a business.
 * TODO: add social links, WhatsApp, and messaging preference flags.
 */
export interface ContactDetails {
  phone?: string;
  email?: string;
  website?: string;
  /** Full or partial postal address — no geocoding at MVP stage */
  address?: string;
  /** UK postcode for service-area matching */
  postcode?: string;
}

// ---------------------------------------------------------------------------
// BusinessServiceArea
// ---------------------------------------------------------------------------

/**
 * A geographic area a business serves.
 * MVP: free-text region/city name or UK region slug.
 * TODO: add lat/lng bounding box and radius once location services are wired up.
 */
export interface BusinessServiceArea {
  /** Human-readable label, e.g. "London", "South East England" */
  label: string;
  /** URL-safe slug, e.g. "london", "south-east-england" */
  slug: string;
}

// ---------------------------------------------------------------------------
// OpeningHours
// ---------------------------------------------------------------------------

/** Single-day opening hours block (24-hour strings, e.g. "09:00"). */
export interface DayHours {
  open: boolean;
  from?: string;
  to?: string;
}

/**
 * Weekly opening hours placeholder.
 * TODO: support split shifts and bank holiday overrides.
 */
export interface OpeningHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

// ---------------------------------------------------------------------------
// BusinessProfileDraft
// ---------------------------------------------------------------------------

/**
 * Working draft of a business profile — used during the multi-step onboarding
 * flow before the profile is persisted.
 *
 * All fields are optional so the draft can be partially filled at any step.
 * TODO: replace string IDs with proper UUID type once DB is introduced.
 */
export interface BusinessProfileDraft {
  /** Temporary client-side ID (e.g. uuid from crypto.randomUUID) */
  id?: string;

  // Step 1 — Business Type
  businessType?: BusinessType;

  // Step 2 — Business Name
  businessName?: string;

  // Step 3 — Branding (no real storage at MVP — URLs are placeholders)
  /** TODO: wire up to file-storage service (e.g. S3/Cloudflare R2) */
  logoUrl?: string;
  /** TODO: wire up to file-storage service */
  coverImageUrl?: string;

  // Step 4 — Description
  /** Short tagline shown in search results */
  tagline?: string;
  /** Full markdown-safe description */
  description?: string;

  // Step 5 — Services offered
  /** Slugs from SERVICES_OFFERED config constant */
  servicesOffered?: string[];

  // Step 6 — Equipment categories sold
  /** Slugs from EQUIPMENT_CATEGORIES config constant */
  equipmentCategories?: string[];

  // Step 7 — Service areas
  serviceAreas?: BusinessServiceArea[];

  // Step 8 — Contact details
  contactDetails?: ContactDetails;

  // Step 9 — Opening hours (placeholder)
  /** TODO: persist and display on public profile */
  openingHours?: OpeningHours;

  // Step 10 — Verification status (read-only placeholder at MVP)
  /** Set server-side; never trusted from client */
  verificationStatus?: VerificationStatus;

  // Meta
  createdAt?: string;
  updatedAt?: string;
}
