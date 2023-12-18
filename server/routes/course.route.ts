import express from "express";
import {
  editCourse,
  getAllCourses,
  uploadCourse,
} from "../controllers/course.controller";

const router = express.Router();

router.route("/upload-course").post(uploadCourse);

router.route("/edit-course/:id").patch(editCourse);
router.route("/get-all-courses").get(getAllCourses);

export default router;
