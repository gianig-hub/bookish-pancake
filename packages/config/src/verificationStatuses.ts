/**
 * packages/config/src/verificationStatuses.ts
 * Verification status constants for EK Marketplace.
 */

import type { VerificationStatus } from '@ek/types';

export interface VerificationStatusMeta {
  value: VerificationStatus;
  label: string;
  description: string;
  /** Tailwind-style colour hint — TODO: map to design tokens */
  colour: 'grey' | 'yellow' | 'green' | 'red' | 'orange';
}

/**
 * All possible verification states and their UI metadata.
 * Keep in sync with VerificationStatus union in packages/types.
 */
export const VERIFICATION_STATUS_META: VerificationStatusMeta[] = [
  {
    value: 'unverified',
    label: 'Unverified',
    description: 'Profile is active but not yet verified by the EK Marketplace team.',
    colour: 'grey',
  },
  {
    value: 'pending_review',
    label: 'Pending Review',
    description: 'Documents or information have been submitted and are under review.',
    colour: 'yellow',
  },
  {
    value: 'verified',
    label: 'Verified',
    description: 'Business has been verified by EK Marketplace.',
    colour: 'green',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    description: 'Verification was unsuccessful. Contact support for details.',
    colour: 'red',
  },
  {
    value: 'suspended',
    label: 'Suspended',
    description: 'Account has been suspended. Contact support.',
    colour: 'orange',
  },
];
