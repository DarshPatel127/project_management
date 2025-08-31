"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registeredUser = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const userCreate_1 = require("../services/userService/userCreate");
const apiError_1 = __importDefault(require("../utils/apiError"));
exports.registeredUser = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
        throw new apiError_1.default("Name, email, and password are required", 400);
    }
    const user = { email, password, name, role };
    const newUser = await (0, userCreate_1.registerUser)(user);
    res.status(201).json({ message: 'User created successfully', user: newUser });
});
exports.default = exports.registeredUser;
