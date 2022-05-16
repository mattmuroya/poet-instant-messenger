const errorHandler = (error, _req, res, next) => {
  console.log(error);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token missing or invalid." });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token Expired" });
  } else {
    console.log("lmao idk");
  }

  // forwards to default express error handler
  next(error);
};

module.exports = errorHandler;
