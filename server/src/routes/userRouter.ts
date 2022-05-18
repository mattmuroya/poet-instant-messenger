import express from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

export default userRouter;
