import express from "express";
import AuthMiddleware from "../middleware/authMiddleware.js";
import {
  createApplication,
  deleteApplication,
  getJobApplications,
  getJobSingleApplication,
  getSingleApplication,
  getUserApplications,
  setToAccepted,
  setToRejected,
} from "../controllers/applicationController.js";

const router = express.Router();

router.use(AuthMiddleware);

router.post("/", createApplication);
router.post("/applicant", getUserApplications);
router.post("/:id", getSingleApplication);
router.delete("/:id", deleteApplication);
router.post("/job/:id", getJobApplications);
router.post("/accept/:id", setToAccepted);
router.post("/reject/:id", setToRejected);
router.post("/application/:id", getJobSingleApplication);

export default router;
