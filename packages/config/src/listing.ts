/**
 * Listing-related configuration constants for EK Marketplace.
 * MVP-level only — no pricing or billing logic.
 */

import { ListingCategory, ListingCondition, ListingPurpose } from '@ek-marketplace/types';

// ---------------------------------------------------------------------------
// Listing purposes
// ---------------------------------------------------------------------------

export const LISTING_PURPOSES: Record<ListingPurpose, { label: string; description: string }> = {
  [ListingPurpose.ForSale]: {
    label: 'For Sale',
    description: 'List equipment, parts, or tools for sale.',
  },
  [ListingPurpose.Wanted]: {
    label: 'Wanted',
    description: 'Let others know you are looking for something specific.',
  },
  [ListingPurpose.ServiceRequest]: {
    label: 'Service Request',
    description: 'Request installation, repair, or maintenance services.',
  },
  [ListingPurpose.HireRental]: {
    label: 'Hire / Rental',
    description: 'Offer or request equipment hire or short-term rental.',
  },
  [ListingPurpose.Clearance]: {
    label: 'Clearance',
    description: 'Sell off excess or end-of-line stock at reduced prices.',
  },
  [ListingPurpose.TradeStock]: {
    label: 'Trade Stock',
    description: 'Trade-to-trade bulk stock listings.',
  },
};

// ---------------------------------------------------------------------------
// Listing categories
// ---------------------------------------------------------------------------

export const LISTING_CATEGORIES: Record<ListingCategory, { label: string; description: string }> = {
  [ListingCategory.Fridges]: {
    label: 'Fridges',
    description: 'Commercial and domestic fridges and refrigerated cabinets.',
  },
  [ListingCategory.Freezers]: {
    label: 'Freezers',
    description: 'Commercial and domestic chest and upright freezers.',
  },
  [ListingCategory.DisplayRefrigeration]: {
    label: 'Display Refrigeration',
    description: 'Open display cases, multideck, and serve-over counters.',
  },
  [ListingCategory.ColdRoomEquipment]: {
    label: 'Cold Room Equipment',
    description: 'Cold room panels, doors, evaporators, and condensing units.',
  },
  [ListingCategory.FreezerRoomEquipment]: {
    label: 'Freezer Room Equipment',
    description: 'Freezer room panels, doors, and refrigeration components.',
  },
  [ListingCategory.AirConditioningUnits]: {
    label: 'Air Conditioning Units',
    description: 'Split systems, VRF, HVAC units, and portable AC.',
  },
  [ListingCategory.RefrigerationParts]: {
    label: 'Refrigeration Parts',
    description: 'Compressors, fans, condensers, evaporators, and spares.',
  },
  [ListingCategory.ControllersElectrical]: {
    label: 'Controllers & Electrical',
    description: 'Temperature controllers, PCBs, relays, and electrical parts.',
  },
  [ListingCategory.ToolsAccessories]: {
    label: 'Tools & Accessories',
    description: 'Trade tools, gauges, manifolds, and accessories.',
  },
  [ListingCategory.ClearanceStock]: {
    label: 'Clearance Stock',
    description: 'End-of-line, excess, and clearance-priced items.',
  },
};

// ---------------------------------------------------------------------------
// Listing conditions
// ---------------------------------------------------------------------------

export const LISTING_CONDITIONS: Record<ListingCondition, { label: string; description: string }> = {
  [ListingCondition.New]: {
    label: 'New',
    description: 'Brand new, unused, in original packaging.',
  },
  [ListingCondition.UsedGood]: {
    label: 'Used – Good',
    description: 'Used but in good working order with minor cosmetic wear.',
  },
  [ListingCondition.UsedFair]: {
    label: 'Used – Fair',
    description: 'Used with visible wear; may need minor attention.',
  },
  [ListingCondition.Refurbished]: {
    label: 'Refurbished',
    description: 'Professionally refurbished and tested.',
  },
  [ListingCondition.ExDisplay]: {
    label: 'Ex-Display',
    description: 'Previously used as a display model.',
  },
  [ListingCondition.ForParts]: {
    label: 'For Parts / Not Working',
    description: 'Sold for spares or repair only.',
  },
};

// ---------------------------------------------------------------------------
// MVP posting limits (placeholder — wire to entitlement/plan checks later)
// ---------------------------------------------------------------------------

/** TODO: Replace with plan-aware entitlement checks when billing is implemented. */
export const MVP_LISTING_LIMITS = {
  /** Maximum active listings for a free private seller account. */
  FREE_SELLER_MAX_ACTIVE: 5,
  /** Maximum photos per listing on a free plan. */
  FREE_MAX_PHOTOS: 6,
  /** Maximum title length in characters. */
  MAX_TITLE_LENGTH: 100,
  /** Maximum description length in characters. */
  MAX_DESCRIPTION_LENGTH: 2000,
} as const;
