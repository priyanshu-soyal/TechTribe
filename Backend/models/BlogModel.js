import mongoose, { mongo } from "mongoose";
import { Comment } from "./CommentModel.js";
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "AI/ML",
        "Data Science",
        "Cloud Computing",
        "DevOps",
        "Cyber Security",
        "Blockchain / Web3",
        "System Design",
        "Hardware / IoT",
        "Gaming",
        "Operating Systems",
        "Tech Career & Education",
        "Productivity & Tools",
        "Tech News",
        "Other",
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Handling deletion of comments when blog deleted
blogSchema.post("findOneAndDelete", async (blog) => {
  if (blog) {
    await Comment.deleteMany({ _id: { $in: blog.comments } });
  }
});

export const Blog = mongoose.model("Blog", blogSchema);
