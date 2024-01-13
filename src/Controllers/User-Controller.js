import User from "../Models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/AuthToken.js";
export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const securePassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
    });
    res.clearCookie("auth-token", {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        signed: true,
        expires: new Date(Date.now() + 7),
      });
  
      const token = generateToken(user._id, user.email);
      res.cookie("auth-token", token, {
        httpOnly: true,
        path: "/",
        domain: "localhost",
        signed: true,
        expires: new Date(Date.now() + 7),
      });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      res.status(404).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    res.clearCookie("auth-token", {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
      expires: new Date(Date.now() + 7),
    });

    const token = generateToken(user._id, user.email);
    res.cookie("auth-token", token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
      expires: new Date(Date.now() + 7),
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
