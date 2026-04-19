/** Step 5 – Set Price */
import React, { useState } from 'react';
import { POSTING_LIMITS } from '@ek/config';
import { StepProps } from '../types';

const StepSetPrice: React.FC<StepProps> = ({ draft, updateDraft, onNext, onBack }) => {
  // Display value in pounds; store as pence internally
  const [pounds, setPounds] = useState<string>(
    draft.pricePence !== undefined ? (draft.pricePence / 100).toFixed(2) : ''
  );
  const [negotiable, setNegotiable] = useState(draft.negotiable ?? false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    const parsed = parseFloat(pounds);
    if (isNaN(parsed) || parsed < 0) {
      setError('Please enter a valid price (0 for free / POA).');
      return;
    }
    const pence = Math.round(parsed * 100);
    if (pence > POSTING_LIMITS.MAX_PRICE_PENCE) {
      setError(`Maximum price is £${(POSTING_LIMITS.MAX_PRICE_PENCE / 100).toLocaleString('en-GB')}.`);
      return;
    }
    setError(null);
    updateDraft({ pricePence: pence, negotiable });
    onNext();
  };

  return (
    <div className="step step--price">
      <h2>Set your price</h2>

      <div className="field">
        <label htmlFor="listing-price">Price (£) *</label>
        <input
          id="listing-price"
          type="number"
          min="0"
          step="0.01"
          value={pounds}
          onChange={(e) => setPounds(e.target.value)}
          placeholder="0.00"
        />
        <p className="field-hint">Enter 0 for free or POA (price on application).</p>
        {error && <p className="field-error">{error}</p>}
      </div>

      <div className="field field--checkbox">
        <label>
          <input
            type="checkbox"
            checked={negotiable}
            onChange={(e) => setNegotiable(e.target.checked)}
          />
          &nbsp;Open to offers / negotiable
        </label>
      </div>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onBack}>← Back</button>
        <button type="button" className="btn-next" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
};

export default StepSetPrice;
