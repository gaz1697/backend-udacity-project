"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDashboard = void 0;
const database_1 = __importDefault(require("../database"));
class orderDashboard {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND order_status='active'";
            const results = await conn.query(sql);
            conn.release();
            return results.rows;
        }
        catch (err) {
            throw new Error(`could not get orders, ${err} `);
        }
    }
}
exports.orderDashboard = orderDashboard;
