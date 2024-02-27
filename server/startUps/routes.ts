import express from "express";
import userRouter from "../routes/user.route";
import courseRouter from "../routes/course.route";
import notificationRouter from "../routes/notification.route";
import orderRouter from "../routes/order.route";
import layoutRouter from "../routes/layout.route";

export const mountedRoutes = function (app: any) {
  app.use(express.json());
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/courses", courseRouter);
  app.use("/api/v1/notifications", notificationRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/layouts", layoutRouter);
};
