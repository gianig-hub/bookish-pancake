/**
 * apps/web/src/components/onboarding/Step06EquipmentCategories.tsx
 * Step 6: Equipment Categories Sold
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { EQUIPMENT_CATEGORIES } from '@ek/config';
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

export function Step06EquipmentCategories({
  draft,
  onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  const selected = new Set(draft.equipmentCategories ?? []);

  function toggleCategory(slug: string) {
    const next = new Set(selected);
    if (next.has(slug)) {
      next.delete(slug);
    } else {
      next.add(slug);
    }
    onUpdate({ equipmentCategories: Array.from(next) });
  }

  const groups = Array.from(new Set(EQUIPMENT_CATEGORIES.map((c) => c.group)));

  return (
    <StepLayout
      step={step}
      title="What equipment do you sell?"
      description="Select all equipment categories relevant to your business. Skip if you don't sell equipment."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextLabel={selected.size > 0 ? 'Continue' : 'Skip for now'}
    >
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {groups.map((group) => (
          <div key={group}>
            <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#374151' }}>
              {group}
            </p>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {EQUIPMENT_CATEGORIES.filter((c) => c.group === group).map((cat) => {
                const isSelected = selected.has(cat.slug);
                return (
                  <label
                    key={cat.slug}
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
                      onChange={() => toggleCategory(cat.slug)}
                      style={{ accentColor: '#2563eb' }}
                    />
                    <span>{cat.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '1rem' }}>
        {selected.size} categor{selected.size !== 1 ? 'ies' : 'y'} selected
      </p>
    </StepLayout>
  );
}
