import { redirect } from "next/navigation";
import { ADMIN_ROLES, hasAnyRole } from "@ek/config";
import { getSessionUser } from "@/lib/auth/session";

/**
 * Admin section layout – restricts access to users with the 'admin' or
 * 'moderator' role.
 * TODO: replace getSessionUser() stub with real session lookup.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (!hasAnyRole(user, ADMIN_ROLES)) {
    redirect("/account");
  }

  return <>{children}</>;
}
