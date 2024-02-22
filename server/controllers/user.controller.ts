import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import catchAsync from "../utils/catchAsync";
import AppError from "../errorsHandlers/appError";
import cloudinary from "cloudinary";
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
      //   const newUser = await User.create({ email, name, avatar });
      const newUser = new User({ email, name, avatar });
      await newUser?.save({ validateBeforeSave: false });
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
    const { email, role } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      const id = isUserExist._id;
      updateUserRoleService(res, id, role);
    } else {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
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

export const updateProfilePicture = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { avatar } = req.body;

    const userId = req.user?._id;
    const user = await User.findById(userId);

    if (avatar && user) {
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
      });

      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
      //   } else {
      //     const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      //       folder: "avatars",
      //       width: 150,
      //     });

      //     user.avatar = {
      //       public_id: myCloud.public_id,
      //       url: myCloud.secure_url,
      //     };
      //   }
    }

    await user?.save({ validateBeforeSave: false });
    await redis.set(req.user?._id, JSON.stringify(user));

    res.status(200).json({
      success: true,
      user,
    });
  }
);
