import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (token == null) {
    res.status(400).json({ message: "Token not found" });
    return;
  }
  try {
    const verified = Jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "invalid token" });
    return;
  }
};
