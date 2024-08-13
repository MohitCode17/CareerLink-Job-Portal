import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";
import User from "../models/user.model.js";

export const authenticate = (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken)
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });

    // VERIFING THE AUTH TOKEN
    const decoded = jwt.verify(authToken, config.jwt_secret_key);

    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });

    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export const checkRecruiterRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);

    if (!user || user.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can perform this action.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while checking the user role.",
    });
  }
};
