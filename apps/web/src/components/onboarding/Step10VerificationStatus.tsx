/**
 * apps/web/src/components/onboarding/Step10VerificationStatus.tsx
 * Step 10: Verification Status (read-only placeholder)
 *
 * Verification is admin-controlled; this step only informs the user.
 * TODO: add document-upload flow once file storage and admin review queue exist.
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { VERIFICATION_STATUS_META } from '@ek/config';
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

const colourMap: Record<string, string> = {
  grey: '#6b7280',
  yellow: '#d97706',
  green: '#16a34a',
  red: '#dc2626',
  orange: '#ea580c',
};

export function Step10VerificationStatus({
  draft,
  onUpdate: _onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  const currentStatus = draft.verificationStatus ?? 'unverified';
  const meta = VERIFICATION_STATUS_META.find((m) => m.value === currentStatus);

  return (
    <StepLayout
      step={step}
      title="Verification Status"
      description="Verified businesses get a badge on their profile and rank higher in search results."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextLabel="Continue to preview"
    >
      {/* Current status badge */}
      {meta && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: '#f3f4f6',
            borderRadius: 20,
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: colourMap[meta.colour],
              display: 'inline-block',
            }}
          />
          <span style={{ fontWeight: 600 }}>{meta.label}</span>
        </div>
      )}

      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        {meta?.description}
      </p>

      <div
        style={{
          border: '1px dashed #d1d5db',
          borderRadius: 8,
          padding: '1.5rem',
          background: '#f9fafb',
          color: '#9ca3af',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, color: '#6b7280' }}>
          🔒 Verification request
        </p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
          {/* TODO: implement document upload and review-queue submission */}
          Document upload and verification request flow coming soon.
        </p>
      </div>
    </StepLayout>
  );
}
