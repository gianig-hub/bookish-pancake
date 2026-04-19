/**
 * apps/api/src/modules/business_profiles/business_profiles.types.ts
 * Server-side types for the business_profiles module.
 *
 * TODO: replace with Prisma/TypeORM generated types once DB schema is defined.
 */

import type {
  BusinessServiceArea,
  OpeningHours,
  ContactDetails,
} from '@ek/types';

/** A persisted business profile entity. One-to-one with Business. */
export interface BusinessProfile {
  id: string;
  businessId: string;
  tagline?: string;
  description?: string;
  /** TODO: store as reference to file-storage service (S3/R2) */
  logoUrl?: string;
  /** TODO: store as reference to file-storage service */
  coverImageUrl?: string;
  servicesOffered: string[];
  equipmentCategories: string[];
  serviceAreas: BusinessServiceArea[];
  contactDetails: ContactDetails;
  openingHours?: OpeningHours;
  /** Whether the profile is publicly visible */
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBusinessProfileDto = Omit<
  BusinessProfile,
  'id' | 'published' | 'createdAt' | 'updatedAt'
>;

export type UpdateBusinessProfileDto = Partial<
  Omit<BusinessProfile, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>
>;
