import { Request, Response } from "express";
import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  const { userObj } = req.body;
  try {
    const userRes = await User.findOne(userObj);
    if (userRes) {
      res.status(200).send({
        otpGenerated: true,
      });
    } else {
      res.status(200).send({
        otpGenerated: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      otpGenerated: false,
    });
  }
};
