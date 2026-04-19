import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  description: string;
  todoNote: string;
  links?: { href: string; label: string }[];
}

/**
 * Reusable placeholder page shell for MVP routes.
 * TODO: Replace with real page content as features are built.
 */
export function PlaceholderPage({
  title,
  description,
  todoNote,
  links,
}: PlaceholderPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full mb-6">
        🚧 Coming Soon
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 mb-6">{description}</p>
      <p className="text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 mb-8">
        <strong>TODO:</strong> {todoNote}
      </p>
      {links && links.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-sky-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <div className="mt-8">
        <Link href="/" className="text-sky-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
