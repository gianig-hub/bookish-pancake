/**
 * Business Lead Types — EK Marketplace MVP
 * Covers: lead status, filter state, lead detail, response draft
 * TODO: Extend with paid-lead charging, read receipts, and AI response assist when ready
 */

import type { ServiceRequest, ServiceRequestCategory, ServiceUrgency } from './service-request';

// ─── Lead Status ──────────────────────────────────────────────────────────────

/**
 * Status of a lead from the business's perspective.
 * Mirrors ServiceRequestStatus but is owned by the business, not the requester.
 */
export type LeadStatus =
  | 'new'       // Received, not yet opened by business
  | 'viewed'    // Business has opened the lead
  | 'contacted' // Business has responded/reached out
  | 'closed'    // Business has marked this lead as done
  | 'archived'; // Business has archived without action

// ─── Business Lead ────────────────────────────────────────────────────────────

/**
 * A lead received by a business — derived from a service request.
 * Represents the business's view of an inbound service inquiry.
 * TODO: Add paid-lead gate field when lead charging is implemented
 * TODO: Add read-receipt/timestamp when messaging is live
 * TODO: Add AI-suggested-response field when AI assist is ready
 */
export interface BusinessLead {
  /** Unique lead ID */
  id: string;

  /** ID of the business this lead was sent to */
  businessId: string;

  /** Full service request details */
  request: ServiceRequest;

  /** Business's current status for this lead */
  status: LeadStatus;

  /** Whether the business has viewed the lead details */
  viewed: boolean;

  /** ISO timestamp when business first viewed the lead */
  viewedAt?: string;

  /** Internal note added by business — not visible to requester */
  internalNote?: string;

  /** ISO timestamps */
  createdAt: string;
  updatedAt: string;

  // TODO: Add isPaid flag when paid lead charging is implemented
  // TODO: Add chargeAmount field when billing is live
  // TODO: Add aiResponseDraft field when AI assist is ready
}

// ─── Lead Filter State ────────────────────────────────────────────────────────

/**
 * Represents the active filter state in the business lead inbox.
 * All fields optional — no filter = show all.
 * TODO: Add date range filter
 * TODO: Add full-text search filter
 */
export interface LeadFilterState {
  status?: LeadStatus | 'all';
  category?: ServiceRequestCategory | 'all';
  urgency?: ServiceUrgency | 'all';
  /** Whether to show only unread/unviewed leads */
  unreadOnly?: boolean;
}

// ─── Lead Response Draft ─────────────────────────────────────────────────────

/**
 * A draft response from a business to a lead/requester.
 * Placeholder — not yet connected to real messaging.
 * TODO: Connect to messaging system when ready
 * TODO: Add AI-assisted draft generation when AI response assist is live
 * TODO: Add attachment support when file storage is wired
 */
export interface LeadResponseDraft {
  leadId: string;
  businessId: string;

  /** Draft message body */
  body?: string;

  /** Whether the business wants to include a quote */
  includeQuote?: boolean;

  /** Quote amount (free text for MVP) */
  quoteAmount?: string;

  /** Quote notes */
  quoteNotes?: string;

  /** Preferred callback time — free text for MVP */
  callbackTime?: string;

  /** ISO timestamp of last edit */
  updatedAt?: string;
}

// ─── Lead Summary (for inbox list/cards) ─────────────────────────────────────

/**
 * Compact representation of a lead for use in inbox list views.
 */
export interface LeadSummary {
  id: string;
  businessId: string;
  status: LeadStatus;
  viewed: boolean;
  category: ServiceRequestCategory;
  urgency: ServiceUrgency;
  requestTitle: string;
  requesterName?: string;
  location?: string;
  createdAt: string;
}
