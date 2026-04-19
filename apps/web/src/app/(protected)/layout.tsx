import { redirect } from "next/navigation";
import { LOGIN_REDIRECT } from "@ek/config";
import { getSessionUser } from "@/lib/auth/session";

/**
 * Protected layout – wraps all routes that require authentication.
 * Any child route that is not accessible to the current user's role
 * will be handled in its own layout or page (see /business and /admin).
 *
 * TODO: replace getSessionUser() stub with real session lookup.
 */
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();

  if (!user) {
    redirect(LOGIN_REDIRECT);
  }

  return <>{children}</>;
}
