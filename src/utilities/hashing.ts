import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const signPassword = (password: string): string => {
  return bcrypt.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string));
};
