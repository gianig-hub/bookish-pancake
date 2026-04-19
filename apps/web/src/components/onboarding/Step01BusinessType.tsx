/**
 * apps/web/src/components/onboarding/Step01BusinessType.tsx
 * Step 1: Business Type Selection
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { BUSINESS_TYPE_OPTIONS } from '@ek/config';
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

export function Step01BusinessType({
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
      title="What type of business are you?"
      description="Choose the option that best describes your primary role in the industry."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextLabel={draft.businessType ? 'Continue' : 'Skip for now'}
    >
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {BUSINESS_TYPE_OPTIONS.map((option) => {
          const selected = draft.businessType === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onUpdate({ businessType: option.value })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: 8,
                border: selected ? '2px solid #2563eb' : '1px solid #d1d5db',
                background: selected ? '#eff6ff' : 'white',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontSize: '1.75rem' }}>{option.icon}</span>
              <div>
                <p style={{ fontWeight: 600, margin: 0 }}>{option.label}</p>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </StepLayout>
  );
}
