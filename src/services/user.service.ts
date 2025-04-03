import prisma from '@/prisma/clients/client';
import { CustomError } from '@/utils';

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

const SUser = {
  getAllUsers,
  getSpecificUsers,
};

export default SUser;
