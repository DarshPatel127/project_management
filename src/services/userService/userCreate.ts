import {User,NewUser, users, UserWithoutPassword, UserWithToken} from "../../db/schema/users";
import {db} from "../../db/db";
import {hash} from "bcrypt"
import APIError from "../../utils/apiError";
import generateAccessAndRefreshTokens from "../../utils/generateTokens";
import { eq } from "drizzle-orm";

export const registerUser = async(newUser: NewUser): Promise<UserWithToken> => {

    const hashedPassword = await hash(newUser.password, 10);

    const [createdUser] = await db.insert(users).values({
        email: newUser.email,
        password: hashedPassword,
        name: newUser.name,
        role: newUser.role,
    }).returning(
        {
            id: users.id,
            email: users.email,
            name: users.name,
            role: users.role,
            refreshToken: users.refreshToken
        }
    );

    if (!createdUser) {
        throw new APIError("User creation failed", 500);
    }
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(createdUser);
    await db.update(users).set({ refreshToken }).where(eq(users.id, createdUser.id));
    return {
        ...createdUser, access_token: accessToken, refreshToken
    };
}