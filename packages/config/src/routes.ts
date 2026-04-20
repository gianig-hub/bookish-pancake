import type { UserRole } from "@ek/types";

/**
 * Groups of routes that require authentication or specific roles.
 * These are used by both the Next.js middleware and the API.
 *
 * TODO: Enforce these programmatically in middleware once auth is wired up.
 */
export const PROTECTED_ROUTE_GROUPS = {
  /** Requires any authenticated user (buyer, seller, business, admin) */
  account: ["/account", "/account/listings", "/account/favourites", "/account/alerts"],

  /** Requires role === 'business'. accountType check ('business') should be
   *  enforced at the application layer when the role is assigned on registration/upgrade. */
  business: ["/business", "/business/leads", "/business/profile"],

  /** Requires role === 'admin' or role === 'moderator' */
  admin: ["/admin", "/admin/moderation"],
} as const satisfies Record<string, string[]>;

/**
 * Minimum role required to access each route group.
 */
export const ROUTE_GROUP_MIN_ROLE: Record<keyof typeof PROTECTED_ROUTE_GROUPS, UserRole> = {
  account: "buyer",
  business: "business",
  admin: "moderator",
};

/** All protected path prefixes flattened (used in middleware matcher). */
export const ALL_PROTECTED_PATHS = Object.values(PROTECTED_ROUTE_GROUPS).flat();
