import { Router } from 'express';
import authRouter from './auth';

const router = Router();

router.use('/auth', authRouter);

// TODO: Add listings, businesses, and wanted-ads routes here.

export default router;
