/**
 * packages/config/src/serviceAreas.ts
 * UK service area constants for EK Marketplace (MVP set).
 *
 * MVP: broad UK regions + major cities.
 * TODO: expand to county-level and postcode-radius matching.
 */

import type { BusinessServiceArea } from '@ek/types';

export const SERVICE_AREA_OPTIONS: BusinessServiceArea[] = [
  // --- Whole UK ---
  { label: 'Nationwide (UK)', slug: 'nationwide-uk' },

  // --- England: Regions ---
  { label: 'London', slug: 'london' },
  { label: 'South East England', slug: 'south-east-england' },
  { label: 'South West England', slug: 'south-west-england' },
  { label: 'East of England', slug: 'east-of-england' },
  { label: 'East Midlands', slug: 'east-midlands' },
  { label: 'West Midlands', slug: 'west-midlands' },
  { label: 'Yorkshire & The Humber', slug: 'yorkshire-humber' },
  { label: 'North West England', slug: 'north-west-england' },
  { label: 'North East England', slug: 'north-east-england' },

  // --- Scotland ---
  { label: 'Scotland', slug: 'scotland' },

  // --- Wales ---
  { label: 'Wales', slug: 'wales' },

  // --- Northern Ireland ---
  { label: 'Northern Ireland', slug: 'northern-ireland' },

  // --- Major cities (common search terms) ---
  { label: 'Birmingham', slug: 'birmingham' },
  { label: 'Manchester', slug: 'manchester' },
  { label: 'Leeds', slug: 'leeds' },
  { label: 'Liverpool', slug: 'liverpool' },
  { label: 'Bristol', slug: 'bristol' },
  { label: 'Sheffield', slug: 'sheffield' },
  { label: 'Edinburgh', slug: 'edinburgh' },
  { label: 'Glasgow', slug: 'glasgow' },
  { label: 'Cardiff', slug: 'cardiff' },
  { label: 'Belfast', slug: 'belfast' },
];
