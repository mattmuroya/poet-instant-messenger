const info = require("../utils/info");

const reqLogger = (req, _res, next) => {
  info("---");
  info("Time:   ", new Date().toLocaleTimeString());
  info("Method: ", req.method);
  info("Path:   ", req.path);
  info("Body:   ", req.body, "\n");
  next();
};

module.exports = reqLogger;
