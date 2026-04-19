"use client";

/**
 * Contact page
 * TODO: Wire up contact form to email service (SendGrid, Postmark, etc.)
 * TODO: Add form validation
 * TODO: Add spam protection (reCAPTCHA or similar)
 */
export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have a question or need help? Fill in the form and we&apos;ll get back to you.</p>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            rows={5}
            placeholder="How can we help?"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <button
          type="submit"
          disabled
          className="bg-sky-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </form>

      <p className="mt-6 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2">
        <strong>TODO:</strong> Wire contact form to email backend. Form is disabled in this MVP shell.
      </p>
    </div>
  );
}
