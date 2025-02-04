import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // this function verifies that the token has been produced by the backend
  try {
    const authHeader = req.headers.authorization as string;
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.BCRYPT_PASSWORD as string);
    next();
  } catch (err) {
    res.status(401);
    res.json("invalid credentials");
  }
};
