/**
 * Listing validation helpers.
 * TODO: replace with a proper schema-validation library (e.g. zod) once the
 *       data model is finalized.
 */

import { ListingDraft, ListingPurpose, ListingCategory } from '@ek/types';
import { POSTING_LIMITS } from '@ek/config';
import { ValidationError } from './listings.types';

export function validateListingDraft(draft: ListingDraft): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!draft.purpose || !Object.values(ListingPurpose).includes(draft.purpose)) {
    errors.push({ field: 'purpose', message: 'A valid purpose is required.' });
  }

  if (!draft.category || !Object.values(ListingCategory).includes(draft.category)) {
    errors.push({ field: 'category', message: 'A valid category is required.' });
  }

  if (!draft.title?.trim()) {
    errors.push({ field: 'title', message: 'Title is required.' });
  } else if (draft.title.length > POSTING_LIMITS.TITLE_MAX_LENGTH) {
    errors.push({
      field: 'title',
      message: `Title must be ${POSTING_LIMITS.TITLE_MAX_LENGTH} characters or fewer.`,
    });
  }

  if (!draft.description?.trim()) {
    errors.push({ field: 'description', message: 'Description is required.' });
  } else if (draft.description.length > POSTING_LIMITS.DESCRIPTION_MAX_LENGTH) {
    errors.push({
      field: 'description',
      message: `Description must be ${POSTING_LIMITS.DESCRIPTION_MAX_LENGTH} characters or fewer.`,
    });
  }

  if (draft.pricePence !== undefined) {
    if (draft.pricePence < 0) {
      errors.push({ field: 'pricePence', message: 'Price cannot be negative.' });
    }
    if (draft.pricePence > POSTING_LIMITS.MAX_PRICE_PENCE) {
      errors.push({
        field: 'pricePence',
        message: `Price exceeds the maximum allowed value.`,
      });
    }
  }

  if (!draft.location?.city?.trim()) {
    errors.push({ field: 'location.city', message: 'Location city is required.' });
  }

  // TODO: validate UK postcode format when provided
  // TODO: validate photo array when real upload is implemented

  return errors;
}
