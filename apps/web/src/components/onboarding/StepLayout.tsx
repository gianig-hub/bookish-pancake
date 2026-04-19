/**
 * apps/web/src/components/onboarding/StepLayout.tsx
 * Shared layout wrapper for each onboarding step.
 *
 * TODO: add animated step transitions.
 * TODO: replace inline styles with Tailwind classes once Tailwind is installed.
 */

import React from 'react';
import { TOTAL_STEPS } from '../../lib/onboardingStore';

interface StepLayoutProps {
  step: number;
  title: string;
  description?: string;
  onNext?: () => void;
  onBack?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  nextLabel?: string;
  children: React.ReactNode;
}

export function StepLayout({
  step,
  title,
  description,
  onNext,
  onBack,
  isFirstStep,
  isLastStep,
  nextLabel = 'Continue',
  children,
}: StepLayoutProps) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Progress indicator */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Step {step} of {TOTAL_STEPS}
        </p>
        <div
          style={{
            height: 4,
            background: '#e5e7eb',
            borderRadius: 2,
            marginTop: 4,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(step / TOTAL_STEPS) * 100}%`,
              background: '#2563eb',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Step heading */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {title}
      </h2>
      {description && (
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{description}</p>
      )}

      {/* Step content */}
      <div style={{ marginBottom: '2rem' }}>{children}</div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-between' }}>
        {!isFirstStep && (
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '0.625rem 1.25rem',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          style={{
            marginLeft: 'auto',
            padding: '0.625rem 1.5rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {isLastStep ? 'Finish & Save' : nextLabel}
        </button>
      </div>
    </div>
  );
}
