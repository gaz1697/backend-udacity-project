"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var authenticateToken = function (req, res, next) {
    // this function verifies that the token has been produced by the backend
    try {
        var authHeader = req.headers.authorization;
        var token = authHeader.split(" ")[1];
        jsonwebtoken_1["default"].verify(token, process.env.BCRYPT_PASSWORD);
        next();
    }
    catch (err) {
        res.status(401);
        res.json("invalid credentials");
    }
};
exports.authenticateToken = authenticateToken;
