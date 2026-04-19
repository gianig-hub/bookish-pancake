"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { SessionUser } from "@ek/types";

interface AuthContextValue {
  user: SessionUser | null;
  /** True while the session is being loaded */
  loading: boolean;
  /** Call after a successful sign-in to update context */
  setUser: (user: SessionUser | null) => void;
  /** Clears the session client-side (call after POST /auth/logout) */
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider – wraps the application and exposes session state to
 * all client components via useAuth().
 *
 * NOTE: this provider is CLIENT-SIDE ONLY.  For server components, use
 * getSessionUser() from @/lib/auth/session instead.
 *
 * TODO: populate `initialUser` from the server session once auth is wired up.
 */
export function AuthProvider({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: SessionUser | null;
}) {
  const [user, setUserState] = useState<SessionUser | null>(initialUser);
  const [loading] = useState(false);

  const setUser = useCallback((u: SessionUser | null) => {
    setUserState(u);
  }, []);

  const signOut = useCallback(() => {
    // TODO: call POST /auth/logout, clear cookies, then setUserState(null)
    setUserState(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth – React hook to access the current session user in client components.
 *
 * @throws if used outside of <AuthProvider>
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
