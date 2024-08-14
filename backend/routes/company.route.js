import express from "express";
import { handleCreateCompany } from "../controllers/company.controller.js";
import {
  authenticate,
  checkRecruiterRole,
} from "../middlewares/authenticate.js";
const router = express.Router();

// CREATE A NEW COMPANY ROUTE (ONLY RECRUITER CAN CREATE A COMPANY)
router.post("/create", authenticate, checkRecruiterRole, handleCreateCompany);

export default router;
