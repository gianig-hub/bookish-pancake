import express from 'express';
import { authRouter } from './auth/auth.router';
import { usersRouter } from './users/users.router';
import { rolesRouter } from './roles/roles.router';
import { sessionsRouter } from './sessions/sessions.router';
import { healthRouter } from './health/health.router';
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { apiConfig } from './config/api.config';

const app = express();

app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/sessions', sessionsRouter);

// Error handling — must be last
app.use(errorHandler);

app.listen(apiConfig.port, () => {
  console.log(`[api] EK API listening on port ${apiConfig.port}`);
});

export default app;
