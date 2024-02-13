import express from "express";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";
import { refreshToken } from "../controllers/auth.controller";

const router = express.Router();

router.use(refreshToken);
router.use(isAuthenticated);

router
  .route("/get-all-notifications")
  .get(restrictTo("admin"), getNotifications);

router
  .route("/update-notification/:id")
  .put(restrictTo("admin"), updateNotification);

export default router;
