import express from "express";
import {
  authenticate,
  checkRecruiterRole,
} from "../middlewares/authenticate.js";
import { handleCreateJob } from "../controllers/job.controller.js";

const router = express.Router();

// CREATE A NEW JOB ROUTE (ONLY RECRUITER CAN CREATE A JOB)
router.post("/create", authenticate, checkRecruiterRole, handleCreateJob);

export default router;