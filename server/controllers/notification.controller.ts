import Notification from "../models/notification.model";
import { Request, Response, NextFunction } from "express";
import cron from "node-cron";
import catchAsync from "../utils/catchAsync";
import AppError from "../errorsHandlers/appError";

// Get All notification -- only for Admin
export const getNotifications = catchAsync(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  }
);

// Update notification status --only admin
export const updateNotification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) =>
  {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
    {
      return next(new AppError("Notification not found", 404));
    } else
    {
      notification.status
        ? (notification.status = "read")
        : notification.status;
    }

    await notification.save();

    const notifications = await Notification.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  }
);

// Delete notification --only admin
cron.schedule("0 0 0 * * *", async () =>
{
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });

  console.log("Deleted Notifications");
});
