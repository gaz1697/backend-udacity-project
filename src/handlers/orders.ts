import express, { Request, Response, NextFunction } from "express";
import { authenticateToken } from "../middleware/authenticate";
import { order, orderStore, order_product } from "../models/orders";
import { orderDashboard } from "../services/dashboard";

const store = new orderStore();

const orderDash = new orderDashboard();

const orderRoutes = (app: express.Application) => {
  app.get("/order/", index);
  app.get("/order/:id", authenticateToken, show);
  app.get("/order/active/:id", get_active_orders);
  app.post("/order", authenticateToken, post);
  app.post("/order_product", authenticateToken, post_order_product);
};

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(req.params.id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const post = async (req: Request, res: Response) => {
  try {
    const order: order = {
      order_status: req.body.status,
      user_id: req.body.user_id,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const post_order_product = async (req: Request, res: Response) => {
  try {
    const order_product: order_product = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
    };
    const new_order_product = await store.addProduct(order_product);
    res.json(new_order_product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const get_active_orders = async (req: Request, res: Response) => {
  try {
    const user_id: number = parseInt(req.params.id);
    const orders = await orderDash.index(user_id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default orderRoutes;
