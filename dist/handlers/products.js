"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middleware/authenticate");
const products_1 = require("../models/products");
const store = new products_1.productStore();
const productRoutes = (app) => {
    app.get("/product/", index);
    app.get("/product/:id", show);
    app.post("/product", authenticate_1.authenticateToken, post);
};
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const post = async (req, res) => {
    try {
        const product = {
            p_name: req.body.p_name,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
exports.default = productRoutes;
