const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decodedToken.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    res.json({ newToken });
  } catch (error) {
    next(error);
  }
};
