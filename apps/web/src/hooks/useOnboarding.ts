/**
 * apps/web/src/hooks/useOnboarding.ts
 * React hook that manages multi-step onboarding state.
 *
 * TODO: persist draft to API on each step completion once auth is available.
 * TODO: add optimistic-save indicator (saving... / saved).
 */

import { useState, useCallback } from 'react';
import type { BusinessProfileDraft } from '@ek/types';
import { loadDraft, saveDraft, TOTAL_STEPS } from '../lib/onboardingStore';

export interface UseOnboardingReturn {
  step: number;
  draft: BusinessProfileDraft;
  updateDraft: (partial: Partial<BusinessProfileDraft>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (n: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function useOnboarding(): UseOnboardingReturn {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BusinessProfileDraft>(() => loadDraft());

  const updateDraft = useCallback((partial: Partial<BusinessProfileDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, ...partial };
      saveDraft(next);
      return next;
    });
  }, []);

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const goToStep = useCallback((n: number) => {
    setStep(Math.max(1, Math.min(n, TOTAL_STEPS)));
  }, []);

  return {
    step,
    draft,
    updateDraft,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: step === 1,
    isLastStep: step === TOTAL_STEPS,
  };
}
