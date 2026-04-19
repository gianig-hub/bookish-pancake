/**
 * StepCondition — step 4 of the posting flow.
 *
 * The user selects the condition of their item.
 * An optional AI component can suggest condition from the description.
 */

import React from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import { ListingCondition } from '@ek-marketplace/types';
import { LISTING_CONDITIONS } from '@ek-marketplace/config';
import { AiSuggestCondition } from '../../components/ai-assist';

interface StepConditionProps {
  draft: Partial<ListingDraft>;
  onUpdate: (updates: Partial<ListingDraft>) => void;
}

export function StepCondition({ draft, onUpdate }: StepConditionProps) {
  return (
    <div className="posting-step posting-step--condition">
      <h2>Item Condition</h2>
      <p className="posting-step__description">
        Be honest about the condition — buyers appreciate transparency.
      </p>

      <div className="posting-step__options" role="radiogroup" aria-label="Item condition">
        {Object.values(ListingCondition).map((condition) => {
          const { label, description } = LISTING_CONDITIONS[condition];
          const isSelected = draft.condition === condition;

          return (
            <label
              key={condition}
              className={[
                'posting-step__option',
                isSelected ? 'posting-step__option--selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                type="radio"
                name="condition"
                value={condition}
                checked={isSelected}
                onChange={() => onUpdate({ condition })}
                aria-label={label}
              />
              <span className="posting-step__option-label">{label}</span>
              <span className="posting-step__option-description">{description}</span>
            </label>
          );
        })}
      </div>

      {/* Optional AI assist: suggests condition from description */}
      <div className="posting-step__ai-assist">
        <AiSuggestCondition
          draft={draft}
          onApply={(condition) => onUpdate({ condition })}
        />
      </div>
    </div>
  );
}
