import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * User account dashboard
 * TODO: Implement account dashboard with sections:
 *   - My Listings (active, expired, drafts)
 *   - Favourites
 *   - Alerts & notifications
 *   - Messages / Leads inbox
 *   - Subscription & billing
 *   - Business dashboard (for business accounts)
 *   - Account settings (profile, password, email)
 * TODO: Add auth guard — redirect to /login if not authenticated
 */
export default function AccountPage() {
  return (
    <PlaceholderPage
      title="My Account"
      description="Manage your listings, favourites, messages, and subscription."
      todoNote="Implement full account dashboard: My Listings, Favourites, Alerts, Messages, Subscription, Settings. Add auth guard."
      links={[
        { href: "/post-ad", label: "Post an Ad" },
        { href: "/pricing", label: "View Plans" },
      ]}
    />
  );
}
