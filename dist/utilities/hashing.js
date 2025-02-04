"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.signPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var signPassword = function (password) {
    return bcrypt_1["default"].hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
};
exports.signPassword = signPassword;
