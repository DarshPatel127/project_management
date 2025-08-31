// userController.ts
import { User } from "../db/schema/users";
import asyncHandler from "../utils/asyncHandler";
import { registerUser } from "../services/userService/userCreate";
import { loginUser } from "../services/userservice/userLogin";
import APIError from "../utils/apiError";


export const RegisteredUser = asyncHandler(async (req, res, next) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name) {
    throw new APIError("Name, email, and password are required", 400);
  }
  const user = { email, password, name, role };
  const newUser = await registerUser(user);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

export const LoggedInUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new APIError("Email and password are required", 400);
    }

    const user = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user });
});
