import { IUser } from '@/interfaces';
import prisma from '@/prisma/clients/client';
import { CustomError, generateToken, exclude } from '@/utils';
import bcrypt from 'bcrypt';

const login = async (data: Pick<IUser, 'email' | 'password'>, forceLogin = false) => {
  const { email, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      accessToken: true,
    },
  });

  if (!user) {
    throw new CustomError(400, 'User not found');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError(400, 'Email/Password incorrect');
  }

  if (user.accessToken) {
    if (!forceLogin) {
      throw new CustomError(409, 'Existing session detected. Confirm logout to proceed.');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { accessToken: null },
    });
  }

  const accessToken = generateToken('token', user.id);
  //   const refreshToken = generateToken('refreshToken', user.id);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      accessToken,
    },
  });

  return {
    user: exclude(user, ['password']),
    accessToken,
    // refreshToken,
  };
};

const register = async (data: Omit<IUser, 'id' | 'refreshToken'>) => {
  const { email, name, password, role } = data;

  const isEmailExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isEmailExist) {
    throw new CustomError(409, 'Email already exists');
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await bcrypt.hash(password, 10),
      role,
    },
  });

  return {
    user: exclude(user, ['password']),
  };
};

const logout = async (id: string, accessToken: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      accessToken: true,
    },
  });

  if (!user) {
    throw new CustomError(400, 'User not found');
  }

  if (user.accessToken !== accessToken) {
    throw new CustomError(401, 'Invalid token');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { accessToken: null },
  });

  return {
    user,
  };
};

const SAuth = {
  login,
  register,
  logout,
};

export default SAuth;
