/**
 * packages/config/src/businessTypes.ts
 * Business-type constants for EK Marketplace.
 */

import type { BusinessType } from '@ek/types';

export interface BusinessTypeOption {
  value: BusinessType;
  label: string;
  description: string;
  icon: string; // emoji placeholder — TODO: replace with proper icon component
}

/**
 * Ordered list of business types shown during onboarding Step 1.
 * Keep in sync with BusinessType union in packages/types.
 */
export const BUSINESS_TYPE_OPTIONS: BusinessTypeOption[] = [
  {
    value: 'installer',
    label: 'Installer / Engineer',
    description: 'You install, service, or repair AC and refrigeration equipment.',
    icon: '🔧',
  },
  {
    value: 'supplier',
    label: 'Parts Supplier',
    description: 'You supply components, refrigerants, or consumables to the trade.',
    icon: '📦',
  },
  {
    value: 'dealer',
    label: 'Equipment Dealer',
    description: 'You buy and sell new or used AC / refrigeration units.',
    icon: '🏪',
  },
  {
    value: 'service_provider',
    label: 'Service Provider',
    description: 'You offer maintenance contracts, emergency callouts, or specialist services.',
    icon: '🛠️',
  },
  {
    value: 'manufacturer',
    label: 'Manufacturer / Brand',
    description: 'You manufacture equipment or branded product lines.',
    icon: '🏭',
  },
  {
    value: 'other',
    label: 'Other',
    description: 'Your business does not fit neatly into the above categories.',
    icon: '❓',
  },
];
