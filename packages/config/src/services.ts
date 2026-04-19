/**
 * packages/config/src/services.ts
 * Services and equipment categories offered on EK Marketplace.
 */

export interface ServiceOption {
  slug: string;
  label: string;
  group: string;
}

/**
 * Services a business can offer (Step 5 of onboarding).
 * TODO: move groups/slugs to a DB lookup table for admin editability.
 */
export const SERVICES_OFFERED: ServiceOption[] = [
  // --- Air Conditioning ---
  { slug: 'ac-installation', label: 'AC Installation', group: 'Air Conditioning' },
  { slug: 'ac-servicing', label: 'AC Servicing & Maintenance', group: 'Air Conditioning' },
  { slug: 'ac-repair', label: 'AC Repair', group: 'Air Conditioning' },

  // --- Refrigeration ---
  { slug: 'fridge-freezer-repair', label: 'Fridge / Freezer Repair', group: 'Refrigeration' },
  {
    slug: 'commercial-fridge-servicing',
    label: 'Commercial Refrigeration Servicing',
    group: 'Refrigeration',
  },
  {
    slug: 'cold-room-installation',
    label: 'Cold Room Installation',
    group: 'Refrigeration',
  },
  {
    slug: 'cold-room-repair',
    label: 'Cold Room Repair',
    group: 'Refrigeration',
  },
  {
    slug: 'freezer-room-installation',
    label: 'Freezer Room Installation',
    group: 'Refrigeration',
  },
  {
    slug: 'freezer-room-repair',
    label: 'Freezer Room Repair',
    group: 'Refrigeration',
  },

  // --- Contracts ---
  {
    slug: 'maintenance-contracts',
    label: 'Maintenance Contracts',
    group: 'Contracts & Callouts',
  },
  {
    slug: 'emergency-callout',
    label: 'Emergency Callout',
    group: 'Contracts & Callouts',
  },

  // --- Specialist ---
  {
    slug: 'refrigerant-recovery',
    label: 'Refrigerant Recovery & Recharge',
    group: 'Specialist',
  },
  { slug: 'system-design', label: 'System Design & Consultancy', group: 'Specialist' },
  { slug: 'commissioning', label: 'Commissioning & Handover', group: 'Specialist' },
];

export interface EquipmentCategoryOption {
  slug: string;
  label: string;
  group: string;
}

/**
 * Equipment categories a business can sell (Step 6 of onboarding).
 * TODO: align with listing category taxonomy once schema is finalised.
 */
export const EQUIPMENT_CATEGORIES: EquipmentCategoryOption[] = [
  // --- AC Units ---
  { slug: 'split-ac', label: 'Split AC Units', group: 'Air Conditioning' },
  { slug: 'multi-split-ac', label: 'Multi-Split AC Units', group: 'Air Conditioning' },
  { slug: 'cassette-ac', label: 'Cassette AC Units', group: 'Air Conditioning' },
  { slug: 'portable-ac', label: 'Portable AC Units', group: 'Air Conditioning' },
  { slug: 'vrf-vrv', label: 'VRF / VRV Systems', group: 'Air Conditioning' },

  // --- Refrigeration ---
  { slug: 'display-fridge', label: 'Display Fridges & Cabinets', group: 'Refrigeration' },
  { slug: 'bottle-cooler', label: 'Bottle Coolers', group: 'Refrigeration' },
  { slug: 'upright-freezer', label: 'Upright Freezers', group: 'Refrigeration' },
  { slug: 'chest-freezer', label: 'Chest Freezers', group: 'Refrigeration' },
  { slug: 'cold-room-panels', label: 'Cold Room Panels & Doors', group: 'Refrigeration' },
  {
    slug: 'refrigeration-compressors',
    label: 'Compressors & Condensing Units',
    group: 'Refrigeration',
  },

  // --- Parts & Consumables ---
  { slug: 'refrigerant-gas', label: 'Refrigerant Gas', group: 'Parts & Consumables' },
  { slug: 'controls-electrical', label: 'Controls & Electrical Parts', group: 'Parts & Consumables' },
  { slug: 'tools-accessories', label: 'Tools & Accessories', group: 'Parts & Consumables' },
  { slug: 'filters-consumables', label: 'Filters & Consumables', group: 'Parts & Consumables' },
];
