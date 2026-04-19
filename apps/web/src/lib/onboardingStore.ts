/**
 * apps/web/src/lib/onboardingStore.ts
 * Client-side draft store for the business onboarding flow.
 *
 * Uses localStorage for persistence between page reloads during onboarding.
 * TODO: replace with server-side draft saving (auto-save to API) once auth is wired up.
 */

import type { BusinessProfileDraft } from '@ek/types';

const STORAGE_KEY = 'ek_onboarding_draft';

/** Total number of onboarding steps (1-indexed). */
export const TOTAL_STEPS = 11;

export function loadDraft(): BusinessProfileDraft {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BusinessProfileDraft) : {};
  } catch {
    return {};
  }
}

export function saveDraft(draft: BusinessProfileDraft): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
