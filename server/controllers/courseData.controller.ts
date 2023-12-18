import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import CourseData from "../models/courseData.model";
import Course from "../models/course.model";
import AppError from "../errorsHandlers/appError";

export const addCourseData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    const courseDetail = await CourseData.create(req.body);

    await Course.findByIdAndUpdate(courseId, { courseData: courseDetail._id });

    res.status(201).json({
      success: true,
      courseDetail,
    });
  }
);

export const getCourseData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseData = await CourseData.findById(req.params.id);

    if (!courseData) return next(new AppError("CourseData not found", 404));

    res.status(200).json({
      status: "success",
      courseData,
    });
  }
);
