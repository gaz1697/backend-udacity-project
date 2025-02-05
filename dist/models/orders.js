"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
class orderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders";
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`could not get orders, ${err} `);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const results = await conn.query(sql, [id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not get order, ${err} `);
        }
    }
    async create(order) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
            const results = await conn.query(sql, [order.status, order.user_id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not create order, ${err} `);
        }
    }
    async addProduct(order_product) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
            const results = await conn.query(sql, [order_product.order_id, order_product.product_id, order_product.quantity]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not create add product, ${err} `);
        }
    }
}
exports.orderStore = orderStore;
