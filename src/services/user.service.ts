import { IUser } from '@/interfaces';
import prisma from '@/prisma/clients/client';
import { CustomError } from '@/utils';
import bcrypt from 'bcrypt';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!users) {
    throw new CustomError(400, 'Users not found');
  }

  return {
    user: users,
  };
};

const getSpecificUsers = async (id?: string, name?: string, role?: 'ADMIN' | 'USER') => {
  let users;
  if (id) {
    users = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
  } else {
    users = await prisma.user.findMany({
      where: {
        OR: [{ name: { contains: name } }, { role: role }],
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (users.length === 0) {
      throw new CustomError(400, 'User(s) not found');
    }
  }

  if (!users) {
    throw new CustomError(400, 'User(s) not found');
  }

  return {
    users,
  };
};

const editUser = async (data: Omit<IUser, 'accessToken'>) => {
  const { id, email, password, name, role } = data;

  const newData = { email, name, role, password };
  Object.keys(newData).forEach((key) => {
    if (newData[key as keyof typeof newData] === undefined) {
      delete newData[key as keyof typeof newData];
    }
  });
  
  if (newData.email) {
    const isEmailExist = await prisma.user.findFirst({
      where: {
        email: newData.email,
        NOT: {
          id
        },
      },
    });
  
    if (isEmailExist) {
      throw new CustomError(409, 'Email already exists');
    }
  }

  if (newData.password) {
    newData.password = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: newData,
  });

  if (!user) {
    throw new CustomError(400, 'User not found');
  }

  return {
    user: user,
  };
};

const verifyUserPassword = async (id: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      password: true,
    },
  });

  if (!user) {
    throw new CustomError(400, 'User not found');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new CustomError(409, 'Please provide the correct password');
  }

  return isPasswordCorrect;
}

const SUser = {
  getAllUsers,
  getSpecificUsers,
  editUser,
  verifyUserPassword,
};

export default SUser;
