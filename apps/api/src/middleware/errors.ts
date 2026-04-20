import { Request, Response, NextFunction } from "express";

/**
 * Global error handler – keeps error responses in a consistent ApiError shape.
 * Must be registered as the last middleware in the Express app.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error("[error]", err);
  res.status(500).json({
    ok: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}

/**
 * 404 handler – catches any routes not matched by registered routers.
 */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    ok: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
}
