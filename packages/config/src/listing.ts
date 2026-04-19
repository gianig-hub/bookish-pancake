import {
  ListingPurpose,
  ListingCategory,
  ListingCondition,
} from '@ek/types';

// ─── Display Labels ───────────────────────────────────────────────────────────

export const PURPOSE_LABELS: Record<ListingPurpose, string> = {
  [ListingPurpose.FOR_SALE]: 'For Sale',
  [ListingPurpose.WANTED]: 'Wanted',
  [ListingPurpose.SERVICE_REQUEST]: 'Service Request',
  [ListingPurpose.HIRE]: 'Hire / Rental',
};

export const CATEGORY_LABELS: Record<ListingCategory, string> = {
  [ListingCategory.AC_UNITS]: 'AC Units',
  [ListingCategory.REFRIGERATION]: 'Refrigeration Equipment',
  [ListingCategory.COLD_ROOMS]: 'Cold Rooms',
  [ListingCategory.FREEZER_ROOMS]: 'Freezer Rooms',
  [ListingCategory.DISPLAY_REFRIGERATION]: 'Display Refrigeration',
  [ListingCategory.PARTS]: 'Parts & Components',
  [ListingCategory.TOOLS_ACCESSORIES]: 'Tools & Accessories',
  [ListingCategory.CLEARANCE_STOCK]: 'Clearance Stock',
  [ListingCategory.AC_INSTALLATION]: 'AC Installation',
  [ListingCategory.AC_SERVICING]: 'AC Servicing & Repairs',
  [ListingCategory.REFRIGERATION_SERVICE]: 'Refrigeration Service & Repairs',
  [ListingCategory.COLD_ROOM_INSTALL]: 'Cold Room Install / Repair',
  [ListingCategory.EMERGENCY_BREAKDOWN]: 'Emergency Breakdown',
  [ListingCategory.MAINTENANCE_CONTRACT]: 'Maintenance Contract',
  [ListingCategory.OTHER]: 'Other',
};

export const CONDITION_LABELS: Record<ListingCondition, string> = {
  [ListingCondition.NEW]: 'New',
  [ListingCondition.USED]: 'Used',
  [ListingCondition.REFURBISHED]: 'Refurbished',
  [ListingCondition.EX_DISPLAY]: 'Ex-Display',
  [ListingCondition.TRADE_STOCK]: 'Trade Stock',
  [ListingCondition.CLEARANCE]: 'Clearance',
  [ListingCondition.FOR_PARTS]: 'For Parts / Not Working',
};

// ─── Grouped options for step UI ─────────────────────────────────────────────

export const PURPOSE_OPTIONS = Object.values(ListingPurpose).map((value) => ({
  value,
  label: PURPOSE_LABELS[value],
}));

/** Equipment categories (physical goods) */
export const EQUIPMENT_CATEGORIES: ListingCategory[] = [
  ListingCategory.AC_UNITS,
  ListingCategory.REFRIGERATION,
  ListingCategory.COLD_ROOMS,
  ListingCategory.FREEZER_ROOMS,
  ListingCategory.DISPLAY_REFRIGERATION,
  ListingCategory.PARTS,
  ListingCategory.TOOLS_ACCESSORIES,
  ListingCategory.CLEARANCE_STOCK,
  ListingCategory.OTHER,
];

/** Service categories */
export const SERVICE_CATEGORIES: ListingCategory[] = [
  ListingCategory.AC_INSTALLATION,
  ListingCategory.AC_SERVICING,
  ListingCategory.REFRIGERATION_SERVICE,
  ListingCategory.COLD_ROOM_INSTALL,
  ListingCategory.EMERGENCY_BREAKDOWN,
  ListingCategory.MAINTENANCE_CONTRACT,
];

export const CATEGORY_OPTIONS = Object.values(ListingCategory).map((value) => ({
  value,
  label: CATEGORY_LABELS[value],
  isService: SERVICE_CATEGORIES.includes(value),
}));

export const CONDITION_OPTIONS = Object.values(ListingCondition).map((value) => ({
  value,
  label: CONDITION_LABELS[value],
}));

// ─── Posting limits (MVP) ─────────────────────────────────────────────────────

export const POSTING_LIMITS = {
  /** Max title length in characters */
  TITLE_MAX_LENGTH: 100,
  /** Max description length in characters */
  DESCRIPTION_MAX_LENGTH: 3000,
  /** Max photos per listing – TODO: increase post-MVP */
  MAX_PHOTOS: 10,
  /** Max price in pence (£99,999.99) */
  MAX_PRICE_PENCE: 9_999_999,
  /** Free listings per month for basic accounts */
  FREE_LISTINGS_PER_MONTH: 3,
} as const;

// ─── Posting flow steps ───────────────────────────────────────────────────────

export const POSTING_STEPS = [
  { step: 1, key: 'purpose', label: 'Choose Purpose' },
  { step: 2, key: 'category', label: 'Choose Category' },
  { step: 3, key: 'details', label: 'Title & Description' },
  { step: 4, key: 'condition', label: 'Condition' },
  { step: 5, key: 'price', label: 'Price' },
  { step: 6, key: 'location', label: 'Location' },
  { step: 7, key: 'photos', label: 'Photos' },
  { step: 8, key: 'preview', label: 'Preview & Submit' },
] as const;

export type PostingStepKey = (typeof POSTING_STEPS)[number]['key'];
