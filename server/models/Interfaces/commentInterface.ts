import { Document, ObjectId } from "mongoose";

export default interface IComment extends Document {
  user: ObjectId;
  comment: string;
  questionReplies: IComment[];
}
