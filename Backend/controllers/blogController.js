import { Blog } from "../models/BlogModel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({
        message: "Blog title or category are required",
        success: false,
      });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.id,
    });

    return res.status(201).json({
      message: "Blog Created Successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create blog",
      success: flase,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category, isPublished } = req.body;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(401).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updateData = {
      title,
      subtitle,
      description,
      category,
      author: req.id,
      isPublished: true,
    };

    if (req.file) {
      updateData.thumbnail = req.file.path;
    }

    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    return res.status(201).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error update blog",
    });
  }
};

export const getOwnBlog = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id required",
      });
    }

    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "username profilePicture",
    });
    if (!blogs) {
      return res.status(404).json({
        message: "No blogs found",
        blogs: [],
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (blog.author.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Unathorized access to delete blog",
      });
    }

    // delete
    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete",
      success: false,
    });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    // authorId = like krne wale ki id
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    // like logic
    await blog.updateOne({ $addToSet: { likes: authorId } });
    await blog.save();

    return res.status(200).json({
      blog,
      message: "Blog liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to like",
    });
  }
};

export const disLike = async (req, res) => {
  try {
    const blogId = req.params.id;
    // authorId = dislike krne wale ki id
    const authorId = req.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    // dislike logic
    await blog.updateOne({ $pull: { likes: authorId } });
    await blog.save();

    return res.status(200).json({
      blog,
      message: "Blog disliked",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to dislike",
    });
  }
};

export const likesCounts = async (req, res) => {
  try {
    // const userId = req.id
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const likesCount = blog.likes ? blog.likes.length : 0;
    return res.status(200).json({
      success: true,
      likesCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Fetch to likes count",
    });
  }
};

export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).populate({
      path: "author",
      select: "username profilePicture",
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Not found any blog",
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something is wrong",
    });
  }
};

export const getBlogsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const blogs = await Blog.find({ category, isPublished: true }).populate({
      path: "author",
      select: "username profilePicture",
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No blogs found in ${category} category`,
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs by category",
    });
  }
};

// export const getBlog = async (req, res) => {
//   try {
//     const { blogId } = req.params;

//     const blog = await Blog.findById(blogId).populate({
//       path: "author",
//       select: "username profilePicture",
//     });

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch blog",
//     });
//   }
// };
