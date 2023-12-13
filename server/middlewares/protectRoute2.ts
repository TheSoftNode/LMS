import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errorsHandlers/appError";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../dataAccess/redis";

export const isAuthenticated = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token;

    if (!access_token)
      return next(new AppError("Please, login to access this resources", 401));

    const decoded = Jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) return next(new AppError("Invalid Access Token", 400));

    const user = await redis.get(decoded.id);

    if (!user)
      return next(new AppError("Please login to access this resource", 400));

    req.user = JSON.parse(user);
    next();
  }
);
