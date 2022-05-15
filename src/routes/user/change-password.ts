import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  const { userObj, password } = req.body;
  try {
    const userRes = await User.findOne(userObj);
    if (userRes) {
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT)
      );
      if (!hashedPassword) {
        throw new Error("Hashing failed");
      }
      userRes.password = hashedPassword;
      await userRes.save();
      res.status(200).send({
        passwordChanged: true,
      });
    } else {
      res.status(200).send({
        passwordChanged: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
};
