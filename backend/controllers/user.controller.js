import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";

export const handleRegisterUser = async (req, res) => {
  try {
    // VALIDATION OF REQUEST BODY
    const { fullname, email, phone, password, role } = req.body;

    if (!fullname || !email || !phone || !password || !role)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    // CHECK IF USER HAS ALREADY AN ACCOUNT WITH PROVIDED EMAIL
    const user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });

    // HANDLE PROFILE PHOTO (WITH CLOUDINARY)
    let uploadResponseForProfile;
    if (req.files && req.files.profilePhoto) {
      const { profilePhoto } = req.files;

      uploadResponseForProfile = await cloudinary.uploader.upload(
        profilePhoto.tempFilePath,
        { folder: "Job Portal Profile" }
      );
    }

    // 👉 REGISTER NEW USER

    // 1. HASH THE USER PASSWORD WHICH RECEIVED FROM REQ.BODY
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. CREATE A USER IN DATABASE
    await User.create({
      fullname,
      email,
      phone,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: {
          public_id: uploadResponseForProfile?.public_id || "",
          url: uploadResponseForProfile?.secure_url || "",
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const handleLoginUser = async (req, res) => {
  try {
    // VALIDATION OF REQUEST BODY
    const { email, password, role } = req.body;

    if (!email || !password || !role)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    // CHECK USER HAS ALREADY AN ACCOUNT WITH PROVIDED EMAIL OR NOT
    let user = await User.findOne({ email });

    // IF NOT
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });

    // IF USER PRESENT

    // 1. CHECK USER PASSWORD
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });

    // 2. CHECK USER ROLE
    if (role !== user.role)
      return res.status(400).json({
        success: false,
        message: "Account doen't exist with current role.",
      });

    // IF ALL CHECK PASSED

    // 1. ISSUE AUTH TOKEN (JWT TOKEN)
    const authToken = jwt.sign({ userId: user._id }, config.jwt_secret_key, {
      expiresIn: "1d",
    });

    // USER RESPONSE
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("authToken", authToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back, ${user.fullname}`,
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
