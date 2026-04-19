/**
 * RoleGuard — client-side role-based access guard component.
 *
 * Renders children only if the current user has one of the required roles.
 * Shows a fallback (or redirects) otherwise.
 *
 * Usage:
 *   <RoleGuard roles={['admin']}>
 *     <AdminPanel />
 *   </RoleGuard>
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '@ek/types';

interface RoleGuardProps {
  /** Roles allowed to see children. Empty array = any authenticated user. */
  roles: UserRole[];
  children: React.ReactNode;
  /** Optional fallback. Defaults to redirect to /login. */
  fallback?: React.ReactNode;
}

export function RoleGuard({ roles, children, fallback }: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="p-8 text-center text-sm text-gray-500">Loading…</div>;
  }

  if (!user) {
    if (fallback) return <>{fallback}</>;
    router.replace('/login');
    return null;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    if (fallback) return <>{fallback}</>;
    // Redirect to a "forbidden" page or home
    router.replace('/');
    return null;
  }

  return <>{children}</>;
}

/**
 * AdminGuard — convenience wrapper for admin-only areas.
 */
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard
      roles={['admin']}
      fallback={
        <div className="p-8 text-center">
          <p className="text-red-600 font-semibold">Access denied.</p>
          <p className="text-sm text-gray-500">Admin access required.</p>
        </div>
      }
    >
      {children}
    </RoleGuard>
  );
}

/**
 * BusinessGuard — convenience wrapper for dealer/business/admin areas.
 */
export function BusinessGuard({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard
      roles={['dealer', 'business', 'admin']}
      fallback={
        <div className="p-8 text-center">
          <p className="text-amber-600 font-semibold">Business account required.</p>
          <p className="text-sm text-gray-500">
            Upgrade to a Dealer or Business plan to access this area.
          </p>
        </div>
      }
    >
      {children}
    </RoleGuard>
  );
}
