/**
 * AuthContext — client-side user context.
 *
 * Stores the current user and session in React state.
 * On mount, it reads the session ID from localStorage and verifies it
 * against the /api/v1/auth/me endpoint.
 *
 * TODO: Replace localStorage with HttpOnly cookie session before production.
 * TODO: Wire up to a real API call once apps/api is deployed.
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@ek/types';

interface AuthState {
  user: User | null;
  sessionId: string | null;
  loading: boolean;
  login: (sessionId: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  sessionId: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

const SESSION_KEY = 'ek_session_id';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSessionId = localStorage.getItem(SESSION_KEY);
    if (!storedSessionId) {
      setLoading(false);
      return;
    }

    // TODO: Replace this with a real API call to /api/v1/auth/me
    // For now, session validation is not wired to the API.
    // Example of what this should look like:
    //
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`, {
    //   headers: { Authorization: `Bearer ${storedSessionId}` },
    // })
    //   .then(r => r.ok ? r.json() : null)
    //   .then(data => { if (data) { setUser(data); setSessionId(storedSessionId); } })
    //   .finally(() => setLoading(false));

    setLoading(false);
  }, []);

  const login = (newSessionId: string, newUser: User) => {
    localStorage.setItem(SESSION_KEY, newSessionId);
    setSessionId(newSessionId);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSessionId(null);
    setUser(null);
    // TODO: Call /api/v1/auth/logout to invalidate session server-side
  };

  return (
    <AuthContext.Provider value={{ user, sessionId, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  return useContext(AuthContext);
}
