"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middleware/authenticate");
const orders_1 = require("../models/orders");
const store = new orders_1.orderStore();
const orderRoutes = (app) => {
    app.get("/order/", index);
    app.get("/order/:id", authenticate_1.authenticateToken, show);
    app.post("/order", authenticate_1.authenticateToken, post);
    app.post("/order_product", authenticate_1.authenticateToken, post_order_product);
};
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const post = async (req, res) => {
    try {
        const order = {
            status: req.body.status,
            user_id: req.body.user_id,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const post_order_product = async (req, res) => {
    try {
        const order_product = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
        };
        const new_order_product = await store.addProduct(order_product);
        res.json(new_order_product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = orderRoutes;
