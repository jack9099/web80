import { Router } from "express";
import personalInfoController from "../controllers/personal-info.controller.js";
import personalInfoMiddleWare from "../middlewares/personal-info.middleware.js";
import authMiddleWare from "../middlewares/auth.middleware.js"

const PersonalInfoRouter = Router();

PersonalInfoRouter.post('', authMiddleWare.verifyApiKey, personalInfoMiddleWare.createNewPersonalInfo, personalInfoController.createNewPersonalInfo);

export default PersonalInfoRouter