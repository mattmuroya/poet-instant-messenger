import info from "../utils/info";

export default (req, _res, next) => {
  info("---");
  info("Time:   ", new Date().toLocaleTimeString());
  info("Method: ", req.method);
  info("Path:   ", req.path);
  info("Body:   ", req.body, "\n");
  next();
};
