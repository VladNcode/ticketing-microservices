import { Handler, NextFunction, Response, Request } from 'express';

export const catchAsync =
  (func: Handler): Handler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
