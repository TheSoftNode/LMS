import mongoose, { Model, Schema } from "mongoose";
import IReview from "./Interfaces/reviewInterface";

const reviewSchema = new Schema<IReview>(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    adminComments: [
      {
        type: Schema.ObjectId,
        ref: "Comment",
      },
    ],

    course: {
      type: Schema.ObjectId,
      ref: "Course",
      required: [true, "Review must belong to a course."],
    },

    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

const Review: Model<IReview> = mongoose.model("Review", reviewSchema);
export default Review;
