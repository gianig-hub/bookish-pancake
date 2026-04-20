import express from "express";
import cors from "cors";
import helmet from "helmet";

import { config } from "./config/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import { healthRouter } from "./modules/health/health.router.js";
import { authRouter } from "./modules/auth/auth.router.js";
import { usersRouter } from "./modules/users/users.router.js";
import { rolesRouter } from "./modules/roles/roles.router.js";
import { sessionsRouter } from "./modules/sessions/sessions.router.js";

const app = express();

// ── Security & parsing ────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/sessions", sessionsRouter);

// ── Error handling ────────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`[api] listening on http://localhost:${config.port}`);
});

export default app;
