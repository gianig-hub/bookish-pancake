/**
 * packages/config/src/profileCompletion.ts
 * MVP profile-completion requirements for EK Marketplace business profiles.
 *
 * TODO: drive completion score from server-side logic once profiles are persisted.
 */

import type { BusinessProfileDraft } from '@ek/types';

/**
 * A single requirement checked against the draft during the onboarding preview step.
 */
export interface ProfileCompletionRequirement {
  key: string;
  label: string;
  /** Whether this requirement must be met before a profile can be published */
  required: boolean;
  /** Check function — returns true if the draft satisfies this requirement */
  check: (draft: BusinessProfileDraft) => boolean;
}

/**
 * Ordered list of MVP profile-completion requirements.
 * The order matches the onboarding step sequence.
 */
export const PROFILE_COMPLETION_REQUIREMENTS: ProfileCompletionRequirement[] = [
  {
    key: 'businessType',
    label: 'Business type selected',
    required: true,
    check: (d) => Boolean(d.businessType),
  },
  {
    key: 'businessName',
    label: 'Business name provided',
    required: true,
    check: (d) => Boolean(d.businessName?.trim()),
  },
  {
    key: 'description',
    label: 'Business description added',
    required: true,
    check: (d) => Boolean(d.description?.trim() && d.description.trim().length >= 20),
  },
  {
    key: 'servicesOffered',
    label: 'At least one service selected',
    required: false,
    check: (d) => Boolean(d.servicesOffered && d.servicesOffered.length > 0),
  },
  {
    key: 'serviceAreas',
    label: 'At least one service area selected',
    required: true,
    check: (d) => Boolean(d.serviceAreas && d.serviceAreas.length > 0),
  },
  {
    key: 'contactDetails',
    label: 'Contact details provided (phone or email)',
    required: true,
    check: (d) =>
      Boolean(d.contactDetails?.phone?.trim() || d.contactDetails?.email?.trim()),
  },
  {
    key: 'logo',
    label: 'Logo uploaded',
    required: false,
    // TODO: check against real storage URL once file upload is wired up
    check: (d) => Boolean(d.logoUrl),
  },
];

/**
 * Calculate a completion percentage (0–100) for a given draft.
 * Only counts required items for the published-gating percentage.
 */
export function calcProfileCompletion(draft: BusinessProfileDraft): number {
  const required = PROFILE_COMPLETION_REQUIREMENTS.filter((r) => r.required);
  const passed = required.filter((r) => r.check(draft)).length;
  return Math.round((passed / required.length) * 100);
}

/**
 * Returns true if all required fields are present and the profile can be published.
 */
export function isProfilePublishable(draft: BusinessProfileDraft): boolean {
  return PROFILE_COMPLETION_REQUIREMENTS.filter((r) => r.required).every((r) =>
    r.check(draft),
  );
}
