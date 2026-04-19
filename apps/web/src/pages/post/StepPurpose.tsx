/**
 * StepPurpose — step 1 of the posting flow.
 *
 * The user chooses the listing purpose (for_sale, wanted, etc.).
 * An optional AI component can suggest the purpose if the user is unsure.
 *
 * AI assist is purely optional — the user can select a purpose without it.
 */

import React from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import { ListingPurpose } from '@ek-marketplace/types';
import { LISTING_PURPOSES } from '@ek-marketplace/config';
import { AiSuggestPurpose } from '../../components/ai-assist';

interface StepPurposeProps {
  draft: Partial<ListingDraft>;
  onUpdate: (updates: Partial<ListingDraft>) => void;
}

export function StepPurpose({ draft, onUpdate }: StepPurposeProps) {
  return (
    <div className="posting-step posting-step--purpose">
      <h2>What type of listing is this?</h2>
      <p className="posting-step__description">
        Choose the purpose that best describes what you want to post.
      </p>

      <div className="posting-step__options" role="radiogroup" aria-label="Listing purpose">
        {Object.values(ListingPurpose).map((purpose) => {
          const { label, description } = LISTING_PURPOSES[purpose];
          const isSelected = draft.purpose === purpose;

          return (
            <label
              key={purpose}
              className={[
                'posting-step__option',
                isSelected ? 'posting-step__option--selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                type="radio"
                name="purpose"
                value={purpose}
                checked={isSelected}
                onChange={() => onUpdate({ purpose })}
                aria-label={label}
              />
              <span className="posting-step__option-label">{label}</span>
              <span className="posting-step__option-description">{description}</span>
            </label>
          );
        })}
      </div>

      {/* Optional AI assist: suggests a purpose based on the draft */}
      {!draft.purpose && (
        <div className="posting-step__ai-assist">
          <p className="posting-step__ai-hint">Not sure which to choose?</p>
          <AiSuggestPurpose
            draft={draft}
            onApply={(purpose) => onUpdate({ purpose })}
          />
        </div>
      )}
    </div>
  );
}
