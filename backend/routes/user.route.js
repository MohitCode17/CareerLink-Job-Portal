import express from "express";
import {
  handleLoginUser,
  handleLogoutUser,
  handleRegisterUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegisterUser);
// LOGIN USER ROUTE
router.post("/login", handleLoginUser);
// LOGOUT USER ROUTE
router.get("/logout", handleLogoutUser);
export default router;
