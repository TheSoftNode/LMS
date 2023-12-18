import { NextFunction, Response } from "express";
import Course from "../models/course.model";
import catchAsync from "../utils/catchAsync";

// Create course
export const createCourse = catchAsync(
  async (data: any, res: Response, next: NextFunction) => {
    const course = await Course.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

// Get all courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await Course.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    courses,
  });
};
