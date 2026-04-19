/**
 * StepCategory — step 2 of the posting flow.
 *
 * The user chooses the listing category. An optional AI component can
 * suggest the best category based on the draft title/description.
 */

import React from 'react';
import type { ListingDraft } from '@ek-marketplace/types';
import { ListingCategory } from '@ek-marketplace/types';
import { LISTING_CATEGORIES } from '@ek-marketplace/config';
import { AiSuggestCategory } from '../../components/ai-assist';

interface StepCategoryProps {
  draft: Partial<ListingDraft>;
  onUpdate: (updates: Partial<ListingDraft>) => void;
}

export function StepCategory({ draft, onUpdate }: StepCategoryProps) {
  return (
    <div className="posting-step posting-step--category">
      <h2>Choose a Category</h2>
      <p className="posting-step__description">
        Select the category that best fits your item or service.
      </p>

      <div className="posting-step__options" role="radiogroup" aria-label="Listing category">
        {Object.values(ListingCategory).map((category) => {
          const { label, description } = LISTING_CATEGORIES[category];
          const isSelected = draft.category === category;

          return (
            <label
              key={category}
              className={[
                'posting-step__option',
                isSelected ? 'posting-step__option--selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={isSelected}
                onChange={() => onUpdate({ category })}
                aria-label={label}
              />
              <span className="posting-step__option-label">{label}</span>
              <span className="posting-step__option-description">{description}</span>
            </label>
          );
        })}
      </div>

      {/* Optional AI assist: suggests a category from draft context */}
      <div className="posting-step__ai-assist">
        <p className="posting-step__ai-hint">Not sure which category? Let AI suggest one.</p>
        <AiSuggestCategory
          draft={draft}
          onApply={(category) => onUpdate({ category })}
        />
      </div>
    </div>
  );
}
