import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../middleware/authenticate";
import { product, productStore } from "../models/products";
const store = new productStore();

const productRoutes = (app: express.Application) => {
  app.get("/product/", authenticateToken, index);
  app.get("/product/:id", authenticateToken, show);
  app.post("/product", authenticateToken, post);
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

export default productRoutes;
