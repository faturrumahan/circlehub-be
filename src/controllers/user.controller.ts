import { SUser } from '@/services';
import { compareId, CustomError, formatResponse } from '@/utils';
import { VEditUserSchema } from '@/validators';
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

const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = VEditUserSchema.validate(req.body);

    const bearerHeader = req.headers?.authorization;
    const validId = compareId(value.id, bearerHeader as string);
    if (!validId) {
      throw new CustomError(403, 'Not authorized to edit this user');
    }

    if (error) {
      throw new CustomError(400, error.message);
    }
    const user = await SUser.editUser(value);
    res.json(formatResponse('T', 'Modify User Profile Success', user));
  } catch (error) {
    next(error);
  }
}

const verifyUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, password } = req.body;

    const user = await SUser.verifyUserPassword(id, password);
    res.json(formatResponse('T', 'Password verification successful', user));
  } catch (error) {
    next(error);
  }
}

const CUser = {
  getAllUsers,
  getSpesificUsers,
  editUser,
  verifyUserPassword
};

export default CUser;
