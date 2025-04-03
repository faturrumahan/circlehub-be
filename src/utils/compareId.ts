import { env } from '@/configs';
import { verifyToken } from './jwt';
import { JwtPayload } from 'jsonwebtoken';

const compareId = (id: string, authorization: string) => {
  const token = authorization.split('Bearer ')?.[1] ?? '';
  const isTokenValid = verifyToken(token as string, env.APP.JWT_SECRET) as JwtPayload;
  if (id !== isTokenValid.userId) {
    return false;
  }

  return true;
};

export default compareId;
