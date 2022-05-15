import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  const { password, userObj } = req.body;

  try {
    const userRes = await User.findOne(userObj);
    if (userRes) {
      const match = await bcrypt.compare(password, userRes.password);
      if (match) {
        const userData = userRes.toJSON();
        delete userData.password;
        res.status(200).send(userData);
      } else {
        res.status(404).send({
          error: "Invalid password",
        });
      }
    } else {
      res.status(400).send({
        error: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
};
