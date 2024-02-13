import { Document, ObjectId } from "mongoose";
import IComment from "./commentInterface";
import IUser from "./userInterface";

export default interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}

// export default interface IReview extends Document {
//   review: string;
//   rating: number;
//   user: ObjectId;
//   course: ObjectId;
//   adminComments: IComment[];
// }
