import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import Course from "../models/course.model";
import Notification from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import catchAsync from "../utils/catchAsync";
import { IOrder } from "../models/Interfaces/orderInterface";
import AppError from "../errorsHandlers/appError";
import Email from "../emails/email";

export const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const { courseId, payment_info } = req.body as IOrder;

    const user = await User.findById(req.user?._id);

    if (!user)
    {
      return next(new AppError("User not found", 404));
    }

    const courseExistsInUser = user.courses.some(
      (course: any) => course._id.toString() === courseId
    );

    if (courseExistsInUser)
    {
      return next(new AppError("You have already purchased this course", 400));
    }

    const course = await Course.findById(courseId);

    if (!course)
    {
      return next(new AppError("Course not found", 404));
    }

    const data: any = {
      courseId: course._id,
      userId: user._id,
      payment_info,
    };

    const mailData = {
      order: {
        _id: course._id.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };

    try
    {
      await new Email(user, mailData).OrderConfirmation();
    } catch (ex: any)
    {
      return next(new AppError(ex.message, 500));
    }

    user.courses.push({ courseId: courseId.toString() });

    await user.save({ validateBeforeSave: false });

    const notification = await Notification.create({
      user: user._id,
      title: "New Order",
      message: `You have a new order from ${course.name}`,
    });

    course.purchased = (course.purchased || 0) + 1;
    await course.save();

    newOrder(data, res, next);
  }
);

// get all orders --- only for admin
export const getAllOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    getAllOrdersService(res);
  }
);
