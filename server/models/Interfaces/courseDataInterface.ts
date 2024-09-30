import { Document } from "mongoose";
import IComment from "./commentInterface";

export interface ILink extends Document
{
  title: string;
  url: string;
}

export interface ICourseData extends Document
{
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}
