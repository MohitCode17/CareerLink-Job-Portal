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

export const handleLogoutUser = async (req, res) => {
  try {
    return res.status(200).cookie("authToken", "", { maxAge: 0 }).json({
      success: true,
      message: "Logout Successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const handleUpdateProfile = async (req, res) => {
  try {
    const { fullname, email, phone, bio, skills } = req.body;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // RECEIVED req.id, WHEN USER AUTHENTICATED SUCCESSFULLY.
    let user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not found",
      });

    // 👉 HANDLE USER PROFILE UPDATE
    let uploadResponseForProfile;
    if (req.files && req.files.profilePhoto) {
      const { profilePhoto } = req.files;
      // 1. DELETE EXISTING PROFILE PHOTO TO CLOUDINARY IF EXISTS.
      if (
        user.profile &&
        user.profile.profilePhoto &&
        user.profile.profilePhoto.public_id
      ) {
        await cloudinary.uploader.destroy(user.profile.profilePhoto.public_id);
      }
      // 2. UPLOAD NEW PROFILE PHOTO
      uploadResponseForProfile = await cloudinary.uploader.upload(
        profilePhoto.tempFilePath,
        { folder: "Job Portal Profile" }
      );

      // UPDATE PROFILE
      user.profile.profilePhoto = {
        public_id: uploadResponseForProfile?.public_id,
        url: uploadResponseForProfile?.secure_url,
      };
    }

    // 👉 HANDLE USER RESUME UPDATE
    let uploadResponseForResume;
    if (req.files && req.files.resume) {
      const { resume } = req.files;
      // 1. DELETE EXISTING RESUME TO CLOUDINARY IF EXISTS.
      if (
        user.profile &&
        user.profile.resume &&
        user.profile.resume.public_id
      ) {
        await cloudinary.uploader.destroy(user.profile.resume.public_id);
      }
      // 2. UPLOAD NEW RESUME
      uploadResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "Job Portal Resumes" }
      );

      // UPDATE PROFILE
      user.profile.resume = {
        public_id: uploadResponseForResume?.public_id,
        url: uploadResponseForResume?.secure_url,
      };
    }

    // UPDATE THE PROFILE DATA
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    // UPDATED USER RESPONSE
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};
