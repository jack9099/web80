import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userController = {
  // Register
  createNewUser: async (req, res) => {
    try {
      const { email, password, userName } = req.body;
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          message: "User already exists!",
          data: null,
        });
      }

      // Hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create new user
      const createdNewUser = await UserModel.create({
        email,
        password: hashedPassword,
        userName,
      });
      res.status(201).send({
        message: "Successfully created new user!",
        data: createdNewUser,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
    res.end();
  },

  // Login
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user
      const crrUser = await UserModel.findOne({
        email: email,
      });

      // Check if email or password is invalid
      if (!crrUser) throw new Error("Email or password is invalid!");
      const comparedPassword = bcrypt.compareSync(password, crrUser.password);
      if (!comparedPassword) throw new Error("Email or password is invalid!");

      // Create token

      const accessToken = jwt.sign(
        {
          _id: crrUser._id,
          email: crrUser.email,
          userName: crrUser.userName,
        },
        process.env.SECRECTKEY,
        {
          expiresIn: 60 * 50,
        }
      );
      res.status(201).send({
        message: "Login successfully!",
        data: accessToken,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },

  // PUT user
  putUser: async (req, res, next) => {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      if (!accessToken) {
        res.status(400).send({
          message: "Permission denined!",
          data: null,
        });
      } else {
        jwt.verify(accessToken, process.env.SECRECTKEY, (err, decoded) => {
          if (err) {
            res.status(401).send({
              message: err.message,
              data: null,
            });
          } else {
            req.user = decoded;
            return next();
          }
        });
      }
      const user = req.user;
      const { id } = req.params;
      const { userName, password } = req.body;

      if (id !== user._id) throw new Error("Permission denined!");
      const crrUser = await UserModel.findById(id);
      if (userName) {
        crrUser.userName = userName;
      }
      if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        crrUser.password = hashedPassword;
      }
      await crrUser.save();
      res.status(201).send({
        message: "Update successfully!",
        data: "",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default userController;
