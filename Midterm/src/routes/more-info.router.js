import { Router } from "express";
import moreInfoController from "../controllers/more-info.controller.js";
import moreInfoMiddleWare from "../middlewares/more-info.middleware.js";
import authMiddleWare from "../middlewares/auth.middleware.js"

const MoreInfoRouter = Router();

MoreInfoRouter.post('', authMiddleWare.verifyApiKey, moreInfoMiddleWare.createNewMoreInfo, moreInfoController.createNewMoreInfo);

export default MoreInfoRouter;