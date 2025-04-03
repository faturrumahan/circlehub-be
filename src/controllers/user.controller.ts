import { SUser } from '@/services';
import { CustomError, formatResponse } from '@/utils';
import { NextFunction, Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await SUser.getAllUsers();
    res.json(formatResponse('T', 'Get All User Success', users));
  } catch (error) {
    next(error);
  }
};

const getSpesificUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, role } = req.query;
    const queryParams = [name, role, id].filter(Boolean);

    if (queryParams.length !== 1) {
      throw new CustomError(400, 'Please provide only one query parameter: id, name, or role.');
    }

    const nameParam = typeof name === 'string' ? name : undefined;
    const roleParam = typeof role === 'string' ? role : undefined;
    const idParam = typeof id === 'string' ? id : undefined;

    const users = await SUser.getSpecificUsers(idParam, nameParam, roleParam as 'ADMIN' | 'USER');
    res.json(formatResponse('T', 'Get User Success', users));
  } catch (error) {
    next(error);
  }
};

const CUser = {
  getAllUsers,
  getSpesificUsers,
};

export default CUser;
