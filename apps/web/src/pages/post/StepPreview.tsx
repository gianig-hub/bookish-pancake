/**
 * StepPreview — final step of the posting flow.
 *
 * Shows a read-only summary of the draft before submission.
 * Includes the AI Assist Panel (optional) so the user can run a final
 * AI review and apply any suggestions before submitting.
 *
 * AI is NOT required to submit — the submit button is always available.
 */

import React from 'react';
import type { ListingDraft, ListingImprovementResult } from '@ek-marketplace/types';
import { LISTING_PURPOSES, LISTING_CATEGORIES, LISTING_CONDITIONS } from '@ek-marketplace/config';
import { AiAssistPanel, AiDetectMissing } from '../../components/ai-assist';

interface StepPreviewProps {
  draft: Partial<ListingDraft>;
  onApplyAiImprovement: (result: ListingImprovementResult) => void;
}

function PreviewRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="preview-row">
      <dt className="preview-row__label">{label}</dt>
      <dd className="preview-row__value">{value}</dd>
    </div>
  );
}

export function StepPreview({ draft, onApplyAiImprovement }: StepPreviewProps) {
  const purposeLabel = draft.purpose ? LISTING_PURPOSES[draft.purpose]?.label : undefined;
  const categoryLabel = draft.category ? LISTING_CATEGORIES[draft.category]?.label : undefined;
  const conditionLabel = draft.condition ? LISTING_CONDITIONS[draft.condition]?.label : undefined;
  const priceDisplay = draft.priceGbp != null
    ? `£${draft.priceGbp}${draft.negotiable ? ' (negotiable)' : ''}`
    : draft.negotiable
    ? 'Negotiable'
    : undefined;
  const locationDisplay = [draft.location?.city, draft.location?.postcode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="posting-step posting-step--preview">
      <h2>Preview Your Listing</h2>
      <p className="posting-step__description">
        Review the details below. You can go back and edit any step.
        Submit when you are happy with your listing.
      </p>

      {/* Missing field checker — always visible on preview step */}
      <AiDetectMissing draft={draft} />

      <dl className="listing-preview">
        <PreviewRow label="Purpose" value={purposeLabel} />
        <PreviewRow label="Category" value={categoryLabel} />
        <PreviewRow label="Title" value={draft.title} />
        <PreviewRow label="Description" value={draft.description} />
        <PreviewRow label="Condition" value={conditionLabel} />
        <PreviewRow label="Price" value={priceDisplay} />
        <PreviewRow label="Location" value={locationDisplay || undefined} />
      </dl>

      {draft.photoUrls && draft.photoUrls.length > 0 ? (
        <p>{draft.photoUrls.length} photo(s) attached.</p>
      ) : (
        <p className="posting-step__placeholder-note">No photos added yet.</p>
      )}

      {draft.aiAssisted && (
        <p className="posting-step__ai-badge" aria-label="This listing used AI assistance">
          ✨ AI assisted
        </p>
      )}

      {/* Optional AI Assist Panel — user can run a full AI review before submitting */}
      <AiAssistPanel
        draft={draft}
        onApplyImprovement={onApplyAiImprovement}
      />
    </div>
  );
}
