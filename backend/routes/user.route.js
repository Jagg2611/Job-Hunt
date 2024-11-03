import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  register,
  updateProfile,
  login,
  logout,
} from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

export default router;
//middlewares work between request and response,
//once request is made a middleware is called.
