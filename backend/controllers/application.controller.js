import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job Id is required!",
        success: false,
      });
    }
    //Check if the user has already to this job before.
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job!",
        success: false,
      });
    }

    //Check if the jobs exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    //Create a new application for the current user.
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job has been Applied successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//get applied jobs by an applicant
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No applications have been filled!",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Admin wants to see who all have applied for a job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id; // Correctly access the jobId
    console.log("Received jobId:", jobId); // Log the received jobId

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant", // Nested populate
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//Update status of an applicant by admin (reject/select)

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required!",
        success: false,
      });
    }
    //find the application by applicant id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found!",
        success: false,
      });
    }
    //update the status of the applicant
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status has been updated successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
