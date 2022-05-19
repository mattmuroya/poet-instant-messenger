import { getSavedUserFromReqBody } from "./utils/controllerUtils";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, username } = getSavedUserFromReqBody(req.body);

    let token = "";
    if (req.token) token = req.token;

    let SECRET = "";
    if (process.env.JWT_SECRET) SECRET = process.env.JWT_SECRET;

    jwt.verify(token, SECRET);
    const newToken = jwt.sign(
      { id: id.toString(), username: username },
      SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.json({
      id,
      username,
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
};
