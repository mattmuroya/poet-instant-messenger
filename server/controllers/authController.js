const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
  try {
    const savedUser = req.body;
    // will execute catch if invalid/expired
    jwt.verify(req.token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: savedUser.id.toString(), username: savedUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.json({
      ...savedUser,
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
};
