/**
 * apps/web/src/components/onboarding/Step04Description.tsx
 * Step 4: Business Description
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { StepLayout } from './StepLayout';

const MIN_DESC_LENGTH = 20;
const MAX_DESC_LENGTH = 2000;

interface Props {
  draft: BusinessProfileDraft;
  onUpdate: (partial: Partial<BusinessProfileDraft>) => void;
  onNext: () => void;
  onBack: () => void;
  step: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function Step04Description({
  draft,
  onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  const descLen = draft.description?.length ?? 0;

  return (
    <StepLayout
      step={step}
      title="Describe your business"
      description="Tell potential customers what you do, your experience, and what sets you apart."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    >
      <div style={{ display: 'grid', gap: '1rem' }}>
        {/* Tagline */}
        <div>
          <label
            htmlFor="tagline"
            style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}
          >
            Short Tagline
          </label>
          <input
            id="tagline"
            type="text"
            value={draft.tagline ?? ''}
            onChange={(e) => onUpdate({ tagline: e.target.value })}
            placeholder="e.g. London's most trusted AC & refrigeration specialists"
            maxLength={160}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ color: '#6b7280', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
            {(draft.tagline?.length ?? 0)}/160 characters — shown in search results
          </p>
        </div>

        {/* Full description */}
        <div>
          <label
            htmlFor="description"
            style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}
          >
            Full Description <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            id="description"
            value={draft.description ?? ''}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe your services, experience, qualifications, and coverage area..."
            maxLength={MAX_DESC_LENGTH}
            rows={8}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: '1rem',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
          <p
            style={{
              color: descLen < MIN_DESC_LENGTH ? '#ef4444' : '#6b7280',
              fontSize: '0.8rem',
              margin: '0.25rem 0 0',
            }}
          >
            {descLen}/{MAX_DESC_LENGTH} characters
            {descLen < MIN_DESC_LENGTH && ` — minimum ${MIN_DESC_LENGTH} characters required`}
          </p>
        </div>
      </div>
    </StepLayout>
  );
}
