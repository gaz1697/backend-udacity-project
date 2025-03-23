import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/authenticate";
import { user, userStore } from "../models/users";
import { signPassword } from "../utilities/hashing";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const store = new userStore();

const userRoutes = (app: express.Application) => {
  app.get("/user/", index);
  app.get("/user/:id", authenticateToken, show);
  app.post("/user", post);
  app.post("/user/login", authenticate);
};

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const post = async (req: Request, res: Response) => {
  try {
    const user: user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: signPassword(req.body.password),
    };
    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  // this function signs the user information and returns it as an authentication token
  try {
    const user: { id: string; password: string } = {
      id: req.body.id,
      password: req.body.password,
    };
    const dbUser: user = await store.show(user.id);
    if (bcrypt.compareSync(user.password + process.env.BCRYPT_PASSWORD, dbUser.password)) {
      const token = jwt.sign(user, process.env.BCRYPT_PASSWORD as string);
      res.json(token);
    } else {
      res.json(`the provided id or password is invalid ${user.id} and ${user.password}`);
    }
  } catch (err) {
    res.status(401);
    res.json(`couldn't produce authorization header`);
  }
};

export default userRoutes;
