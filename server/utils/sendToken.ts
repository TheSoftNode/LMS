import { Response } from "express";
import IUser from "../models/Interfaces/userInterface";
import { redis } from "../dataAccess/redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// Parse environment variables to integrate with fallback values
const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES_IN || "300",
  10
);

const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRES_IN || "1200",
  10
);

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignInAccessToken(user._id);
  const refreshToken = user.SignInRefreshToken(user._id);

  // Upload session to redis
  redis.set(user._id, JSON.stringify(user) as any);

  // Only set secure to true in production
  if (process.env.NODE_ENV === "production") accessTokenOptions.secure = true;

  // Add both tokens to the cookie response
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
