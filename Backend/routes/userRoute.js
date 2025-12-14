import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/userController.js";

// import multer :-
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const upload = multer({ storage });

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePicture"), updateProfile);

export default router;
