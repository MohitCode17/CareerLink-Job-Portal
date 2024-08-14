import express from "express";
import { handleApplyJob, handleGetApplications } from "../controllers/application.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

// APPLY JOB ROUTE (FOR JOB-SEEKER)
router.get("/apply/:id", authenticate, handleApplyJob);

// GET APPLIED JOB APPLICATIONS (FOR JOB-SEEKER)
router.get("/get", authenticate, handleGetApplications);

export default router;
