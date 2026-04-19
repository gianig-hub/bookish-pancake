/**
 * apps/web/src/components/onboarding/Step08ContactDetails.tsx
 * Step 8: Contact Details
 */

import React from 'react';
import type { BusinessProfileDraft, ContactDetails } from '@ek/types';
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

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{ display: 'block', fontWeight: 600, marginBottom: '0.375rem' }}
      >
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.625rem 0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          fontSize: '1rem',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export function Step08ContactDetails({
  draft,
  onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
}: Props) {
  const contact: ContactDetails = draft.contactDetails ?? {};

  function updateContact(partial: Partial<ContactDetails>) {
    onUpdate({ contactDetails: { ...contact, ...partial } });
  }

  return (
    <StepLayout
      step={step}
      title="How can customers reach you?"
      description="At least one of phone or email is required to publish your profile."
      onNext={onNext}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
    >
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Field
          id="phone"
          label="Phone Number"
          type="tel"
          value={contact.phone ?? ''}
          onChange={(v) => updateContact({ phone: v })}
          placeholder="+44 20 1234 5678"
          required
        />
        <Field
          id="email"
          label="Business Email"
          type="email"
          value={contact.email ?? ''}
          onChange={(v) => updateContact({ email: v })}
          placeholder="info@yourbusiness.co.uk"
          required
        />
        <Field
          id="website"
          label="Website"
          type="url"
          value={contact.website ?? ''}
          onChange={(v) => updateContact({ website: v })}
          placeholder="https://www.yourbusiness.co.uk"
        />
        <Field
          id="address"
          label="Business Address"
          value={contact.address ?? ''}
          onChange={(v) => updateContact({ address: v })}
          placeholder="123 High Street, London"
        />
        <Field
          id="postcode"
          label="Postcode"
          value={contact.postcode ?? ''}
          onChange={(v) => updateContact({ postcode: v.toUpperCase() })}
          placeholder="EC1A 1BB"
        />
      </div>
    </StepLayout>
  );
}
