import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";
// import { refreshToken } from "../controllers/auth.controller";

const router = express.Router();

// router.use(refreshToken);
router.use(isAuthenticated);

router.route("/create-order").post(restrictTo("user"), createOrder);

router.route("/get-all-orders").get(restrictTo("admin"), getAllOrders);

export default router;
