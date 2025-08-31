"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const users_1 = require("../../db/schema/users");
const db_1 = require("../../db/db");
const bcrypt_1 = require("bcrypt");
const apiError_1 = __importDefault(require("../../utils/apiError"));
const generateTokens_1 = __importDefault(require("../../utils/generateTokens"));
const registerUser = async (newUser) => {
    const hashedPassword = await (0, bcrypt_1.hash)(newUser.password, 10);
    const [createdUser] = await db_1.db.insert(users_1.users).values({
        email: newUser.email,
        password: hashedPassword,
        name: newUser.name,
        role: newUser.role,
    }).returning({
        id: users_1.users.id,
        email: users_1.users.email,
        name: users_1.users.name,
        role: users_1.users.role,
    });
    if (!createdUser) {
        throw new apiError_1.default("User creation failed", 500);
    }
    return { ...createdUser, token: (0, generateTokens_1.default)(createdUser) };
};
exports.registerUser = registerUser;
