/**
 * apps/web/src/components/onboarding/Step05ServicesOffered.tsx
 * Step 5: Services Offered
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { SERVICES_OFFERED } from '@ek/config';
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

export function Step05ServicesOffered({
  draft,
  onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  const selected = new Set(draft.servicesOffered ?? []);

  function toggleService(slug: string) {
    const next = new Set(selected);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    onUpdate({ servicesOffered: Array.from(next) });
  }

  // Group services by their 'group' field
  const groups = Array.from(new Set(SERVICES_OFFERED.map((s) => s.group)));

  return (
    <StepLayout
      step={step}
      title="What services do you offer?"
      description="Select all that apply. This helps customers find you in the right categories."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {groups.map((group) => (
          <div key={group}>
            <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>
              {group}
            </p>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {SERVICES_OFFERED.filter((s) => s.group === group).map((service) => {
                const isSelected = selected.has(service.slug);
                return (
                  <label
                    key={service.slug}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      border: isSelected ? '1px solid #2563eb' : '1px solid #e5e7eb',
                      borderRadius: 6,
                      background: isSelected ? '#eff6ff' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleService(service.slug)}
                      style={{ accentColor: '#2563eb' }}
                    />
                    <span>{service.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '1rem' }}>
        {selected.size} service{selected.size !== 1 ? 's' : ''} selected
      </p>
    </StepLayout>
  );
}
