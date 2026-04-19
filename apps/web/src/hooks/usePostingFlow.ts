/**
 * usePostingFlow — custom hook managing the multi-step listing creation state.
 *
 * Centralises draft state and step navigation for the posting flow.
 * AI-assist interactions update the same draft object via the update helpers.
 *
 * TODO: Persist draft to localStorage or API on each update.
 * TODO: Add form validation per step before allowing progression.
 */

import { useState, useCallback } from 'react';
import type { ListingDraft, ListingImprovementResult } from '@ek-marketplace/types';
import { ListingStatus } from '@ek-marketplace/types';

// ---------------------------------------------------------------------------
// Step definitions
// ---------------------------------------------------------------------------

export type PostingStep =
  | 'purpose'
  | 'category'
  | 'details'
  | 'condition'
  | 'price'
  | 'location'
  | 'photos'
  | 'preview';

export const POSTING_STEPS: PostingStep[] = [
  'purpose',
  'category',
  'details',
  'condition',
  'price',
  'location',
  'photos',
  'preview',
];

export const STEP_LABELS: Record<PostingStep, string> = {
  purpose: 'Listing Purpose',
  category: 'Category',
  details: 'Title & Description',
  condition: 'Condition',
  price: 'Price',
  location: 'Location',
  photos: 'Photos',
  preview: 'Preview & Submit',
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface UsePostingFlowReturn {
  draft: Partial<ListingDraft>;
  currentStep: PostingStep;
  currentStepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  updateDraft: (updates: Partial<ListingDraft>) => void;
  applyAiImprovement: (result: ListingImprovementResult) => void;
  goToStep: (step: PostingStep) => void;
  goNext: () => void;
  goBack: () => void;
  resetFlow: () => void;
}

const INITIAL_DRAFT: Partial<ListingDraft> = {};

export function usePostingFlow(): UsePostingFlowReturn {
  const [draft, setDraft] = useState<Partial<ListingDraft>>(INITIAL_DRAFT);
  const [currentStep, setCurrentStep] = useState<PostingStep>(POSTING_STEPS[0]);

  const currentStepIndex = POSTING_STEPS.indexOf(currentStep);
  const totalSteps = POSTING_STEPS.length;

  const updateDraft = useCallback((updates: Partial<ListingDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates, updatedAt: new Date().toISOString() }));
  }, []);

  /**
   * Applies a ListingImprovementResult from the AI assistant to the draft.
   * Only overwrites fields that the AI provided — existing user input is preserved.
   * The user retains full control: they can undo or edit after applying.
   */
  const applyAiImprovement = useCallback((result: ListingImprovementResult) => {
    setDraft((prev) => {
      const updates: Partial<ListingDraft> = { aiAssisted: true };

      if (result.suggestedTitle) updates.title = result.suggestedTitle;
      if (result.suggestedDescription) updates.description = result.suggestedDescription;
      if (result.suggestedCategory) updates.category = result.suggestedCategory;
      if (result.suggestedPurpose) updates.purpose = result.suggestedPurpose;
      if (result.suggestedCondition) updates.condition = result.suggestedCondition;

      return { ...prev, ...updates, updatedAt: new Date().toISOString() };
    });
  }, []);

  const goToStep = useCallback((step: PostingStep) => {
    setCurrentStep(step);
  }, []);

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const idx = POSTING_STEPS.indexOf(prev);
      return idx < POSTING_STEPS.length - 1 ? POSTING_STEPS[idx + 1] : prev;
    });
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => {
      const idx = POSTING_STEPS.indexOf(prev);
      return idx > 0 ? POSTING_STEPS[idx - 1] : prev;
    });
  }, []);

  const resetFlow = useCallback(() => {
    setDraft(INITIAL_DRAFT);
    setCurrentStep(POSTING_STEPS[0]);
  }, []);

  return {
    draft,
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === totalSteps - 1,
    updateDraft,
    applyAiImprovement,
    goToStep,
    goNext,
    goBack,
    resetFlow,
  };
}
