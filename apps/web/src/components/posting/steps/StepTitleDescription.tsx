/** Step 3 – Enter Title & Description */
import React, { useState } from 'react';
import { POSTING_LIMITS } from '@ek/config';
import { StepProps } from '../types';

const StepTitleDescription: React.FC<StepProps> = ({ draft, updateDraft, onNext, onBack }) => {
  const [title, setTitle] = useState(draft.title ?? '');
  const [description, setDescription] = useState(draft.description ?? '');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validate = (): boolean => {
    const errs: typeof errors = {};
    if (!title.trim()) errs.title = 'Title is required.';
    if (title.length > POSTING_LIMITS.TITLE_MAX_LENGTH)
      errs.title = `Title must be ${POSTING_LIMITS.TITLE_MAX_LENGTH} characters or fewer.`;
    if (!description.trim()) errs.description = 'Description is required.';
    if (description.length > POSTING_LIMITS.DESCRIPTION_MAX_LENGTH)
      errs.description = `Description must be ${POSTING_LIMITS.DESCRIPTION_MAX_LENGTH} characters or fewer.`;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateDraft({ title: title.trim(), description: description.trim() });
      onNext();
    }
  };

  return (
    <div className="step step--details">
      <h2>Title &amp; Description</h2>

      <div className="field">
        <label htmlFor="listing-title">Title *</label>
        {/* TODO: add AI-assisted title suggestion */}
        <input
          id="listing-title"
          type="text"
          value={title}
          maxLength={POSTING_LIMITS.TITLE_MAX_LENGTH}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Daikin Split AC Unit 5kW – Used"
        />
        <span className="char-count">{title.length}/{POSTING_LIMITS.TITLE_MAX_LENGTH}</span>
        {errors.title && <p className="field-error">{errors.title}</p>}
      </div>

      <div className="field">
        <label htmlFor="listing-description">Description *</label>
        {/* TODO: add AI-assisted description generation */}
        <textarea
          id="listing-description"
          value={description}
          maxLength={POSTING_LIMITS.DESCRIPTION_MAX_LENGTH}
          rows={6}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the item, its condition, any included accessories, reason for sale, etc."
        />
        <span className="char-count">{description.length}/{POSTING_LIMITS.DESCRIPTION_MAX_LENGTH}</span>
        {errors.description && <p className="field-error">{errors.description}</p>}
      </div>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onBack}>← Back</button>
        <button type="button" className="btn-next" onClick={handleNext}>Continue →</button>
      </div>
    </div>
  );
};

export default StepTitleDescription;
