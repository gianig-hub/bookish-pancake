import Link from 'next/link'
import { auth } from '@/lib/auth'

export async function Header() {
  const session = await auth()

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧊</span>
            <span className="font-bold text-cold-700 text-lg">
              Everything Kold
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/browse" className="text-gray-600 hover:text-cold-600 transition-colors">
              Browse
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard/listings/create"
                  className="text-gray-600 hover:text-cold-600 transition-colors"
                >
                  Sell
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-cold-600 transition-colors"
                >
                  Dashboard
                </Link>
                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="text-gray-600 hover:text-cold-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 hover:text-cold-600 transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-cold-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-cold-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu placeholder */}
          <div className="md:hidden flex items-center gap-3">
            {!session && (
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-cold-600">
                Sign In
              </Link>
            )}
            {session && (
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-cold-600">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
