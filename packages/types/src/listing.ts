/**
 * Core listing types for EK Marketplace.
 * These are shared across apps/web, apps/api, and apps/worker.
 */

// ─── Enums ───────────────────────────────────────────────────────────────────

/** Top-level purpose of a listing */
export enum ListingPurpose {
  FOR_SALE = 'for_sale',
  WANTED = 'wanted',
  SERVICE_REQUEST = 'service_request',
  HIRE = 'hire',
}

/** High-level equipment/service categories */
export enum ListingCategory {
  // Equipment
  AC_UNITS = 'ac_units',
  REFRIGERATION = 'refrigeration',
  COLD_ROOMS = 'cold_rooms',
  FREEZER_ROOMS = 'freezer_rooms',
  DISPLAY_REFRIGERATION = 'display_refrigeration',
  PARTS = 'parts',
  TOOLS_ACCESSORIES = 'tools_accessories',
  CLEARANCE_STOCK = 'clearance_stock',
  // Services
  AC_INSTALLATION = 'ac_installation',
  AC_SERVICING = 'ac_servicing',
  REFRIGERATION_SERVICE = 'refrigeration_service',
  COLD_ROOM_INSTALL = 'cold_room_install',
  EMERGENCY_BREAKDOWN = 'emergency_breakdown',
  MAINTENANCE_CONTRACT = 'maintenance_contract',
  // Miscellaneous
  OTHER = 'other',
}

/** Physical condition of an item */
export enum ListingCondition {
  NEW = 'new',
  USED = 'used',
  REFURBISHED = 'refurbished',
  EX_DISPLAY = 'ex_display',
  TRADE_STOCK = 'trade_stock',
  CLEARANCE = 'clearance',
  FOR_PARTS = 'for_parts',
}

/** Lifecycle status of a listing */
export enum ListingStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  ACTIVE = 'active',
  SOLD = 'sold',
  EXPIRED = 'expired',
  REMOVED = 'removed',
}

// ─── Interfaces ───────────────────────────────────────────────────────────────

/** Represents a photo attached to a listing draft */
export interface ListingPhoto {
  /** Temporary client-side ID before upload */
  tempId: string;
  /** URL once uploaded to storage – TODO: integrate real storage */
  url?: string;
  altText?: string;
}

/** Location data for a listing */
export interface ListingLocation {
  /** Free-text city/town */
  city: string;
  /** UK postcode (partial or full) */
  postcode?: string;
  /** ISO 3166-2 GB region code, e.g. "GB-ENG" */
  region?: string;
}

/**
 * ListingDraft – the in-progress state captured during the posting flow.
 * All fields are optional to support incremental multi-step saving.
 */
export interface ListingDraft {
  /** Transient ID (e.g. UUID) while draft is unsaved */
  draftId?: string;
  purpose?: ListingPurpose;
  category?: ListingCategory;
  title?: string;
  description?: string;
  condition?: ListingCondition;
  /** Price in pence (GBP) to avoid floating-point issues */
  pricePence?: number;
  /** Whether the seller accepts offers */
  negotiable?: boolean;
  location?: ListingLocation;
  /** Placeholder – photo upload not yet implemented */
  photos?: ListingPhoto[];
  /** ISO timestamp when draft was last updated */
  updatedAt?: string;
}

/**
 * ListingRecord – a persisted listing (once submitted).
 * TODO: expand when DB schema is defined.
 */
export interface ListingRecord extends Required<Omit<ListingDraft, 'draftId' | 'photos'>> {
  id: string;
  status: ListingStatus;
  photos: ListingPhoto[];
  /** Seller user ID */
  userId: string;
  createdAt: string;
  updatedAt: string;
}
