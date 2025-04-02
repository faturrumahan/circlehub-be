import { BaseResponse, StatusType } from '../interfaces';
import CustomError from './customError';
import { generateToken, verifyToken } from './jwt';

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

export { formatResponse, CustomError, generateToken, verifyToken };
