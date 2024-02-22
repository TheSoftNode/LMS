import express from "express";
import {
  addAnswer,
  addQuestion,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";
import { refreshToken } from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/create-course")
  .post(refreshToken, isAuthenticated, restrictTo("admin"), uploadCourse);

router
  .route("/edit-course/:id")
  .put(isAuthenticated, restrictTo("admin"), editCourse);

router
  .route("/delete-course/:id")
  .delete(refreshToken, isAuthenticated, restrictTo("admin"), deleteCourse);

router.route("/getVdoCipherOTP").post(generateVideoUrl);

router.route("/get-course/:id").get(getSingleCourse);
router.route("/get-courses").get(getAllCourses);
router
  .route("/get-course-content/:id")
  .get(refreshToken, isAuthenticated, getCourseByUser);
router.route("/add-question").put(refreshToken, isAuthenticated, addQuestion);
router.route("/add-answer").put(refreshToken, isAuthenticated, addAnswer);

export default router;
