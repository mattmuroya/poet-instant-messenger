import express from "express";
import { validateToken } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/", validateToken);

export default authRouter;
