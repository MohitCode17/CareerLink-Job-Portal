import express from "express";
import {
  handleCreateCompany,
  handleGetCompanies,
  handleGetCompany,
  handleUpdateCompany,
} from "../controllers/company.controller.js";
import {
  authenticate,
  checkRecruiterRole,
} from "../middlewares/authenticate.js";
const router = express.Router();

// CREATE A NEW COMPANY ROUTE (ONLY RECRUITER CAN CREATE A COMPANY)
router.post("/create", authenticate, checkRecruiterRole, handleCreateCompany);

// GET ALL COMPANIES (FOR RECRUITER VIEW)
router.get("/get", authenticate, checkRecruiterRole, handleGetCompanies);

// GET ALL COMPANY
router.get("/get/:id", handleGetCompany);

// UPDATE COMPANY
router.put("/update/:id", authenticate, checkRecruiterRole, handleUpdateCompany);

export default router;
