import express from "express";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";
import { restrictTo } from "../middlewares/roleManager2";
import { isAuthenticated } from "../middlewares/protectRoute2";

const router = express.Router();

router.use(isAuthenticated, restrictTo("admin"));

router.route("/create-layout").post(createLayout);

router.route("/update-layout").put(editLayout);

router.route("/get-layout/:type").get(getLayoutByType);

export default router;
