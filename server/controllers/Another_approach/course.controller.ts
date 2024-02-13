// import { Request, Response, NextFunction } from "express";
// import catchAsync from "../utils/catchAsync";
// import cloudinary from "cloudinary";
// import { createCourse } from "../services/course.service";
// import Course from "../models/course.model";
// import { redis } from "../dataAccess/redis";
// import AppError from "../errorsHandlers/appError";

// // Upload course
// export const uploadCourse = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data = req.body;
//     const thumbnail = data.thumbnail;
//     if (thumbnail) {
//       const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
//         folder: "courses",
//       });

//       data.thumbnail = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       };
//     }

//     createCourse(data, res, next);
//   }
// );

// // Edit course
// export const editCourse = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const data = req.body;

//     const thumbnail = data.thumbnail;

//     if (thumbnail) {
//       await cloudinary.v2.uploader.destroy(thumbnail.public_id);

//       const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
//         folder: "courses",
//       });

//       data.thumbnail = {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       };
//     }

//     const course = await Course.findByIdAndUpdate(req.params.id, data, {
//       new: true,
//       runValidators: false,
//     });

//     res.status(200).json({
//       success: true,
//       course,
//     });
//   }
// );

// // Get all courses
// export const getAllCourses = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const isCacheExist = await redis.get("allCourses");
//     let courses: any;

//     if (isCacheExist) {
//       courses = JSON.parse(isCacheExist);
//     } else {
//       courses = await Course.find();
//       //   .select(
//       //     "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
//       //   );

//       await redis.set("allCourses", JSON.stringify(courses));
//     }

//     res.status(200).json({
//       count: courses.length,
//       success: true,
//       courses,
//     });
//   }
// );

// // Get single course --- without purchasing
// export const getSingleCourse = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const isCacheExist = await redis.get(req.params.Id);

//     let course: any;

//     if (isCacheExist) {
//       course = JSON.parse(isCacheExist);
//     } else {
//       course = await Course.findById(req.params.id);
//       //   .select(
//       //     "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
//       //   );

//       await redis.set(req.params.id, JSON.stringify(course), "EX", 604800);
//     }

//     res.status(200).json({
//       success: true,
//       course,
//     });
//   }
// );

// export const getCourseByUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userCourseList = req.user?.courses;
//     const courseId = req.params.Id;

//     const courseExists = userCourseList?.find(
//       (course: any) => course._id.toString() === courseId
//     );

//     if (!courseExists)
//       return next(new AppError("Your not eligible to access this course", 404));

//     const course = await Course.findById(courseId);
//     const content = course?.courseData;

//     res.status(200).json({
//       success: true,
//       content,
//     });
//   }
// );
