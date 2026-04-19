import { Request, Response, NextFunction } from 'express'

// ---------------------------------------------------------------------------
// Augmented Express Request
// ---------------------------------------------------------------------------

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: UserRole
  }
}

export type UserRole = 'ADMIN' | 'SELLER' | 'BUYER' | 'INSTALLER' | 'SHOP'

// ---------------------------------------------------------------------------
// Standard API response wrappers
// ---------------------------------------------------------------------------

export interface ApiSuccessResponse<T = unknown> {
  success: true
  data: T
  meta?: PaginationMeta
}

export interface ApiErrorResponse {
  success: false
  error: string
  details?: Record<string, string[]>
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

export interface PaginationMeta {
  total: number
  page: number
  perPage: number
  totalPages: number
}

export interface PaginationQuery {
  page?: number
  perPage?: number
}

// ---------------------------------------------------------------------------
// Route handler types
// ---------------------------------------------------------------------------

export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

export type AuthHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<void>
