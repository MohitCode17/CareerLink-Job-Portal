import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

    // TODO: HANDLE PROFILE PHOTO (WITH CLOUDINARY)

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
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
