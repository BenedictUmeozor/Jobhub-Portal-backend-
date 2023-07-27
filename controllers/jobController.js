import expressAsyncHandler from "express-async-handler";
import Job from "../models/jobModel.js";

const getJobsAll = expressAsyncHandler(async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });
  res.status(200).json(jobs);
});

const getAllJobs = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const totalCount = await Job.countDocuments({});
  const jobs = await Job.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.status(200).json({ jobs, totalCount });
});

const getSingleJob = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Job does not exist");
  }

  const job = await Job.findOne({ _id: id });

  if (!job) {
    throw new Error("Job does not exist");
  }

  res.status(200).json(job);
});

const getEmployerJobs = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const jobs = await Job.find({ employer: _id }).sort({ createdAt: -1 });
  res.status(200).json(jobs);
});

const createJob = expressAsyncHandler(async (req, res) => {
  const job = await Job.createJob({ ...req.body, req });
  res.status(201).json(job);
});

const updateJob = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await Job.updateJob({ id, ...req.body });
  res.status(201).json(job);
});

const deleteJob = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOneAndDelete({ _id: id });
  res.status(200).json(job);
});

export {
  createJob,
  updateJob,
  getAllJobs,
  getSingleJob,
  getEmployerJobs,
  deleteJob,
  getJobsAll,
};
