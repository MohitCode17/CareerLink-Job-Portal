import Company from "../models/company.model.js";

export const handleCreateCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName)
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });

    let company = await Company.findOne({
      name: new RegExp(`^${companyName}$`, "i"),
    });

    if (company)
      return res.status(400).json({
        success: false,
        message: "You can't register same company.",
      });

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(200).json({
      success: true,
      message: "Company register successfully.",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
