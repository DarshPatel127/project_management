import { Request, Response, NextFunction } from 'express';
import APIError from '../utils/apiError';

export const isProjectManager = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role === 'project_manager') {
    next();
  } else {
    next(new APIError('Forbidden', 403));
  }
  
};
