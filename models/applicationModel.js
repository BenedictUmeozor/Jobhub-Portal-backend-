import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    summary: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

applicationSchema.statics.createNew = async function ({ req, job, summary }) {
  const { _id } = req.user;

  if (!summary) {
    throw new Error("All fields are required");
  }

  const app = await this.create({
    job,
    applicant: _id,
    summary,
    status: "pending",
  });

  const updatedJob = await Job.findOneAndUpdate(
    { _id: job },
    { $inc: { applicants: 1 } }
  );

  const application = await this.findOne({ _id: app._id }).populate("job");

  return application;
};

const Application = mongoose.model("Application", applicationSchema);

export default Application;
