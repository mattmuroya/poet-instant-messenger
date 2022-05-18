import info from "../utils/info";

export default (error, _req, res, next) => {
  info(error);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token missing or invalid." });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token Expired" });
  } else if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid userId." });
  }

  // forwards to default express error handler
  next(error);
};
