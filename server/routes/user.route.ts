import express from "express";
import { signUp, verifyAccount } from "../controllers/auth.controller";

const router = express.Router();

router.route("/verify-account").post(verifyAccount);
router.route("/signUp").post(signUp);

export default router;
