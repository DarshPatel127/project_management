import { compare } from "bcrypt";
import { db } from "../../db/db";
import { users, UserWithToken } from "../../db/schema/users"
import { eq } from "drizzle-orm";
import APIError from "../../utils/apiError";
import generateAccessAndRefreshTokens from "../../utils/generateTokens";

export const loginUser = async (email: string, password: string): Promise<UserWithToken> => {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new APIError("Invalid email or password",403);
    }
    const {accessToken, refreshToken} = generateAccessAndRefreshTokens(user);
    await db.update(users).set({refreshToken: refreshToken}).where(eq(users.id, user.id));
    const {password: _password, ...userWithoutPassword} = user;
    return {
        ...userWithoutPassword,
        access_token: accessToken,
        refreshToken
    };
}
