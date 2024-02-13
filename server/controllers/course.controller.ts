import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import Course from "../models/course.model";
import { redis } from "../dataAccess/redis";
import AppError from "../errorsHandlers/appError";
import mongoose from "mongoose";
import Notification from "../models/notification.model";
import Email from "../emails/email";

// Upload course
export const uploadCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.thumbnail;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    createCourse(data, res, next);
  }
);

// Edit course
export const editCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      await cloudinary.v2.uploader.destroy(thumbnail.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });

      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const courseId = req.params.id;
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $set: data },
      { new: true }
    );

    res.status(200).json({
      success: true,
      course,
    });
  }
);

// Get single course --- without purchasing
export const getSingleCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.Id;
    const isCacheExist = await redis.get(courseId);
    let course: any;

    if (isCacheExist) {
      course = JSON.parse(isCacheExist);
    } else {
      course = await Course.findById(req.params.id).select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );

      await redis.set(courseId, JSON.stringify(course), "EX", 604800);
    }

    res.status(200).json({
      success: true,
      course,
    });
  }
);

// Get all courses
export const getAllCourses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const isCacheExist = await redis.get("allCourses");
    let courses: any;

    if (isCacheExist) {
      courses = JSON.parse(isCacheExist);
    } else {
      courses = await Course.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );

      await redis.set("allCourses", JSON.stringify(courses));
    }

    res.status(200).json({
      count: courses.length,
      success: true,
      courses,
    });
  }
);

export const getCourseByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses;
    const courseId = req.params.Id;

    const courseExists = userCourseList?.find(
      (course: any) => course._id.toString() === courseId
    );

    if (!courseExists)
      return next(new AppError("Your not eligible to access this course", 404));

    const course = await Course.findById(courseId);
    const content = course?.courseData;

    res.status(200).json({
      success: true,
      content,
    });
  }
);

// Add question to a course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { question, courseId, contentId }: IAddQuestionData = req.body;
    const course = await Course.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new AppError("invalid content id", 400));
    }

    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );

    if (!courseContent) return next(new AppError("Invalid content id", 400));

    //create a new question object
    const newQuestion: any = {
      user: req.user,
      question,
      questionReplies: [],
    };

    // Add this question to our course content
    courseContent.questions.push(newQuestion);

    // Send Notification to the admin
    await Notification.create({
      user: req.user?._id,
      title: "New Question",
      message: `You have new question in ${courseContent.title}`,
    });

    // save the updated course
    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  }
);

// Add question to a course
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { answer, courseId, contentId, questionId }: IAddAnswerData =
      req.body;
    const course = await Course.findById(courseId);

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return next(new AppError("invalid content id", 400));
    }

    const courseContent = course?.courseData?.find((item: any) =>
      item._id.equals(contentId)
    );

    if (!courseContent) return next(new AppError("Invalid content id", 400));

    const question = courseContent?.questions?.find((item: any) =>
      item._id.equals(questionId)
    );

    if (!question) return next(new AppError("Invalid question id", 400));

    //create a new Answer object
    const newAnswer: any = {
      user: req.user,
      answer,
    };

    // Add this answer to our course content
    question.questionReplies.push(newAnswer);

    // save the updated course
    await course?.save();

    if (req.user?._id === question.user._id) {
      // Create a notification
      await Notification.create({
        user: req.user?._id,
        title: "New Question Reply Received",
        message: `You have new question reply in ${courseContent.title}`,
      });
    } else {
      const data = {
        name: question.user.name,
        title: courseContent.title,
      };

      const userEmail = {
        email: question.user.email,
      };

      try {
        await new Email(userEmail, data).questionReply();
      } catch (ex: any) {
        return next(new AppError(ex.message, 500));
      }
    }

    res.status(200).json({
      success: true,
      course,
    });
  }
);

// Add review in course
interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}

export const addReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userCourseList = req.user?.courses;
    const courseId = req.params.id;

    // check if courseId already exists in userCourseList based on _id
    const courseExists = userCourseList?.some(
      (course: any) => course._id.toString() === courseId.toString()
    );

    if (!courseExists)
      return next(
        new AppError("You are not eligible to access this course", 404)
      );

    const course = await Course.findById(courseId);

    const { review, rating } = req.body as IAddReviewData;

    const reviewData: any = {
      user: req.user,
      comment: review,
      rating,
    };

    course?.reviews.push(reviewData);

    let avg = 0;

    course?.reviews.forEach((rev: any) => {
      avg += rev.ratings;
    });

    if (course) course.ratings = avg / course.reviews.length;

    await course?.save();

    const notification = {
      title: "New Review Received",
      message: `${req.user?.name} has given a review on ${course?.name}`,
    };

    //Create notification

    res.status(200).json({
      success: true,
      course,
    });
  }
);

// Add reply in review
interface IAddReviewReplyData {
  comment: string;
  courseId: string;
  reviewId: string;
}

export const addReplyToReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { comment, courseId, reviewId } = req.body as IAddReviewReplyData;

    const course = await Course.findById(courseId);

    if (!course) return next(new AppError("Course not found", 404));

    const review = course?.reviews?.find(
      (rev: any) => rev._id.toString() === reviewId
    );

    if (!review) return next(new AppError("Review not found", 404));

    const replyData: any = {
      user: req.user,
      comment,
    };

    if (!review.commentReplies) {
      review.commentReplies = [];
    }

    review.commentReplies?.push(replyData);

    await course?.save();

    res.status(200).json({
      success: true,
      course,
    });
  }
);

// Delete course -- only by admin
export const deleteCourse = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new AppError("Course not found", 404));

    await Course.deleteOne({ id });

    await redis.del(id);

    res.status(204).json({
      success: true,
      message: "Course deleted successfully",
    });
  }
);

// get all courses --- only for admin
export const getAllCoursesByAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    getAllCoursesService(res);
  }
);

// Generate video url
export const generateVideoUrl = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;

      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );

      res.json(response.data);
    } catch (error: any) {
      return next(new AppError(error.message, 400));
    }
  }
);
