import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * Help & FAQ page
 * TODO: Implement FAQ sections (buyers, sellers, businesses, trust & safety)
 * TODO: Add search within FAQ
 * TODO: Add AI-powered help assistant (chatbot)
 * TODO: Link to support tickets / contact form
 */
export default function HelpPage() {
  return (
    <PlaceholderPage
      title="Help & FAQ"
      description="Find answers to common questions about buying, selling, and using EK Marketplace."
      todoNote="Implement FAQ sections for buyers, sellers, and businesses. Add AI-powered help assistant."
      links={[
        { href: "/contact", label: "Contact Support" },
        { href: "/guides", label: "Browse Guides" },
      ]}
    />
  );
}
