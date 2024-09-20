import { Router } from "express";
import UserRouter from "./user.router.js";

const RootRouterV1 = Router();

RootRouterV1.use("", UserRouter);

export { RootRouterV1 };
