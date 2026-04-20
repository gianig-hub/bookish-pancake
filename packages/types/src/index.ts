/**
 * packages/types — EK Marketplace shared types barrel
 * Exports all shared TypeScript types for use across apps/web and apps/api
 */

// Service request types
export type {
  ServiceRequestCategory,
  ServiceUrgency,
  ServiceRequestStatus,
  ServiceRequestDraft,
  ServiceRequest,
} from './service-request';

// Lead types
export type {
  LeadStatus,
  BusinessLead,
  LeadFilterState,
  LeadResponseDraft,
  LeadSummary,
} from './lead';
