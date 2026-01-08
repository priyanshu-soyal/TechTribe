import mongoose from "mongoose";
import { Blog } from "./BlogModel.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Indexing se database ko pata hota hai ki data kahan hai.
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "https://freesvg.org/img/abstract-user-flat-4.png",
    },
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Handling deletion of blog when user deleted
userSchema.post("findOneAndDelete", async (user) => {
  if (user) {
    await Blog.deleteMany({ author: user._id });
  }
});

export const User = mongoose.model("User", userSchema);
