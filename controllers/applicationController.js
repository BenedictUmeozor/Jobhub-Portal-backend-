import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";
import expressAsyncHandler from "express-async-handler";

const getUserApplications = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const applications = await Application.find({ applicant: _id })
    .populate("job")
    .populate("applicant")
    .sort({
      createdAt: -1,
    });
  res.status(200).json(applications);
});

const getJobApplications = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const applications = await Application.find({ job: id })
    .populate("applicant")
    .sort({
      createdAt: -1,
    });
  res.status(200).json(applications);
});

const getJobSingleApplication = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const applicant = req.user._id;
  const application = await Application.findOne({ job: id, applicant });

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  res.status(200).json(application);
});

const getSingleApplication = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await Application.findOne({ applicant: id });
  if (!application) {
    throw new Error("Application not found");
  }
  res.status(200).json(application);
});

const createApplication = expressAsyncHandler(async (req, res) => {
  const application = await Application.createNew({ req, ...req.body });
  res.status(201).json(application);
});

const setToAccepted = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await Application.findOne({ _id: id });
  application.status = "accepted";
  const updated = await application.save();
  res.status(200).json(updated);
});

const setToRejected = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const application = await Application.findOne({ _id: id });
  application.status = "rejected";
  const updated = await application.save();
  res.status(200).json(updated);
});

const deleteApplication = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await Application.findOneAndDelete({ _id: id });
  const updatedJob = await Job.findOneAndUpdate(
    { _id: job.job },
    { $inc: { applicants: -1 } }
  );
  res.status(200).json(job);
});

export {
  createApplication,
  getJobApplications,
  getSingleApplication,
  setToAccepted,
  setToRejected,
  getUserApplications,
  getJobSingleApplication,
  deleteApplication,
};
