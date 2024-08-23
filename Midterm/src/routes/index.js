import { Router } from "express";
import UserRouter from "./user.router.js";
import PersonalInfoRouter from "./personal-info.router.js";
import MoreInfoRouter from "./more-info.router.js"
import JobInfoRouter from "./job-info.router.js";


const RootRouterV1 = Router();

RootRouterV1.use('', UserRouter);
RootRouterV1.use('/personal-info', PersonalInfoRouter);
RootRouterV1.use('/more-info', MoreInfoRouter);
RootRouterV1.use('/job-info', JobInfoRouter);

export {
    RootRouterV1
}

