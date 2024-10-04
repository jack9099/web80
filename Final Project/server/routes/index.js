import { Router } from "express";
import AuthRouter from "./auth.route.js";

const RootRouterV1 = Router();

RootRouterV1.use("", AuthRouter);

export { RootRouterV1 };
