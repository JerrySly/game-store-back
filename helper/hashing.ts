import { hash, compare, genSalt } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const hashingPassword = async (password: string): Promise<string> => {
  const rounds = process.env.SALT_ROUNDS;
  if (!rounds) {
    throw new Error("Hash not amount of salt rounds");
  }
  const salt = await genSalt(Number.parseInt(rounds));
  return await hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash);
};
