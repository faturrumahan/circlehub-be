import { BaseResponse, StatusType } from '../interfaces';
import CustomError from './customError';
import { generateToken, verifyToken } from './jwt';
import exclude from './exclude';
import compareId from './compareId';

const formatResponse = <T>(
  status: StatusType,
  message: string,
  data: T | [] = [],
): BaseResponse<T> => {
  return {
    status,
    message,
    data,
  };
};

export { formatResponse, CustomError, generateToken, verifyToken, exclude, compareId };
