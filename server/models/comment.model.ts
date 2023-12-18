import mongoose, { Schema, Model } from "mongoose";
import IComment from "./Interfaces/commentInterface";

const commentSchema = new Schema<IComment>(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },

    comment: String,

    questionReplies: [this],
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.model("Comment", commentSchema);
export default Comment;
