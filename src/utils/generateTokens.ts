import { sign } from "jsonwebtoken";
import { UserWithoutPassword } from "../db/schema/users";

const generateAccessAndRefreshTokens = (user: UserWithoutPassword) => {
    const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!jwtAccessSecret || !jwtRefreshSecret) {
        throw new Error("JWT secrets are not defined in environment variables");
    }

    const accessToken = sign({ email: user.email }, jwtAccessSecret, { expiresIn: '1h' });
    const refreshToken = sign({ id: user.id }, jwtRefreshSecret, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

export default generateAccessAndRefreshTokens;

