import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Centre — EK Marketplace",
  description: "FAQs, guides, and support for buyers, sellers, and businesses on EK Marketplace.",
};

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Help Centre</h1>
      <p className="mb-8 text-gray-600">
        Find answers to common questions, read our guides, and get support.
      </p>

      {/* TODO: Replace with real FAQ/help content */}
      <div className="space-y-4">
        {[
          "How do I post an ad?",
          "How do I contact a seller?",
          "How do subscriptions work?",
          "How do I report a listing?",
          "How do I update my business profile?",
        ].map((question) => (
          <div
            key={question}
            className="rounded-xl border border-gray-200 p-4 text-gray-500"
          >
            <p className="font-medium">{question}</p>
            <p className="mt-1 text-sm">
              {/* TODO: Add real answer content */}
              Answer coming soon.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
