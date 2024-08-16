import cloudinary from "../config/cloudinary.js";
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

    const companyId = req.params.id;
    let company = await Company.findById(companyId);

    if (!company)
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });

    // HANDLE COMPANY LOGO
    if (req.files && req.files.logo) {
      const { logo } = req.files;

      // DELETE EXISTING LOGO IF ANY
      if (company.logo && company.logo.public_id) {
        await cloudinary.uploader.destroy(company.logo.public_id);
      }

      // UPLOAD NEW LOGO
      const uploadResponseForLogo = await cloudinary.uploader.upload(
        logo.tempFilePath,
        { folder: "Job Portal Company Logo" }
      );

      // INCLUDE NEW LOGO DATA IN UPDATE
      company.logo = {
        public_id: uploadResponseForLogo?.public_id,
        url: uploadResponseForLogo?.secure_url,
      };
    }

    const updatedData = {
      name,
      description,
      website,
      location,
      logo: company.logo, // INCLUDE THE UPDATE LOGO DATA
    };

    company = await Company.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Company information updated.",
      company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
