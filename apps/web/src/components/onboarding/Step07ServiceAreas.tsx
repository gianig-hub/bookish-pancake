/**
 * apps/web/src/components/onboarding/Step07ServiceAreas.tsx
 * Step 7: Service Areas
 */

import React, { useState } from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { SERVICE_AREA_OPTIONS } from '@ek/config';
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

export function Step07ServiceAreas({
  draft,
  onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  const [search, setSearch] = useState('');
  const selectedSlugs = new Set((draft.serviceAreas ?? []).map((a) => a.slug));

  function toggleArea(slug: string, label: string) {
    const current = draft.serviceAreas ?? [];
    if (selectedSlugs.has(slug)) {
      onUpdate({ serviceAreas: current.filter((a) => a.slug !== slug) });
    } else {
      onUpdate({ serviceAreas: [...current, { slug, label }] });
    }
  }

  const filtered = SERVICE_AREA_OPTIONS.filter((a) =>
    a.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <StepLayout
      step={step}
      title="Which areas do you serve?"
      description="Select all regions and cities where you operate. This determines where your profile appears in searches."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    >
      {/* Search filter */}
      <input
        type="search"
        placeholder="Search areas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          marginBottom: '1rem',
          fontSize: '0.9rem',
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          display: 'grid',
          gap: '0.5rem',
          maxHeight: 360,
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          padding: '0.5rem',
        }}
      >
        {filtered.map((area) => {
          const isSelected = selectedSlugs.has(area.slug);
          return (
            <label
              key={area.slug}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                border: isSelected ? '1px solid #2563eb' : '1px solid transparent',
                borderRadius: 6,
                background: isSelected ? '#eff6ff' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleArea(area.slug, area.label)}
                style={{ accentColor: '#2563eb' }}
              />
              <span>{area.label}</span>
            </label>
          );
        })}
        {filtered.length === 0 && (
          <p style={{ color: '#9ca3af', padding: '0.5rem', textAlign: 'center' }}>
            No areas match your search
          </p>
        )}
      </div>

      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.75rem' }}>
        {selectedSlugs.size} area{selectedSlugs.size !== 1 ? 's' : ''} selected
      </p>
    </StepLayout>
  );
}
