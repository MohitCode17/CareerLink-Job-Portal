import express from "express";
import {
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", handleRegisterUser);
// LOGIN USER ROUTE
router.post("/login", handleLoginUser);

export default router;
