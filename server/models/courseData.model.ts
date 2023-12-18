import mongoose, { Model, Schema } from "mongoose";
import { ICourseData, ILink } from "./Interfaces/courseDataInterface";
import { NextFunction } from "express";

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

export const courseDataSchema = new Schema<ICourseData>({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [
    {
      type: Schema.ObjectId,
      ref: "Comment",
    },
  ],
});

courseDataSchema.pre(/^find/, function (this: any, next: NextFunction) {
  this.populate({
    path: "questions",
    select: "-_v",
  });

  next();
});

const CourseData: Model<ICourseData> = mongoose.model(
  "CourseData",
  courseDataSchema
);

export default CourseData;
