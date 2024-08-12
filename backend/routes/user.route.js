import express from "express";
import {
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
  handleUpdateProfile,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegisterUser);
// LOGIN USER ROUTE
router.post("/login", handleLoginUser);
// LOGOUT USER ROUTE
router.get("/logout", handleLogoutUser);
// UPDATE USER PROFILE ROUTE
router.put("/profile/update", authenticate, handleUpdateProfile);
export default router;
