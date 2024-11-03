import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      //for Applicants which company he applied
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job", //Generate a relation between Job and application
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true } //to record the timestamps
);

export const Application = mongoose.model("Application", applicationSchema);
