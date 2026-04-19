/**
 * Listing types used within the API layer.
 * Extends shared @ek/types with API-specific shapes.
 */

import {
  ListingDraft,
  ListingRecord,
  ListingStatus,
  ListingCategory,
  ListingPurpose,
  ListingCondition,
} from '@ek/types';

export {
  ListingDraft,
  ListingRecord,
  ListingStatus,
  ListingCategory,
  ListingPurpose,
  ListingCondition,
};

/** Request body for POST /listings/draft */
export interface CreateDraftRequest {
  draft: ListingDraft;
}

/** Response envelope for a single listing */
export interface ListingResponse {
  success: true;
  data: ListingRecord;
}

/** Paginated listing list response */
export interface ListingsListResponse {
  success: true;
  data: ListingRecord[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
  };
}

/** Validation error shape returned by the API */
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationErrorResponse {
  success: false;
  errors: ValidationError[];
}
