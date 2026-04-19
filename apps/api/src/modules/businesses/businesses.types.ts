/**
 * apps/api/src/modules/businesses/businesses.types.ts
 * Server-side types for the businesses module.
 *
 * TODO: replace with Prisma/TypeORM generated types once DB schema is defined.
 */

import type { BusinessType, VerificationStatus, ContactDetails } from '@ek/types';

/** A persisted business entity (server-side). */
export interface Business {
  id: string;
  ownerId: string; // user ID of the account that created this business
  businessName: string;
  businessType: BusinessType;
  slug: string; // URL-friendly unique slug, e.g. "acme-hvac-london"
  verificationStatus: VerificationStatus;
  contactDetails: ContactDetails;
  createdAt: Date;
  updatedAt: Date;
}

/** Payload accepted when creating a new business. */
export type CreateBusinessDto = Pick<
  Business,
  'businessName' | 'businessType' | 'contactDetails'
>;

/** Payload accepted when updating a business. */
export type UpdateBusinessDto = Partial<
  Pick<Business, 'businessName' | 'businessType' | 'contactDetails'>
>;
