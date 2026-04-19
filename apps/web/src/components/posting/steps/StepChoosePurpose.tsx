/** Step 1 – Choose Purpose */
import React from 'react';
import { ListingPurpose } from '@ek/types';
import { PURPOSE_OPTIONS } from '@ek/config';
import { StepProps } from '../types';

const StepChoosePurpose: React.FC<StepProps> = ({ draft, updateDraft, onNext }) => {
  const handleSelect = (value: ListingPurpose) => {
    updateDraft({ purpose: value });
    onNext();
  };

  return (
    <div className="step step--purpose">
      <h2>What would you like to do?</h2>
      <ul className="option-list">
        {PURPOSE_OPTIONS.map(({ value, label }) => (
          <li key={value}>
            <button
              type="button"
              className={`option-btn${draft.purpose === value ? ' option-btn--selected' : ''}`}
              onClick={() => handleSelect(value)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepChoosePurpose;
