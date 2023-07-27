import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getEmployerJobs,
  getJobsAll,
  getSingleJob,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/all", getJobsAll);
router.get("/:id", getSingleJob);

router.use(AuthMiddleware);

router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);
router.post("/employer", getEmployerJobs);

export default router;
