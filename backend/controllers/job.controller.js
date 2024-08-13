import Job from "../models/job.model.js";

export const handleCreateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
      sector,
    } = req.body;

    if (
      !title ||
      !description ||
      !requirements ||
      !companyId ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !sector
    )
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });

    const userId = req.id;

    const job = await Job.create({
      title,
      description,
      requirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
      sector,
    });

    return res.status(201).json({
      success: true,
      message: "New Job Created Successfully.",
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};
