import { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "@ek/types";

/**
 * Global error handler middleware.
 * Must be registered last (after all routes).
 * TODO: integrate with a logging service (e.g. Sentry) before production.
 */
export function errorHandler(
  err: Error & { status?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.status ?? 500;
  const body: ApiResponse = {
    success: false,
    error: {
      code: err.code ?? "INTERNAL_ERROR",
      message: status === 500 ? "An unexpected error occurred" : err.message,
    },
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.error("[error]", err);
  }

  res.status(status).json(body);
}

/**
 * 404 catch-all handler. Register after all routes, before errorHandler.
 */
export function notFoundHandler(_req: Request, res: Response): void {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_FOUND", message: "Route not found" },
    timestamp: new Date().toISOString(),
  };
  res.status(404).json(body);
}
