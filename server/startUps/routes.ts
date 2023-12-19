import express from "express";
import userRouter from "../routes/user.route";
import courseRouter from "../routes/course.route";
import courseDataRouter from "../routes/courseData.route";
import commentRouter from "../routes/comment.route";

export const mountedRoutes = function (app: any) {
  app.use(express.json());
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/courses", courseRouter);
  app.use("/api/v1/courseData", courseDataRouter);
  app.use("/api/v1/comments", commentRouter);
};
