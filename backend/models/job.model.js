import { application } from "express";
import mongoose from "mongoose";
import { Company } from "./company.model.js";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    positions: {
      type: Number,
      required: true,
    },
    company: {
      //relation between job and company will be generated
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      //which recruiter created this particular job - ADMIN
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        // required need not be true
      },
    ],
  },
  { timestamps: true } //to record the timestamps
);

export const Job = mongoose.model("Job", jobSchema);
