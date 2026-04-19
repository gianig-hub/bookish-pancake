/** Step 6 – Set Location */
import React, { useState } from 'react';
import { ListingLocation } from '@ek/types';
import { StepProps } from '../types';

const StepSetLocation: React.FC<StepProps> = ({ draft, updateDraft, onNext, onBack }) => {
  const [city, setCity] = useState(draft.location?.city ?? '');
  const [postcode, setPostcode] = useState(draft.location?.postcode ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!city.trim()) {
      setError('Please enter your city or town.');
      return;
    }
    setError(null);
    const location: ListingLocation = { city: city.trim(), postcode: postcode.trim() || undefined };
    updateDraft({ location });
    onNext();
  };

  return (
    <div className="step step--location">
      <h2>Where is the item located?</h2>

      <div className="field">
        <label htmlFor="listing-city">City / Town *</label>
        <input
          id="listing-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. London"
        />
        {error && <p className="field-error">{error}</p>}
      </div>

      <div className="field">
        <label htmlFor="listing-postcode">Postcode (optional)</label>
        {/* TODO: validate UK postcode format */}
        <input
          id="listing-postcode"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g. SW1A 1AA"
          maxLength={8}
        />
        <p className="field-hint">Only the outward code (e.g. SW1A) is shown publicly.</p>
      </div>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onBack}>← Back</button>
        <button type="button" className="btn-next" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
};

export default StepSetLocation;
