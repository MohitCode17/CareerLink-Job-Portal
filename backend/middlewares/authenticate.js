import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";

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
