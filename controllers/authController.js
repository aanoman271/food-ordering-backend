import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const jwtToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatchPassword);
    // console.log("Input Password:", password);
    // console.log("DB Password:", user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwtToken(user._id, user.role);

    res.status(200).json({
      message: "User login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// register api
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: `${email} already exists`,
      });
    }

    // Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPass,
      phone,
      role: role || "customer",
    });
    console.log("Saved User:", newUser);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
