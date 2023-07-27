import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Register user
const registerUser = expressAsyncHandler(async (req, res) => {
  const { firstname, lastname, email, role, password } = req.body;

  const user = await User.register(firstname, lastname, email, role, password);

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });

  const data = {
    firstname,
    lastname,
    role,
    token,
  };

  res.status(201).json(data);
});

// Login User

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.login(email, password);

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });

  const data = {
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    token,
  };

  res.status(200).json(data);
});

const checkToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    } else {
      // Token is valid and not expired
      return res.status(200).json({ message: "Token is valid" });
    }
  });
};

export { registerUser, loginUser, checkToken };
