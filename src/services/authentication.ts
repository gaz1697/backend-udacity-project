import jwt from "jsonwebtoken";
import { user, userStore } from "../models/users";
import { Request, Response } from "express";
import { signPassword } from "../utilities/hashing";

const newUser = new userStore();
export const authenticate = async (req: Request, res: Response) => {
  // this function signs the user information and returns it as an authentication token
  try {
    const user: { id: string; signedPassword: string } = {
      id: req.body.id,
      signedPassword: signPassword(req.body.password),
    };
    const dbUser: user = await newUser.show(user.id);
    if (dbUser.password == user.signedPassword) {
      const token = jwt.sign(user, process.env.BCRYPT_PASSWORD as string);
      return token;
    } else {
      return "username or password are not valid";
    }
  } catch (err) {
    res.status(401);
    res.json(`couldn't produce authorization header : ${err}`);
  }
};
