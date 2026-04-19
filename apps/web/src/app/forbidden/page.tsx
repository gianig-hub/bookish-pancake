/**
 * /forbidden — shown when a user accesses a page above their role.
 */
export default function ForbiddenPage() {
  return (
    <main style={{ maxWidth: 500, margin: '6rem auto', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: '#dc2626' }}>Access Denied</h1>
      <p>You don&apos;t have permission to view this page.</p>
      <a href="/account" style={{ color: '#2563eb' }}>
        Go to My Account
      </a>
    </main>
  );
}
