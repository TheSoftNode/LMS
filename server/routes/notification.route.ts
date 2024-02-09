import express from "express";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";

const router = express.Router();

router
  .route("/get-all-notifications")
  .get(isAuthenticated, restrictTo("admin"), getNotifications);

router
  .route("/update-notification/:id")
  .put(isAuthenticated, restrictTo("admin"), updateNotification);

export default router;
