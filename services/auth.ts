import { getTable, addValuesToTable } from '../database';
import { hashingPassword, comparePassword } from '../helper/hashing';
import { User } from '../types/user';

export const logIn = async (user: User): Promise<ResponseWrap<User>> => {
  const table = await getTable<User>('Users');
  const tableUser = table.find((x) => x.email === user.email);
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
  let table = await getTable<User>('Users');
  const tableUser = table.find((x) => x.email === user.email);
  if (tableUser) {
    return {
      error: true,
      data: null,
      message: 'User is exist',
    };
  }
  const hashed = await hashingPassword(user.password);
  await addValuesToTable<User>('Users', [
    {
      email: user.email,
      password: hashed,
    },
  ]);
  table = await getTable<User>('Users');
  const newTableUser = table.find((x) => x.email === user.email);
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
