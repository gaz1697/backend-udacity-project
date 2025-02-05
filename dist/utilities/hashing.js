"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signPassword = (password) => {
    return bcrypt_1.default.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
};
exports.signPassword = signPassword;
