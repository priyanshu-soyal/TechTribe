import express from "express";
import {
  createBlog,
  updateBlog,
  getOwnBlog,
  deleteBlog,
  likeBlog,
  disLike,
  likesCounts,
  allBlogs,
  getBlogsByCategory,
  // getBlog,
} from "../controllers/blogController.js";

// import multer :-
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
const upload = multer({ storage });

import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").get(allBlogs).post(isAuthenticated, createBlog);
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlog);
router.route("/category/:category").get(getBlogsByCategory);

router
  .route("/:blogId")
  .put(isAuthenticated, upload.single("thumbnail"), updateBlog);
// .get(getBlog)

router.route("/delete/:id").delete(isAuthenticated, deleteBlog);
router.route("/:id/like").get(isAuthenticated, likeBlog);
router.route("/:id/dislike").get(isAuthenticated, disLike);
router.route("/blogs/:id/likes").get(isAuthenticated, likesCounts);

export default router;
