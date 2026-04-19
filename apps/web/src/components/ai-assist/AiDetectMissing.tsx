/**
 * AiDetectMissing — shows missing or incomplete fields in the listing draft.
 *
 * Reads from the rule-based analysis on the client side (mirroring the API)
 * so the user gets immediate feedback without a round-trip.
 *
 * This component does NOT call the AI backend — it uses the same heuristic
 * field checks as the API-side `detectMissingInfo` handler.
 *
 * TODO: Replace heuristic checks with a real API call when AI quality-scoring is live.
 */

import React, { useMemo } from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import { MissingListingField } from '@ek-marketplace/types';
import {
  AI_LISTING_ASSIST_ENABLED,
  AI_SUGGESTION_FLAGS,
  MISSING_FIELD_TIPS,
} from '@ek-marketplace/config';
import { AiSuggestionType } from '@ek-marketplace/types';

interface AiDetectMissingProps {
  draft: Partial<ListingDraft>;
}

/**
 * Computes missing fields client-side using the same heuristics as the API handler.
 */
function computeMissingFields(draft: Partial<ListingDraft>): MissingListingField[] {
  const missing: MissingListingField[] = [];

  if (!draft.title || draft.title.trim().length < 5) missing.push(MissingListingField.Title);
  if (!draft.description || draft.description.trim().length < 20)
    missing.push(MissingListingField.Description);
  if (!draft.category) missing.push(MissingListingField.Category);
  if (!draft.purpose) missing.push(MissingListingField.Purpose);
  if (!draft.condition) missing.push(MissingListingField.Condition);
  if (draft.priceGbp == null && !draft.negotiable) missing.push(MissingListingField.Price);
  if (!draft.location?.city && !draft.location?.postcode) missing.push(MissingListingField.Location);
  if (!draft.photoUrls || draft.photoUrls.length === 0) missing.push(MissingListingField.Photos);

  return missing;
}

/**
 * Renders a list of incomplete/missing fields and improvement tips.
 * Returns null when the draft is complete (nothing to flag).
 */
export function AiDetectMissing({ draft }: AiDetectMissingProps) {
  if (!AI_LISTING_ASSIST_ENABLED || !AI_SUGGESTION_FLAGS[AiSuggestionType.DetectMissingInfo]) {
    return null;
  }

  const missingFields = useMemo(() => computeMissingFields(draft), [draft]);

  if (missingFields.length === 0) {
    return (
      <div className="ai-detect-missing ai-detect-missing--complete" role="status">
        <span aria-hidden="true">✅</span> Your listing looks complete.
      </div>
    );
  }

  return (
    <div className="ai-detect-missing" role="region" aria-label="Listing checklist">
      <p className="ai-detect-missing__heading">
        <span aria-hidden="true">💡</span> Your listing is missing a few things:
      </p>
      <ul className="ai-detect-missing__list">
        {missingFields.map((field) => (
          <li key={field} className="ai-detect-missing__item">
            <strong>{field.replace(/_/g, ' ')}:</strong>{' '}
            {MISSING_FIELD_TIPS[field]}
          </li>
        ))}
      </ul>
    </div>
  );
}
