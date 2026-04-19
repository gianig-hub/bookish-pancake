import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * Wanted Ads page
 * TODO: Implement wanted ad listing (buyers looking for equipment or services)
 * TODO: Allow sellers to respond to wanted ads
 * TODO: Connect to real wanted ads from DB
 * TODO: Add notifications for matching listings
 */
export default function WantedAdsPage() {
  return (
    <PlaceholderPage
      title="Wanted Ads"
      description="Looking for specific AC or refrigeration equipment? Post a wanted ad and let sellers come to you."
      todoNote="Implement wanted ad listing, posting form, and seller response flow."
      links={[
        { href: "/post-ad", label: "Post a Wanted Ad" },
        { href: "/marketplace", label: "Browse Equipment" },
      ]}
    />
  );
}
