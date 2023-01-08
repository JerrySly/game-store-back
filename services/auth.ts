import { getTable, addValuesToTable } from "../database";
import { hashingPassword, comparePassword } from "../helper/hashing";
import { User } from "../types/user";

export const singIn = async (
  login: string,
  password: string
): Promise<User> => {
  const table = await getTable("Users");
  const user = table.find((x) => x.login === login);
  if (!user) {
    throw new Error("User is not exist");
  }
  const isPasswordEqual = await comparePassword(password, user.password);
  if (isPasswordEqual) {
    return user;
  }
  throw new Error("Password incorrect");
};

export const singUp = async (user: User): Promise<boolean> => {
  try {
    user.password = await hashingPassword(user.password);
    const userArray: Array<User> = [user];
    await addValuesToTable<User>("Users", userArray);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error on singUp \n" + error.message);
    } else console.log("Error on singUp " + error);
    return false;
  }
};
