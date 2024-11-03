import { Job } from "../models/job.model.js";

//for admin to post a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      positions,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "One/more fields are missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      positions,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "The job has been created successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error occurred while posting job",
      success: false,
      error: error.message, // Optional: Include error message in the response
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
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
    if (!jobs) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for better visibility
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

//for student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//for admin to check how many jobs he has created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // Assuming this is set correctly in your middleware
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company", // Use quotes around 'company'
      options: { sort: { createdAt: -1 } }, // Use options to sort if needed
    });

    if (!jobs || jobs.length === 0) {
      // Check if jobs array is empty
      return res.status(404).json({
        message: "Jobs Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

