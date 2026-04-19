/**
 * Service Request & Lead Config — EK Marketplace MVP
 * Central constants for categories, urgency, statuses, filters, and feature flags
 * TODO: Move labels/descriptions to i18n when localisation is added
 */

import type {
  ServiceRequestCategory,
  ServiceUrgency,
  ServiceRequestStatus,
  LeadStatus,
  LeadFilterState,
} from '@ek-marketplace/types';

// ─── Service Request Categories ───────────────────────────────────────────────

export interface CategoryConfig {
  value: ServiceRequestCategory;
  label: string;
  description: string;
  icon?: string; // TODO: map to icon library when UI kit is finalised
}

export const SERVICE_REQUEST_CATEGORIES: CategoryConfig[] = [
  {
    value: 'air_conditioning',
    label: 'Air Conditioning',
    description: 'Installation, servicing, repairs, and maintenance of AC systems',
  },
  {
    value: 'refrigeration',
    label: 'Refrigeration',
    description: 'Commercial and industrial refrigeration servicing and repairs',
  },
  {
    value: 'cold_rooms',
    label: 'Cold Rooms',
    description: 'Cold room installation, fit-out, and repair',
  },
  {
    value: 'freezer_rooms',
    label: 'Freezer Rooms',
    description: 'Freezer room installation, fit-out, and repair',
  },
  {
    value: 'maintenance_contracts',
    label: 'Maintenance Contracts',
    description: 'Planned preventative maintenance (PPM) and service agreements',
  },
  {
    value: 'emergency_repair',
    label: 'Emergency Repair',
    description: 'Urgent breakdown response and emergency call-outs',
  },
  {
    value: 'design_upgrades',
    label: 'Design & Upgrades',
    description: 'System design, upgrades, refurbishment, and efficiency improvements',
  },
];

// ─── Urgency Levels ───────────────────────────────────────────────────────────

export interface UrgencyConfig {
  value: ServiceUrgency;
  label: string;
  description: string;
  /** Visual badge colour hint for UI */
  colour: 'green' | 'blue' | 'orange' | 'red';
}

export const URGENCY_LEVELS: UrgencyConfig[] = [
  {
    value: 'low',
    label: 'Low',
    description: 'No time pressure — flexible scheduling',
    colour: 'green',
  },
  {
    value: 'normal',
    label: 'Normal',
    description: 'Needed within a few days to a week',
    colour: 'blue',
  },
  {
    value: 'urgent',
    label: 'Urgent',
    description: 'Needed within 24–48 hours',
    colour: 'orange',
  },
  {
    value: 'emergency',
    label: 'Emergency',
    description: 'System down — immediate response required',
    colour: 'red',
  },
];

// ─── Request & Lead Statuses ──────────────────────────────────────────────────

export interface StatusConfig {
  value: ServiceRequestStatus | LeadStatus;
  label: string;
  description: string;
}

export const REQUEST_STATUSES: StatusConfig[] = [
  { value: 'new', label: 'New', description: 'Submitted, awaiting business contact' },
  { value: 'viewed', label: 'Viewed', description: 'Seen by at least one business' },
  { value: 'contacted', label: 'Contacted', description: 'Business has reached out' },
  { value: 'closed', label: 'Closed', description: 'Request has been fulfilled or cancelled' },
  { value: 'archived', label: 'Archived', description: 'Moved to archive' },
];

export const LEAD_STATUSES: StatusConfig[] = [
  { value: 'new', label: 'New', description: 'Received, not yet opened' },
  { value: 'viewed', label: 'Viewed', description: 'Lead has been opened' },
  { value: 'contacted', label: 'Contacted', description: 'You have responded to the lead' },
  { value: 'closed', label: 'Closed', description: 'Lead marked as complete' },
  { value: 'archived', label: 'Archived', description: 'Archived without action' },
];

// ─── Inbox Filter Options ─────────────────────────────────────────────────────

/** Pre-built filter sets for the lead inbox UI */
export const INBOX_FILTER_PRESETS: Array<{ label: string; filter: LeadFilterState }> = [
  { label: 'All Leads', filter: { status: 'all', category: 'all', urgency: 'all' } },
  { label: 'New', filter: { status: 'new' } },
  { label: 'Unread', filter: { unreadOnly: true } },
  { label: 'Emergencies', filter: { urgency: 'emergency' } },
  { label: 'Urgent', filter: { urgency: 'urgent' } },
  { label: 'Contacted', filter: { status: 'contacted' } },
  { label: 'Archived', filter: { status: 'archived' } },
];

// ─── Paid Lead Feature Flags (MVP Placeholder) ────────────────────────────────

/**
 * Placeholder flags for future paid lead features.
 * All false for MVP — do not implement billing logic against these yet.
 * TODO: Wire to subscription/plan entitlement checks when billing is live
 */
export const PAID_LEAD_FLAGS = {
  /** Whether lead inbox requires a paid plan */
  requiresPaidPlan: false,

  /** Whether individual leads are charged per-view */
  perLeadCharging: false,

  /** Whether leads have a free preview before charging */
  freePreviewEnabled: false,

  /** Max free leads per month before charging kicks in */
  freeLeadMonthlyLimit: 0, // TODO: set when pricing tier is confirmed

  /** Whether AI response drafts require a paid add-on */
  aiResponseDraftPaid: false,
} as const;

// ─── Request Form Field Config ─────────────────────────────────────────────────

/** MVP required fields for submitting a service request */
export const SERVICE_REQUEST_REQUIRED_FIELDS = [
  'category',
  'title',
  'description',
  'urgency',
] as const;

/** MVP optional fields shown in the form */
export const SERVICE_REQUEST_OPTIONAL_FIELDS = [
  'location',
  'postcode',
  'budgetHint',
  'contactPhone',
  'preferredContact',
] as const;
