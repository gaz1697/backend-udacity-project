"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`could not get products, ${err} `);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products WHERE id=($1)";
            const results = await conn.query(sql, [id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not get product, ${err} `);
        }
    }
    async create(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO products (p_name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const results = await conn.query(sql, [product.p_name, product.price, product.category]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not create product, ${err} `);
        }
    }
    async update(product) {
        try {
            const conn = await database_1.default.connect();
            const sql = "UPDATE products SET p_name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *";
            const results = await conn.query(sql, [product.p_name, product.price, product.category, product.id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not update products, ${err} `);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
            const results = await conn.query(sql, [id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not delete product, ${err} `);
        }
    }
}
exports.productStore = productStore;
