import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import info from "./utils/info";
import reqLogger from "./middleware/reqLogger";
import tokenExtractor from "./middleware/tokenExtractor";

import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import catchHandler from "./middleware/catchHandler";
import errorHandler from "./middleware/errorHandler";

const app = express();

(async () => {
  try {
    await mongoose.connect(config.DB);
    info("MongoDB connected.");
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error.";
    info("MongoDB connection error: ", errorMessage);
  }
})();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

// REQUEST PROCESSORS
app.use(express.json());
app.use(reqLogger);
app.use(tokenExtractor);

// REQUEST ROUTERS
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// CATCH HANDLER
app.use(catchHandler);

// ERROR HANDLER
app.use(errorHandler);

export default app;
