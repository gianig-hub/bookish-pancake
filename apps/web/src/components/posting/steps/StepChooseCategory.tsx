/** Step 2 – Choose Category */
import React from 'react';
import { ListingCategory, ListingPurpose } from '@ek/types';
import { CATEGORY_OPTIONS, SERVICE_CATEGORIES } from '@ek/config';
import { StepProps } from '../types';

const StepChooseCategory: React.FC<StepProps> = ({ draft, updateDraft, onNext, onBack }) => {
  // For service requests, only show service categories
  const isServicePurpose = draft.purpose === ListingPurpose.SERVICE_REQUEST;
  const filtered = CATEGORY_OPTIONS.filter((opt) =>
    isServicePurpose ? SERVICE_CATEGORIES.includes(opt.value) : !SERVICE_CATEGORIES.includes(opt.value)
  );

  const handleSelect = (value: ListingCategory) => {
    updateDraft({ category: value });
    onNext();
  };

  return (
    <div className="step step--category">
      <h2>Choose a category</h2>
      <ul className="option-list">
        {filtered.map(({ value, label }) => (
          <li key={value}>
            <button
              type="button"
              className={`option-btn${draft.category === value ? ' option-btn--selected' : ''}`}
              onClick={() => handleSelect(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="btn-back" onClick={onBack}>← Back</button>
    </div>
  );
};

export default StepChooseCategory;
