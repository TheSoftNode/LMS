import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../errorsHandlers/appError";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
} from "../services/user.service";
import { redis } from "../dataAccess/redis";
import { sendToken } from "../utils/sendToken";
import { ISocialAuthBody } from "../DTOs/UserDtos";

// Get my info - for user only
export const getUserInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    getUserById(userId, res);
  }
);

// Authentication for logging in with social sites
export const socialAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, avatar } = req.body as ISocialAuthBody;
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create({ email, name, avatar });
      sendToken(newUser, 200, res);
    }

    sendToken(user, 200, res);
  }
);

// get all users --- only for admin
export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getAllUsersService(res);
  }
);

// Update user role -- only by admin
export const updateUserRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = req.body;
    updateUserRoleService(res, id, role);
  }
);

// Delete user -- only by admin
export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) return next(new AppError("User not found", 404));

    await user.deleteOne({ id });

    await redis.del(id);

    res.status(204).json({
      success: true,
      message: "User deleted successfully",
    });
  }
);
