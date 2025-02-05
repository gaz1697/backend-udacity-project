import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../middleware/authenticate";
import { product, productStore } from "../models/products";
const store = new productStore();

const productRoutes = (app: express.Application) => {
  app.get("/product/", index);
  app.get("/product/:id", show);
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
    const product: product = {
      p_name: req.body.p_name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default productRoutes;
