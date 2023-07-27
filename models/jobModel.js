import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    applicants: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.statics.createJob = async function ({
  title,
  companyname,
  salary,
  type,
  category,
  summary,
  location,
  mode,
  req,
}) {
  const applicants = 0;

  if (
    !summary ||
    !title ||
    !companyname ||
    !salary ||
    !type ||
    !category ||
    !location ||
    !mode
  ) {
    throw new Error("Please fill all fields");
  }

  const employer = req.user._id;

  const job = await this.create({
    title,
    companyname,
    salary,
    type,
    category,
    summary,
    location,
    mode,
    applicants,
    employer,
  });

  return job;
};

jobSchema.statics.updateJob = async function ({
  id,
  title,
  companyname,
  salary,
  type,
  category,
  summary,
  location,
  mode,
}) {
  const job = await this.findOne({ _id: id });

  if (!job) {
    throw new Error("Job not found");
  }

  job.title = title;
  job.companyname = companyname;
  job.salary = salary;
  job.type = type;
  job.category = category;
  job.summary = summary;
  job.location = location;
  job.mode = mode;
  const updatedJob = await job.save();

  return updatedJob;
};

const Job = mongoose.model("Job", jobSchema);

export default Job;
