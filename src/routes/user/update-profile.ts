import { Request, Response } from "express";
import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  const { _id } = req.params;
  const updateInfo = req.body;
  const userRes = await User.findOne({
    _id,
  });
  console.log(userRes);

  if (!userRes) {
    res.status(400).send({
      error: "User not found",
    });
  } else {
    const updatedUser = await User.updateOne({ _id }, updateInfo, {
      new: true,
    });
    res.status(200).send(updatedUser);
  }
};
