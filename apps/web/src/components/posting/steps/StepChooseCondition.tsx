/** Step 4 – Choose Condition */
import React from 'react';
import { ListingCondition, ListingPurpose } from '@ek/types';
import { CONDITION_OPTIONS } from '@ek/config';
import { StepProps } from '../types';

const StepChooseCondition: React.FC<StepProps> = ({ draft, updateDraft, onNext, onBack }) => {
  // Condition is not relevant for service requests
  if (draft.purpose === ListingPurpose.SERVICE_REQUEST) {
    updateDraft({ condition: undefined });
    onNext();
    return null;
  }

  const handleSelect = (value: ListingCondition) => {
    updateDraft({ condition: value });
    onNext();
  };

  return (
    <div className="step step--condition">
      <h2>What is the condition?</h2>
      <ul className="option-list">
        {CONDITION_OPTIONS.map(({ value, label }) => (
          <li key={value}>
            <button
              type="button"
              className={`option-btn${draft.condition === value ? ' option-btn--selected' : ''}`}
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

export default StepChooseCondition;
