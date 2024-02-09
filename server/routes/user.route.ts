import express from "express";
import {
  forgotPassword,
  login,
  logout,
  refreshToken,
  resetPassword,
  signUp,
  updatePassword,
  updateUserInfo,
  verifyAccount,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middlewares/protectRoute2";
import {
  getUserInfo,
  socialAuth,
  updateProfilePicture,
} from "../controllers/user.controller";

const router = express.Router();

router.route("/verify-account").post(verifyAccount);
router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/social-auth").post(socialAuth);
router.route("/refreshToken").get(refreshToken);
router.route("/forgot-password").post(forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(isAuthenticated);

router.route("/logout").get(logout);
router.route("/me").get(getUserInfo);
router.route("/update-user-info").patch(updateUserInfo);
router.route("/update-password").patch(updatePassword);
router.route("/upload-profile-picture").patch(updateProfilePicture);

export default router;
