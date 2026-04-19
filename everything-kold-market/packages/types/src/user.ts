// User-related types

import type { UserRole } from './marketplace';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  businessName?: string;
  phone?: string;
  whatsapp?: string;
  bio?: string;
  verified: boolean;
  cityId?: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}

export interface UpdateProfileInput {
  businessName?: string;
  phone?: string;
  whatsapp?: string;
  bio?: string;
  cityId?: string;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string;
    role: UserRole;
  };
  expires: string;
}
