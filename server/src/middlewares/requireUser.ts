import { ResponseStatus } from '../helpers/responseEnums';

import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

interface JWTPayload {
  email?: string;
  userId?: string;
}

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.email) {
    return res.status(ResponseStatus.UnauthorizedCredentials).send('Invalid session');
  }
  next();
};

export default requireUser;
