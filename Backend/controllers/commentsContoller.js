import { Blog } from "../models/BlogModel.js";
import { Comment } from "../models/CommentModel.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const { content } = req.body;

    const blog = await Blog.findById(postId);
    if (!content) {
      return res.status(404).json({
        message: "Content is required",
        success: false,
      });
    }

    const comment = await Comment.create({
      content,
      userId: authorId,
      postId: postId,
    });

    await comment.populate({
      path: "userId",
      select: "username profilePicture",
    });

    blog.comments.push(comment._id);
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Comment Added",
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const comment = await Comment.find({ postId: postId })
      .populate({ path: "userId", select: "username profilePicture" })
      .sort({ createdAt: -1 });

    if (!comment) {
      return req.status(404).json({
        success: false,
        message: "No comment found for this blog",
      });
    }

    return res.status(200).json({
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    return req.status(500).json({
      success: false,
      message: "No comment found",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
      });
    }

    if (comment.userId.toString() !== authorId) {
      return res.status(403).json({
        message: "Unauthorized access to delete",
        success: false,
      });
    }

    const blogId = comment.postId;

    // delete comment
    await Comment.findByIdAndDelete(commentId);

    // remove commentId from blog
    await Blog.findByIdAndUpdate(blogId, {
      $pull: { comments: commentId },
    });

    return res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete",
      success: false,
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const userId = req.id;
    const { content } = req.body;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
      });
    }

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Unauthorized user can not edit comment",
        success: false,
      });
    }

    comment.content = content;
    comment.editedAt = new Date();
    await comment.save();

    return res.status(200).json({
      message: "Comment updated",
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to edit comment",
      success: false,
    });
  }
};

export const likeComment = async (req, res) => {
  try {
    const userId = req.id;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId).populate("userId");
    if (!comment) {
      return res.status(500).json({
        message: "Comment not found",
        success: false,
      });
    }

    let liked = comment.likes.includes(userId);
    if (liked) {
      comment.likes = comment.likes.filter((id) => id !== userId);
      comment.numberOfLikes -= 1;
    } else {
      // if not liked yet then like it
      comment.likes.push(userId);
      comment.numberOfLikes += 1;
    }

    await comment.save();

    return res.status(200).json({
      success: true,
      message: liked ? "Comment disliked" : "Comment liked",
      updatedComment: comment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to like comment",
      success: false,
    });
  }
};
