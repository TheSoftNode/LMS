// import { Request, Response, NextFunction } from "express";
// import Comment from "../models/comment.model";
// import catchAsync from "../utils/catchAsync";
// import CourseData from "../models/courseData.model";

// export const addCommentToCourseData = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const courseDataId = req.params.courseDataId;

//     const comment = await Comment.create(req.body);
//     const courseDetail = await CourseData.findById(courseDataId);
//     courseDetail.questions.push(comment._id);
//     await courseDetail?.save();

//     console.log(courseDetail.questions);

//     res.status(200).json({
//       success: true,
//       comment,
//     });
//   }
// );
