import { Router } from "express";
import userController from "../controllers/user.controller.js";
import userMiddleWare from "../middlewares/user.middleware.js";

const UserRouter = Router();

// Register
UserRouter.post('/register', userMiddleWare.checkMissing, userController.createNewUser);

// Login
UserRouter.post('/login', userMiddleWare.checkMissing, userController.Login);

export default UserRouter