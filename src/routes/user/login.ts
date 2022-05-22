import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  const { password, userObj } = req.body;

  try {
    const userRes = await User.findOne(userObj, { __v: 0 });
    if (userRes) {
      const match = await bcrypt.compare(password, userRes.password);
      if (match) {
        const userData = userRes.toJSON();
        delete userData.password;
        const token = jwt.sign(
          userData,
          process.env.JWT_API_SECRET,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).send({ ...userData, accessToken: token });
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
