const userRouter = require("express").Router();
const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  loginUser,
  registerUser,
} = require("../controllers/userController");

userRouter.get("/", getAllUsers);
userRouter.get("/current", getCurrentUser);
userRouter.get("/:id", getUserById);
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);

module.exports = userRouter;
