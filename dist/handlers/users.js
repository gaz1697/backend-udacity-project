"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate_1 = require("../middleware/authenticate");
const users_1 = require("../models/users");
const hashing_1 = require("../utilities/hashing");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const store = new users_1.userStore();
const userRoutes = (app) => {
    app.get("/user/", index);
    app.get("/user/:id", authenticate_1.authenticateToken, show);
    app.post("/user", post);
    app.post("/user/login", authenticate);
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
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: (0, hashing_1.signPassword)(req.body.password),
        };
        const newUser = await store.create(user);
        res.json(newUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const authenticate = async (req, res) => {
    // this function signs the user information and returns it as an authentication token
    try {
        const user = {
            id: req.body.id,
            password: req.body.password,
        };
        const dbUser = await store.show(user.id);
        if (bcrypt_1.default.compareSync(user.password + process.env.BCRYPT_PASSWORD, dbUser.password)) {
            const token = jsonwebtoken_1.default.sign(user, process.env.BCRYPT_PASSWORD);
            res.json(token);
        }
        else {
            res.json("the provided id or password is invalid");
        }
    }
    catch (err) {
        res.status(401);
        res.json(`couldn't produce authorization header`);
    }
};
exports.default = userRoutes;
