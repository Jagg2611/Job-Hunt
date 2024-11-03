import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is required!",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName }); //find by comp name
    if (company) {
      return res.status(400).json({
        message: "The same company cannot be registered!",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id, // get it from authentication
    });

    return res.status(201).json({
      message: "Company has been registered successfully!",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in userId
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(201).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//getCompany by its id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id; //company/:id is accessed with params
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//update company information

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudinary for file
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;


    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company Information has been updated!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};