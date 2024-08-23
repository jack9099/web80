import { Router } from "express";
import userController from "../controllers/user.controller.js";
import userMiddleWare from "../middlewares/user.middleware.js";
import authMiddleWare from "../middlewares/auth.middleware.js";

const UserRouter = Router();

// Register
UserRouter.post('/register', userMiddleWare.checkMissing, userController.createNewUser);

// Login
UserRouter.post('/login', userMiddleWare.checkMissing, userController.Login);

// GET user profile
UserRouter.get('/:id', userController.getUserProfile);

// PUT user
UserRouter.put('', authMiddleWare.verifyApiKey, userMiddleWare.checkMissing, userController.putUser);

// DATELE user
UserRouter.delete('', authMiddleWare.verifyApiKey, userController.deleteUser);
export default UserRouter