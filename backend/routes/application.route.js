import express from "express";
import { handleApplyJob } from "../controllers/application.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// APPLY JOB ROUTE (FOR JOB-SEEKER)
router.get("/apply/:id", authenticate, handleApplyJob);

export default router;
