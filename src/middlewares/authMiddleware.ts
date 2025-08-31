import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { db } from '../db/db';
import { users } from '../db/schema/users';
import { eq } from 'drizzle-orm';
import APIError from '../utils/apiError';
import { User } from '../db/schema/users';
import asyncHandler from "../utils/asyncHandler";

declare module 'express' {
  interface Request {
    user?: User;
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = req.header('Authorization')?.replace('Bearer ', '');

    if (!access_token) {
      throw new APIError('Access token is missing', 401);
    }

    const decodedToken: any = verify(access_token, process.env.JWT_ACCESS_SECRET!);

    const [user] = await db.select().from(users).where(eq(users.email, decodedToken.email));

    if (!user) {
      throw new APIError('Invalid access token', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError('Invalid or expired access token', 401));
    }
  }
};