import express, { Request, Response } from 'express';
import { requireAuth } from '@vnctickets/common/build';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTickerRouter };
