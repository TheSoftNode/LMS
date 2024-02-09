import express from "express";
import {
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";

const router = express.Router();

router.route("/upload-course").post(uploadCourse);

router.route("/edit-course/:id").patch(editCourse);
router.route("/get-all-courses").get(getAllCourses);
router.route("/get-course-unpaid/:id").get(getSingleCourse);
router.route("/get-course-paid/:id").get(isAuthenticated, getCourseByUser);

export default router;
