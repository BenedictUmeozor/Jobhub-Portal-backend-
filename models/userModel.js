import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.register = async function (
  firstname,
  lastname,
  email,
  role,
  password
) {
  if (!firstname || !lastname || !email || !role || !password) {
    throw new Error("Please fill in all fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstname,
    lastname,
    email,
    role,
    password: hashedPassword,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Please fill in all fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
