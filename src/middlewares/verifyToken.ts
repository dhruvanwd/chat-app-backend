import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../schema/user";

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (
    req.headers &&
    authHeader &&
    authHeader.split(" ")[0] === "Bearer"
  ) {
    const decode: any = jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_API_SECRET
    );
    req.user = decode;
    next();
  } else {
    console.log("jwt verify error");
    req.user = undefined;
    res.status(401).send({
      message: "Invalid token",
      error: true,
    });
  }
};
