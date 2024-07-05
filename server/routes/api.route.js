import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authRouter from "./auth.route.js";
const apiRouter = Router();

apiRouter.use("/auth", authRouter);

export default apiRouter;
