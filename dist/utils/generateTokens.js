"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const generateJwt = (user) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    return (0, jsonwebtoken_1.sign)({ email: user.email }, jwtSecret, { expiresIn: '1h' });
};
exports.default = generateJwt;
