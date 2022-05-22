import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../schema/user";

export default async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, userObj, password } = req.body;

  try {
    if (!process.env.SALT) {
      throw new Error("SALT is not defined");
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );
    if (!hashedPassword) {
      throw new Error("Hashing failed");
    }
    userObj.name = name;
    console.log("hashedPassword:", hashedPassword);
    userObj.password = hashedPassword;
    userObj.channelName = uuidv4();
    const userRes = await User.create(userObj);
    const userData = userRes.toJSON();
    delete userData.password;
    const token = jwt.sign(userData, process.env.JWT_API_SECRET, {
      expiresIn: 86400,
    });
    res.status(200).send({
      ...userData,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
};
