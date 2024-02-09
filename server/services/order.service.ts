import { NextFunction, Response } from "express";
import Order from "../models/order.model";
import catchAsync from "../utils/catchAsync";

export const newOrder = catchAsync(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await Order.create(data);

    res.status(201).json({
      success: true,
      order,
    });
  }
);

// Get all Orders
export const getAllOrdersService = async (res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
};
