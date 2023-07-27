import express from "express";
import {
  checkToken,
  loginUser,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);

router.post("/login", loginUser);

router.post("/token", checkToken);

export default router;
