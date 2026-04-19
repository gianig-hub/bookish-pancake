/**
 * Shared props passed to every posting-flow step component.
 */
import { ListingDraft } from '@ek/types';

export interface StepProps {
  draft: ListingDraft;
  updateDraft: (partial: Partial<ListingDraft>) => void;
  onNext: () => void;
  onBack: () => void;
}
