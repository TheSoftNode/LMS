import mongoose, { Document, Model, Schema } from "mongoose";
import IReview from "./Interfaces/reviewInterface";
import { ICourseData, ILink } from "./Interfaces/courseDataInterface";
import IComment from "./Interfaces/commentInterface";
import ICourse from "./Interfaces/courseInterface";

const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  commentReplies: [Object],
});

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const courseDataSchema = new Schema<ICourseData>({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, "Course must have a name"],
    },

    description: {
      type: String,
      required: [true, "Course must have a description"],
    },

    price: {
      type: Number,
      required: [true, "Course must have a price"],
    },

    estimatedPrice: Number,

    thumbnail: {
      public_id: {
        required: true,
        type: String,
      },
      url: {
        required: true,
        type: String,
      },
    },

    tags: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
    },

    demoUrl: {
      type: String,
      required: true,
    },

    benefits: [{ title: String }],

    prerequisites: [{ title: String }],

    reviews: [reviewSchema],

    courseData: [courseDataSchema],

    ratings: {
      type: Number,
      default: 0,
    },

    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.model("Course", courseSchema);
export default Course;
