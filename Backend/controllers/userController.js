// import User model
import { User } from "../models/UserModel.js";

// import bcryptjs
import bcrypt from "bcryptjs";

// import jwt
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        message: "Invalid username",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Username already exists",
      });
    }

    // hashing for password using bcrypt.js
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: "Account created and logged in successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await User.findOne({ email: email }).lean(); //.lean() :- Ye query ko 3-4 guna fast bana deta hai kyunki ye simple JavaScript object deta hai.
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // tokenization (e.g., a session token stored in a cookie) for login to store in cookie
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: `Welcome back ${user.username}`,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: "Logout successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const {
      name,
      username,
      bio,
      occupation,
      linkedin,
      github,
      instagram,
      facebook,
    } = req.body;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (occupation) user.occupation = occupation;
    if (linkedin) user.linkedin = linkedin;
    if (github) user.github = github;
    if (instagram) user.instagram = instagram;
    if (facebook) user.facebook = facebook;

    // Update profile picture if file is uploaded
    if (req.file) {
      user.profilePicture = req.file.path;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update profile",
      success: false,
    });
  }
};
