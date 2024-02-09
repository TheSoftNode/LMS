import express from "express";
import { createOrder, getAllOrders } from "../controllers/order.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import { restrictTo } from "../middlewares/roleManager2";

const router = express.Router();

router
  .route("/create-order")
  .post(isAuthenticated, restrictTo("user"), createOrder);

router
  .route("/get-all-orders")
  .get(isAuthenticated, restrictTo("admin"), getAllOrders);

export default router;
