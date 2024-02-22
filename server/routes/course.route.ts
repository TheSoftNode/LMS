import express from "express";
import {
  addAnswer,
  addQuestion,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesByAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";
import { refreshToken } from "../controllers/auth.controller";

const router = express.Router();

router.route("/getVdoCipherOTP").post(generateVideoUrl);

router.route("/get-course/:id").get(getSingleCourse);
router.route("/get-courses").get(getAllCourses);

router.use(isAuthenticated);

router.route("/get-course-content/:id").get(getCourseByUser);
router.route("/add-question").put(addQuestion);
router.route("/add-answer").put(addAnswer);

router.use(restrictTo("admin"));

router.route("/create-course").post(uploadCourse);
router.route("/edit-course/:id").put(editCourse);
router.route("/delete-course/:id").delete(deleteCourse);
router.route("/get-courses-by-admin").get(getAllCoursesByAdmin);
export default router;
