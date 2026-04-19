/**
 * apps/web/src/pages/onboarding/BusinessOnboarding.tsx
 * Multi-step business onboarding flow.
 *
 * This component orchestrates all 11 onboarding steps using the useOnboarding hook.
 * It is framework-agnostic and can be used as a Next.js page or mounted in a router.
 *
 * TODO: add redirect to /dashboard on successful save.
 * TODO: add auth guard — user must be logged in before reaching this page.
 */

import React from 'react';
import { useOnboarding } from '../../hooks/useOnboarding';
import { clearDraft } from '../../lib/onboardingStore';
import {
  Step01BusinessType,
  Step02BusinessName,
  Step03Branding,
  Step04Description,
  Step05ServicesOffered,
  Step06EquipmentCategories,
  Step07ServiceAreas,
  Step08ContactDetails,
  Step09OpeningHours,
  Step10VerificationStatus,
  Step11Preview,
} from '../../components/onboarding';
import type { BusinessProfileDraft } from '@ek/types';

export function BusinessOnboarding() {
  const {
    step,
    draft,
    updateDraft,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useOnboarding();

  const sharedProps = {
    draft,
    onUpdate: updateDraft,
    onNext: nextStep,
    onBack: prevStep,
    step,
    isFirstStep,
    isLastStep,
  };

  async function handleSave(finalDraft: BusinessProfileDraft) {
    // TODO: POST finalDraft to the API
    // const res = await fetch('/api/businesses', { method: 'POST', body: JSON.stringify(finalDraft) });
    console.log('Draft to save:', finalDraft);
    clearDraft();
    alert('Profile saved! (API integration pending)');
  }

  return (
    <main style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {step === 1 && <Step01BusinessType {...sharedProps} />}
      {step === 2 && <Step02BusinessName {...sharedProps} />}
      {step === 3 && <Step03Branding {...sharedProps} />}
      {step === 4 && <Step04Description {...sharedProps} />}
      {step === 5 && <Step05ServicesOffered {...sharedProps} />}
      {step === 6 && <Step06EquipmentCategories {...sharedProps} />}
      {step === 7 && <Step07ServiceAreas {...sharedProps} />}
      {step === 8 && <Step08ContactDetails {...sharedProps} />}
      {step === 9 && <Step09OpeningHours {...sharedProps} />}
      {step === 10 && <Step10VerificationStatus {...sharedProps} />}
      {step === 11 && <Step11Preview {...sharedProps} onSave={handleSave} />}
    </main>
  );
}

export default BusinessOnboarding;
