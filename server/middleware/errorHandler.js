const info = require("../utils/info");

const errorHandler = (error, _req, res, next) => {
  info(error);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token missing or invalid." });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired." });
  } else if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid userId." });
  }
  console.error(error);
  // forwards to default express error handler
  next(error);
};

module.exports = errorHandler;
