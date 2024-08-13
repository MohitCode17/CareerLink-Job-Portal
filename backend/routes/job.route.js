import express from "express";
import {
  authenticate,
  checkRecruiterRole,
} from "../middlewares/authenticate.js";
import {
  handleCreateJob,
  handleGetJobForAdmin,
  handleGetJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

// CREATE A NEW JOB ROUTE (ONLY RECRUITER CAN CREATE A JOB)
router.post("/create", authenticate, checkRecruiterRole, handleCreateJob);

// GET ALL JOBS (FOR JOB-SEEKER SIDE)
router.get("/get", handleGetJobs);

// GET ALL JOB (FOR JOB-SEEKER SIDE)
router.get("/get/:id", handleGetJobs);

// GET JOB (FOR JOB-SEEKER SIDE)
router.get("/get/:id", handleGetJobs);

// GET ALL JOBS (FOR RECRUITER SIDE)
router.get("/get/", authenticate, checkRecruiterRole, handleGetJobForAdmin);

export default router;
