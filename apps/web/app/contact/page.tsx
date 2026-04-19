import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — EK Marketplace",
  description: "Get in touch with the EK Marketplace team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
      <p className="mb-8 text-gray-600">
        Have a question or want to get in touch? Fill in the form below and we&apos;ll get back to
        you.
      </p>

      {/* TODO: Wire up form submission to backend API or email service */}
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Your message..."
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-6 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
