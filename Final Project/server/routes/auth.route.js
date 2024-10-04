import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const AuthRouter = Router();

// Register
AuthRouter.post("/sign-up", authController.createNewUser);
// Login
AuthRouter.post("/sign-in", authController.Login);
// Forgot Password
AuthRouter.post("/forgot-password", authController.forgotPassword);
// Reset Password
AuthRouter.post("/reset-password/:token", authController.resetPassword);

export default AuthRouter;
