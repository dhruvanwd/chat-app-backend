import { NextFunction, Request, Response } from "express";
import { validateMobile } from "../../utils";
import { validateEmail } from "../../utils";

export const validateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.body;
  const userObj: any = {};
  if (validateEmail(username)) {
    userObj.email = username;
  } else if (validateMobile(username)) {
    userObj.mobile = username;
  }

  if (!userObj.email && !userObj.mobile) {
    res.status(404).send({
      errorMessage: "Invalid username",
    });
    return;
  } else {
    req.body.userObj = userObj;
    next();
  }
};
