/**
 * StepDetails — step 3 of the posting flow.
 *
 * The user enters the listing title and description.
 * AI assist components are offered to generate a title or improve the description.
 * Both are completely optional.
 */

import React from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import { MVP_LISTING_LIMITS } from '@ek-marketplace/config';
import { AiSuggestTitle, AiImproveDescription } from '../../components/ai-assist';

interface StepDetailsProps {
  draft: Partial<ListingDraft>;
  onUpdate: (updates: Partial<ListingDraft>) => void;
}

export function StepDetails({ draft, onUpdate }: StepDetailsProps) {
  const titleLength = draft.title?.length ?? 0;
  const descLength = draft.description?.length ?? 0;

  return (
    <div className="posting-step posting-step--details">
      <h2>Title &amp; Description</h2>

      {/* Title field */}
      <div className="posting-step__field">
        <label htmlFor="listing-title">
          Title <span aria-hidden="true">*</span>
        </label>
        <input
          id="listing-title"
          type="text"
          maxLength={MVP_LISTING_LIMITS.MAX_TITLE_LENGTH}
          value={draft.title ?? ''}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="e.g. Commercial chest freezer – working condition"
          aria-describedby="listing-title-hint"
        />
        <p id="listing-title-hint" className="posting-step__field-hint">
          {titleLength}/{MVP_LISTING_LIMITS.MAX_TITLE_LENGTH} characters
        </p>

        {/* AI title generation — shown below the input, optional */}
        <AiSuggestTitle
          draft={draft}
          onApply={(title) => onUpdate({ title })}
        />
      </div>

      {/* Description field */}
      <div className="posting-step__field">
        <label htmlFor="listing-description">
          Description <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="listing-description"
          maxLength={MVP_LISTING_LIMITS.MAX_DESCRIPTION_LENGTH}
          rows={6}
          value={draft.description ?? ''}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Include brand, model, age, any known issues, and why you're selling."
          aria-describedby="listing-description-hint"
        />
        <p id="listing-description-hint" className="posting-step__field-hint">
          {descLength}/{MVP_LISTING_LIMITS.MAX_DESCRIPTION_LENGTH} characters
        </p>

        {/* AI description improvement — shown below the textarea, optional */}
        <AiImproveDescription
          draft={draft}
          onApply={(description) => onUpdate({ description })}
        />
      </div>
    </div>
  );
}
