import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '@ek/types';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response): void => {
  const body: ApiResponse<{ status: string; timestamp: string }> = {
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
    },
  };
  res.json(body);
});
