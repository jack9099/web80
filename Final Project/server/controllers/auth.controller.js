import UserModel from "../models/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  hashPassword,
  comparePassword,
} from "../middlewares/password.middleware.js";
import { generateToken } from "../middlewares/token.middleware.js";

dotenv.config();

const authController = {
  // Register
  createNewUser: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName) {
        return res.status(400).json({
          error: true,
          message: "User name is required!",
        });
      }
      if (!email) {
        return res.status(400).json({
          error: true,
          message: "Email is required!",
        });
      }
      if (!password) {
        return res.status(400).json({
          error: true,
          message: "Password is required!",
        });
      }
      const isUser = await UserModel.findOne({ email: email });
      if (isUser) {
        return res.status(400).json({
          error: true,
          message: "User already exist!",
        });
      }
      const hashedPassword = await hashPassword(password);

      const createdNewUser = await UserModel.create({
        email,
        password: hashedPassword,
        userName,
      });
      res.status(201).json({
        message: "Successfully created new user!",
        data: createdNewUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Login
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required!" });
      }

      const userInfo = await UserModel.findOne({ email: email });

      if (!userInfo) {
        return res
          .status(400)
          .json({ message: "Email or password is invalid!" });
      }
      const comparedPassword = await comparePassword(
        password,
        userInfo.password
      );

      if (!comparedPassword) {
        return res
          .status(400)
          .json({ message: "Email or password is invalid!" });
      }

      const token = await generateToken(userInfo._id);
      return res.json({
        error: false,
        message: "Login successful!",
        email,
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Forgot Password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required!" });
      }

      const checkUser = await UserModel.findOne({ email });

      if (!checkUser) {
        return res
          .status(400)
          .json({ message: "User not found please register" });
      }

      const token = jwt.sign({ email }, process.env.SECRECTKEY, {
        expiresIn: "24h",
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: process.env.MY_GMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      const receiver = {
        from: "nguyentran9099@gmail.com",
        to: email,
        subject: "Password Reset Request",
        text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`,
      };

      await transporter.sendMail(receiver);

      return res.status(200).json({
        message: "Password reset link send successfully on your gmail account",
        token: token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Reset password
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ message: "Please enter password" });
      }

      const decode = jwt.verify(token, process.env.SECRECTKEY);

      const user = await UserModel.findOne({ email: decode.email });

      const newhashPassword = await hashPassword(password);

      user.password = newhashPassword;
      await user.save();

      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};

export default authController;
