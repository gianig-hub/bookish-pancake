/**
 * apps/web/src/components/onboarding/Step02BusinessName.tsx
 * Step 2: Business Name
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { StepLayout } from './StepLayout';

interface Props {
  draft: BusinessProfileDraft;
  onUpdate: (partial: Partial<BusinessProfileDraft>) => void;
  onNext: () => void;
  onBack: () => void;
  step: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function Step02BusinessName({
  draft,
  onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  return (
    <StepLayout
      step={step}
      title="What is your business name?"
      description="This is how your business will appear on EK Marketplace."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    >
      <div>
        <label
          htmlFor="businessName"
          style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}
        >
          Business Name <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="businessName"
          type="text"
          value={draft.businessName ?? ''}
          onChange={(e) => onUpdate({ businessName: e.target.value })}
          placeholder="e.g. Acme HVAC Solutions Ltd"
          maxLength={120}
          style={{
            width: '100%',
            padding: '0.625rem 0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
        <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          {(draft.businessName?.length ?? 0)}/120 characters
        </p>
      </div>
    </StepLayout>
  );
}
