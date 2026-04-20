import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '@ek/types';
import { UserRole } from '@ek/types';
import { ROLE_LABELS, ROLE_HIERARCHY } from '@ek/config';

export const rolesRouter = Router();

/**
 * GET /api/roles
 * Returns the list of available roles and their labels.
 * Public endpoint — no auth required.
 */
rolesRouter.get('/', (_req: Request, res: Response): void => {
  const roles = ROLE_HIERARCHY.filter((r) => r !== UserRole.GUEST).map((role) => ({
    value: role,
    label: ROLE_LABELS[role],
  }));

  const body: ApiResponse<typeof roles> = {
    success: true,
    data: roles,
  };
  res.json(body);
});
