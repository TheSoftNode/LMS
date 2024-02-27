import express from "express";
import { createLayout, editLayout } from "../controllers/layout.controller";
import { restrictTo } from "../middlewares/roleManager2";
import { isAuthenticated } from "../middlewares/protectRoute2";

const router = express.Router();

router
  .route("/create-layout")
  .post(isAuthenticated, restrictTo("admin"), createLayout);

router
  .route("/update-layout")
  .put(isAuthenticated, restrictTo("admin"), editLayout);

export default router;
