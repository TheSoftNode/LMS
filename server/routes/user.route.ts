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
  deleteUser,
  getAllUsers,
  getUserInfo,
  socialAuth,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/user.controller";
import { restrictTo } from "../middlewares/roleManager2";

const router = express.Router();

router.route("/verify-account").post(verifyAccount);
router.route("/signUp").post(signUp);
router.route("/login").post(login);
router.route("/social-auth").post(socialAuth);
router.route("/refreshToken").get(refreshToken);
router.route("/forgot-password").post(forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// router.use(refreshToken);
router.use(isAuthenticated);

router.route("/logout").get(logout);
router.route("/me").get(getUserInfo);
router.route("/update-user-info").patch(updateUserInfo);
router.route("/update-password").patch(updatePassword);
router.route("/upload-profile-picture").patch(updateProfilePicture);

router.use(restrictTo("admin"));
router.route("/update-user-role").patch(updateUserRole);
router.route("/get-users").get(getAllUsers);
router.route("/delete-user/:id").delete(deleteUser);

export default router;
