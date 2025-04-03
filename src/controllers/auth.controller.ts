import { SAuth } from '@/services';
import { CustomError, formatResponse } from '@/utils';
import { VLoginSchema, VRegisterSchema } from '@/validators';
import { NextFunction, Request, Response } from 'express';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VLoginSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }
    const user = await SAuth.login(value);
    res.json(formatResponse('T', 'Login Success', user));
  } catch (error) {
    next(error);
  }
};

const reLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VLoginSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }
    const forceLogin = true;
    const user = await SAuth.login(value, forceLogin);
    res.json(formatResponse('T', 'Login Success', user));
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VRegisterSchema.validate(req.body);
    if (error) {
      throw new CustomError(400, error.message);
    }
    const user = await SAuth.register(value);
    res.json(formatResponse('T', 'Register Success', user));
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const bearerHeader = req.headers?.authorization;
    const token = bearerHeader?.split('Bearer ')?.[1] ?? '';
    const user = await SAuth.logout(id, token);
    res.json(formatResponse('T', 'Logout Success', user));
  } catch (error) {
    next(error);
  }
};

const CAuth = {
  login,
  reLogin,
  register,
  logout,
};

export default CAuth;
