import { Document, ObjectId } from "mongoose";
import IUser from "./userInterface";

export default interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

// export default interface IComment extends Document {
//   user: ObjectId;
//   comment: string;
//   questionReplies: IComment[];
// }
