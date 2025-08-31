import { Request,Response, NextFunction } from "express";
import APIError from "../utils/apiError";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
};

export default errorMiddleware;
