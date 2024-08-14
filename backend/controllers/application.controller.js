import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const handleApplyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId)
      return res.status(400).json({
        success: false,
        message: "Job id is required",
      });

    // CHECK IF USER HAS ALREADY APPLIED FOR THIS JOB
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication)
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });

    const job = await Job.findById(jobId);

    if (!job)
      return res.status(404).json({
        success: false,
        message: "No Job Found",
      });

    // CREATE NEW JOB APPLICATION
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job applied successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const handleGetApplications = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications)
      return res.status(404).json({
        success: false,
        message: "No Applications",
      });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
