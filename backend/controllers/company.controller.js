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

export const handleGetCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies)
      return res.status(404).json({
        success: false,
        message: "Companies not found.",
      });

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const handleGetCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company)
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const handleUpdateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const updatedData = {
      name,
      description,
      website,
      location,
    };

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!company)
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });

    return res.status(200).json({
      success: true,
      message: "Company information updated.",
    });
  } catch (error) {
    console.log(error);
  }
};
