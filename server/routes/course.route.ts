import express from "express";
import {
  addAnswer,
  addQuestion,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";

const router = express.Router();

router
  .route("/create-course")
  .post(isAuthenticated, restrictTo("admin"), uploadCourse);

router
  .route("/edit-course/:id")
  .put(isAuthenticated, restrictTo("admin"), editCourse);

router.route("/get-course/:id").get(getSingleCourse);
router.route("/get-courses").get(getAllCourses);
router.route("/get-course-content/:id").get(isAuthenticated, getCourseByUser);
router.route("/add-question").put(isAuthenticated, addQuestion);
router.route("/add-answer").put(isAuthenticated, addAnswer);

export default router;
