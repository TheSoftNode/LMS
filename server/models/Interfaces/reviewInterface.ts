import { Document, ObjectId } from "mongoose";
import IComment from "./commentInterface";

export default interface IReview extends Document {
  review: string;
  rating: number;
  user: ObjectId;
  course: ObjectId;
  adminComments: IComment[];
}
