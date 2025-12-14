import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createComment,
  deleteComment,
  editComment,
  getComment,
  likeComment,
} from "../controllers/commentsContoller.js";

const router = express.Router();

router.route("/:id/create").post(isAuthenticated, createComment);
router.route("/:id/delete").delete(isAuthenticated, deleteComment);
router.route("/:id/edit").put(isAuthenticated, editComment);
router.route("/:id/like").put(isAuthenticated, likeComment);
router.route("/:id/comment/all").get(getComment);

export default router;
