import { redirect } from "next/navigation";
import { BUSINESS_ROLES, hasAnyRole } from "@ek/config";
import { getSessionUser } from "@/lib/auth/session";

/**
 * Business section layout – restricts access to users with the 'business'
 * or 'admin' role.
 * TODO: replace getSessionUser() stub with real session lookup.
 */
export default async function BusinessLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasAnyRole(user, BUSINESS_ROLES)) {
    redirect("/account");
  }

  return <>{children}</>;
}
