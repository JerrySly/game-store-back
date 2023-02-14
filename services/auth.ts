import { FindOperator, getRepository } from 'typeorm';
import { hashingPassword, comparePassword } from '../helper/hashing';
import { User } from '../database/entities/user';
import { dataSource } from '../database';

const userRepo = dataSource.getRepository(User);

export const logIn = async (user: User): Promise<ResponseWrap<User>> => {
  const tableUser = await getUserByEmail(user.email);

  if (!tableUser) {
    return {
      error: true,
      message: 'User is not exist',
      data: null,
    };
  }
  const isPasswordEqual = await comparePassword(
    user.password,
    tableUser.password
  );
  if (isPasswordEqual) {
    return {
      error: false,
      message: 'Valid data',
      data: tableUser,
    };
  }
  return {
    data: null,
    error: true,
    message: 'Password is invalid',
  };
};

export const singUp = async (user: User): Promise<ResponseWrap<User>> => {
  const tableUser = await getUserByEmail(user.email);
  if (tableUser) {
    return {
      error: true,
      data: null,
      message: 'User is exist',
    };
  }
  const hashed = await hashingPassword(user.password);
  const createdUser =  await userRepo.create({
    email: user.email,
    password: hashed,
  });
  userRepo.save(createdUser);
  const newTableUser = await getUserByEmail(user.email);
  if (!newTableUser) {
    return {
      error: true,
      message: 'Error on create user',
      data: null,
    };
  }
  return {
    error: false,
    message: 'Ok',
    data: newTableUser,
  };
};

const getUserByEmail = async (
  email: string | FindOperator<string> | undefined
): Promise<User | null> => {
    return await userRepo.findOne({
      where: {
        email,
      },
    });
};
