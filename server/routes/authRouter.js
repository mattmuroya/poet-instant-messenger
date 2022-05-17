const authRouter = require("express").Router();
const { validateToken } = require("../controllers/authController");

authRouter.post("/", validateToken);

module.exports = authRouter;
