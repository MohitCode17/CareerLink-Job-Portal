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
      !position
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

export const handleGetJobs = async (req, res) => {
  try {
    // SEARCH QUERY
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs)
      return res.status(404).json({
        success: false,
        message: "No Jobs Found.",
      });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

export const handleGetJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "company",
    });

    if (!job)
      return res.status(404).json({
        success: false,
        message: "No Job Found.",
      });

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

export const handleGetJobForAdmin = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs)
      return res.status(404).json({
        success: false,
        message: "No Jobs Found.",
      });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};
