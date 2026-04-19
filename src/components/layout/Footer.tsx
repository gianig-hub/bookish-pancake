import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🧊</span>
              <span className="font-bold text-white text-lg">Everything Kold Market</span>
            </div>
            <p className="text-sm">
              The UK&apos;s marketplace for cold storage equipment.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/browse" className="hover:text-white transition-colors">All Listings</Link></li>
              <li><Link href="/browse?condition=NEW" className="hover:text-white transition-colors">New Equipment</Link></li>
              <li><Link href="/browse?condition=USED" className="hover:text-white transition-colors">Used Equipment</Link></li>
              <li><Link href="/browse?condition=REFURBISHED" className="hover:text-white transition-colors">Refurbished</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/dashboard/listings/create" className="hover:text-white transition-colors">Sell Equipment</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} Everything Kold Market. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
