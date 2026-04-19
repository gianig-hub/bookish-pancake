/**
 * apps/web/src/components/onboarding/Step09OpeningHours.tsx
 * Step 9: Opening Hours (placeholder)
 *
 * TODO: implement full opening hours editor with per-day toggles and time pickers.
 * TODO: support split shifts and bank holiday overrides.
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

export function Step09OpeningHours({
  draft: _draft,
  onUpdate: _onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  return (
    <StepLayout
      step={step}
      title="Opening Hours"
      description="Let customers know when you're available. You can update this anytime from your dashboard."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextLabel="Skip for now"
    >
      <div
        style={{
          border: '1px dashed #d1d5db',
          borderRadius: 8,
          padding: '2rem',
          textAlign: 'center',
          background: '#f9fafb',
          color: '#9ca3af',
        }}
      >
        <p style={{ fontSize: '1.5rem', margin: 0 }}>🕐</p>
        <p style={{ fontWeight: 600, color: '#6b7280' }}>Opening hours editor</p>
        <p style={{ fontSize: '0.875rem' }}>
          {/* TODO: build per-day time picker component */}
          Coming soon — you can set your hours after completing setup.
        </p>
      </div>
    </StepLayout>
  );
}
