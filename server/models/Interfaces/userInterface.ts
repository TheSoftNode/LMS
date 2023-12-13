import { Document, ObjectId } from "mongoose";

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  passwordChangedAt: any;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: boolean;
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestamp: number) => boolean;
  createPasswordResetToken: () => string;
  find: (filter: any) => Array<[]>;
}
