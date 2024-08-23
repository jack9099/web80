import { Router } from "express";
import jobInfoController from "../controllers/job-info.controller.js";
import jobInfoMiddleWare from "../middlewares/job-info.middleware.js";
import authMiddleWare from "../middlewares/auth.middleware.js"

const JobInfoRouter = Router();

JobInfoRouter.post('', authMiddleWare.verifyApiKey, jobInfoMiddleWare.createNewJobInfo, jobInfoController.createNewJobInfo);

export default JobInfoRouter;