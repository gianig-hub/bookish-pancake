/**
 * apps/web/src/components/onboarding/Step11Preview.tsx
 * Step 11: Profile Preview & Save Shell
 *
 * TODO: replace inline preview with the real public BusinessProfileCard component.
 * TODO: call the API to persist the profile on save.
 * TODO: show loading/error state during save.
 */

import React from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import {
  PROFILE_COMPLETION_REQUIREMENTS,
  calcProfileCompletion,
  isProfilePublishable,
  VERIFICATION_STATUS_META,
} from '@ek/config';
import { StepLayout } from './StepLayout';

interface Props {
  draft: BusinessProfileDraft;
  onUpdate: (partial: Partial<BusinessProfileDraft>) => void;
  onNext: () => void;
  onBack: () => void;
  step: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onSave?: (draft: BusinessProfileDraft) => void;
}

export function Step11Preview({
  draft,
  onUpdate: _onUpdate,
  onNext,
  onBack,
  step,
  isFirstStep,
  isLastStep,
  onSave,
}: Props) {
  const completion = calcProfileCompletion(draft);
  const publishable = isProfilePublishable(draft);
  const statusMeta = VERIFICATION_STATUS_META.find(
    (m) => m.value === (draft.verificationStatus ?? 'unverified'),
  );

  function handleSave() {
    // TODO: POST to /businesses and /businesses/:id/profile API
    if (onSave) {
      onSave(draft);
    } else {
      alert('Profile saved (placeholder — API call not yet wired up)');
    }
  }

  return (
    <StepLayout
      step={step}
      title="Preview your profile"
      description="Review your business profile before saving. You can edit any section afterwards."
      onNext={handleSave}
      onBack={onBack}
      isFirstStep={isFirstStep}
      isLastStep={isLastStep}
      nextLabel={publishable ? 'Save & Publish' : 'Save Draft'}
    >
      {/* Completion bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}
        >
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Profile Completion</span>
          <span
            style={{
              fontWeight: 700,
              color: completion >= 100 ? '#16a34a' : '#d97706',
            }}
          >
            {completion}%
          </span>
        </div>
        <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4 }}>
          <div
            style={{
              height: '100%',
              width: `${completion}%`,
              background: completion >= 100 ? '#16a34a' : '#2563eb',
              borderRadius: 4,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Checklist */}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.75rem' }}>
          {PROFILE_COMPLETION_REQUIREMENTS.map((req) => {
            const passed = req.check(draft);
            return (
              <li
                key={req.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: passed ? '#16a34a' : req.required ? '#ef4444' : '#9ca3af',
                  marginBottom: '0.25rem',
                }}
              >
                <span>{passed ? '✓' : req.required ? '✗' : '○'}</span>
                <span>{req.label}</span>
                {req.required && !passed && (
                  <span style={{ color: '#9ca3af' }}>(required)</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Profile preview card */}
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          overflow: 'hidden',
          background: 'white',
        }}
      >
        {/* Cover placeholder */}
        <div
          style={{
            height: 80,
            background: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '0.8rem',
          }}
        >
          {draft.coverImageUrl ? (
            <img
              src={draft.coverImageUrl}
              alt="Cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            'Cover image not set'
          )}
        </div>

        <div style={{ padding: '1rem' }}>
          {/* Logo + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                background: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '0.7rem',
                border: '1px solid #e5e7eb',
                flexShrink: 0,
              }}
            >
              {draft.logoUrl ? (
                <img
                  src={draft.logoUrl}
                  alt="Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
              ) : (
                'Logo'
              )}
            </div>
            <div>
              <p style={{ fontWeight: 700, margin: 0, fontSize: '1.1rem' }}>
                {draft.businessName || <em style={{ color: '#9ca3af' }}>Business name not set</em>}
              </p>
              {draft.tagline && (
                <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                  {draft.tagline}
                </p>
              )}
            </div>
            {statusMeta && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.5rem',
                  borderRadius: 12,
                  background: '#f3f4f6',
                  color: '#6b7280',
                }}
              >
                {statusMeta.label}
              </span>
            )}
          </div>

          {/* Description */}
          {draft.description && (
            <p style={{ color: '#374151', fontSize: '0.875rem', margin: '0 0 0.75rem' }}>
              {draft.description.slice(0, 200)}
              {draft.description.length > 200 ? '…' : ''}
            </p>
          )}

          {/* Service areas */}
          {draft.serviceAreas && draft.serviceAreas.length > 0 && (
            <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 0.5rem' }}>
              📍 {draft.serviceAreas.map((a) => a.label).join(', ')}
            </p>
          )}

          {/* Services */}
          {draft.servicesOffered && draft.servicesOffered.length > 0 && (
            <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>
              🛠️ {draft.servicesOffered.length} service{draft.servicesOffered.length !== 1 ? 's' : ''} offered
            </p>
          )}
        </div>
      </div>

      {!publishable && (
        <p style={{ color: '#d97706', fontSize: '0.875rem', marginTop: '1rem' }}>
          ⚠️ Complete the required fields above to publish your profile.
        </p>
      )}
    </StepLayout>
  );
}
