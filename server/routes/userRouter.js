const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
} = require("../controllers/userController");

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

module.exports = userRouter;
