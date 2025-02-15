"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
const database_1 = __importDefault(require("../database"));
class userStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`could not get users, ${err} `);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users WHERE id=($1)";
            const results = await conn.query(sql, [id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not get user, ${err} `);
        }
    }
    async create(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *";
            const results = await conn.query(sql, [user.first_name, user.last_name, user.password]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not create user, ${err} `);
        }
    }
    async update(user) {
        try {
            const conn = await database_1.default.connect();
            const sql = "UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE id = $4 RETURNING *";
            const results = await conn.query(sql, [user.first_name, user.last_name, user.password, user.id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not update user, ${err} `);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
            const results = await conn.query(sql, [id]);
            conn.release();
            return results.rows[0];
        }
        catch (err) {
            throw new Error(`could not delete user, ${err} `);
        }
    }
}
exports.userStore = userStore;
