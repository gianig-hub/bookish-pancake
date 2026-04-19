/**
 * Shared listing types for EK Marketplace.
 * MVP-level types only — no full DB schema.
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export enum ListingPurpose {
  ForSale = 'for_sale',
  Wanted = 'wanted',
  ServiceRequest = 'service_request',
  HireRental = 'hire_rental',
  Clearance = 'clearance',
  TradeStock = 'trade_stock',
}

export enum ListingCategory {
  Fridges = 'fridges',
  Freezers = 'freezers',
  DisplayRefrigeration = 'display_refrigeration',
  ColdRoomEquipment = 'cold_room_equipment',
  FreezerRoomEquipment = 'freezer_room_equipment',
  AirConditioningUnits = 'air_conditioning_units',
  RefrigerationParts = 'refrigeration_parts',
  ControllersElectrical = 'controllers_electrical',
  ToolsAccessories = 'tools_accessories',
  ClearanceStock = 'clearance_stock',
}

export enum ListingCondition {
  New = 'new',
  UsedGood = 'used_good',
  UsedFair = 'used_fair',
  Refurbished = 'refurbished',
  ExDisplay = 'ex_display',
  ForParts = 'for_parts',
}

export enum ListingStatus {
  Draft = 'draft',
  PendingReview = 'pending_review',
  Active = 'active',
  Sold = 'sold',
  Expired = 'expired',
  Rejected = 'rejected',
}

// ---------------------------------------------------------------------------
// Draft and listing types
// ---------------------------------------------------------------------------

/** MVP listing draft — fields are intentionally optional as the draft is built up step-by-step. */
export interface ListingDraft {
  id?: string;
  purpose?: ListingPurpose;
  category?: ListingCategory;
  title?: string;
  description?: string;
  condition?: ListingCondition;
  priceGbp?: number;
  negotiable?: boolean;
  location?: {
    city?: string;
    postcode?: string;
    region?: string;
  };
  /** Placeholder — photo upload not yet implemented */
  photoUrls?: string[];
  /** Whether the user has applied AI suggestions to this draft */
  aiAssisted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Minimal listing card for browse/search results. */
export interface ListingCard {
  id: string;
  title: string;
  purpose: ListingPurpose;
  category: ListingCategory;
  condition?: ListingCondition;
  priceGbp?: number;
  negotiable?: boolean;
  location?: string;
  thumbnailUrl?: string;
  status: ListingStatus;
  createdAt: string;
}
