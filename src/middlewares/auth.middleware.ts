import { env } from '@/configs';
import prisma from '@/prisma/clients/client';
import { CustomError, verifyToken } from '@/utils';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers?.authorization;
  const missingAuthError = new CustomError(401, 'Missing auth token');

  if (typeof bearerHeader === 'undefined') {
    next(missingAuthError);
  }

  const token = bearerHeader?.split('Bearer ')?.[1] ?? '';

  if (!token || token === '') {
    next(missingAuthError);
  }

  try {
    const isTokenValid = verifyToken(token as string, env.APP.JWT_SECRET) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: isTokenValid.userId },
      select: { accessToken: true },
    });

    if (!user || user.accessToken !== token) {
      throw new CustomError(403, 'Invalid token');
    }

    next();
  } catch (error) {
    if (error instanceof Error && error.message === 'jwt expired') {
      return next(new CustomError(401, 'Token expired'));
    }
    next(error);
  }
};

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers?.authorization;
  const wrongRoleError = new CustomError(401, 'Not authorized');

  const token = bearerHeader?.split('Bearer ')?.[1] ?? '';

  try {
    const isTokenValid = verifyToken(token as string, env.APP.JWT_SECRET) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: isTokenValid.userId },
      select: { role: true },
    });

    if (!user || user.role === null) {
      throw new CustomError(403, 'Invalid token or role not specified');
    }

    if (user.role !== 'ADMIN') {
      next(wrongRoleError);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { authMiddleware, adminMiddleware };
