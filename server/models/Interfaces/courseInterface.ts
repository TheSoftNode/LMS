import { Document, ObjectId, Types } from "mongoose";
import { ICourseData } from "./courseDataInterface";
import IReview from "./reviewInterface";

export default interface ICourse extends Document
{
  _id: Types.ObjectId;
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}

// export default interface ICourse extends Document {
//   name: string;
//   slug: string;
//   description: string;
//   price: number;
//   estimatedPrice?: number;
//   thumbnail: object;
//   tags: string;
//   level: string;
//   demoUrl: string;
//   benefits: { title: string }[];
//   prerequisites: { title: string }[];
//   courseData: ObjectId;
//   ratings?: number;
//   ratingsAverage: number;
//   ratingsQuantity: number;
//   priceDiscount: number;
//   purchased?: number;
// }
