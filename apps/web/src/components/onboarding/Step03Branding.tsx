/**
 * apps/web/src/components/onboarding/Step03Branding.tsx
 * Step 3: Logo & Cover Image (placeholder — no real file storage at MVP)
 *
 * TODO: wire up to file-storage service (S3 / Cloudflare R2).
 * TODO: add image cropping and preview.
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

function PlaceholderUpload({
  label,
  hint,
  aspectRatio,
}: {
  label: string;
  hint: string;
  aspectRatio: string;
}) {
  return (
    <div>
      <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{label}</p>
      <div
        style={{
          aspectRatio,
          border: '2px dashed #d1d5db',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f9fafb',
          cursor: 'not-allowed',
          color: '#9ca3af',
        }}
      >
        <span style={{ fontSize: '2rem' }}>📷</span>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
          {hint}
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem' }}>
          {/* TODO: replace with real upload CTA */}
          File upload coming soon
        </p>
      </div>
    </div>
  );
}

export function Step03Branding({
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
      title="Add your logo and cover image"
      description="Visual branding helps your business stand out. You can skip and add these later."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextLabel="Skip for now"
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <PlaceholderUpload
          label="Business Logo"
          hint="Recommended: 400×400 px, PNG or JPG"
          aspectRatio="1 / 1"
        />
        <PlaceholderUpload
          label="Cover Image"
          hint="Recommended: 1200×400 px, PNG or JPG"
          aspectRatio="3 / 1"
        />
      </div>
    </StepLayout>
  );
}
