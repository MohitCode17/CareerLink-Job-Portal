import express from "express";
import {
  handleApplyJob,
  handleGetApplicants,
  handleGetApplications,
  handleUpdateStatus,
} from "../controllers/application.controller.js";
import {
  authenticate,
  checkRecruiterRole,
} from "../middlewares/authenticate.js";

const router = express.Router();

// APPLY JOB ROUTE (FOR JOB-SEEKER)
router.get("/apply/:id", authenticate, handleApplyJob);

// GET APPLIED JOB APPLICATIONS (FOR JOB-SEEKER)
router.get("/get", authenticate, handleGetApplications);

// GET APPLIED JOB APPLICANTS DETAILS (FOR RECRUITER)
router.get(
  "/:id/applicants",
  authenticate,
  checkRecruiterRole,
  handleGetApplicants
);

// UPDATE APPLICATION STATUS (FOR RECRUITER)
router.put(
  "/status/:id/update",
  authenticate,
  checkRecruiterRole,
  handleUpdateStatus
);
export default router;
