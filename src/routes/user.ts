import { Router } from "express";
import { validateEmail, validateMobile } from "../utils";
import { User } from "../schema/user";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, username, password } = req.body;
  const userObj: any = {
    name,
    password,
  };
  if (validateEmail(username)) {
    userObj.email = username;
  } else if (validateMobile(username)) {
    userObj.mobile = username;
  }
  console.log(userObj);
  if (!userObj.email && !userObj.mobile) {
    res.status(400).send("Invalid username");
    return;
  }
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
    console.log("hashedPassword:", hashedPassword);
    userObj.password = hashedPassword;
    const userRes = await User.create(userObj);
    const userData = userRes.toJSON();
    delete userData.password;
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userObj: any = {};
  if (validateEmail(username)) {
    userObj.email = username;
  } else if (validateMobile(username)) {
    userObj.mobile = username;
  }

  if (!userObj.email && !userObj.mobile) {
    res.status(400).send("Invalid username");
  }
  try {
    const userRes = await User.findOne(userObj);
    if (userRes) {
      const match = await bcrypt.compare(password, userRes.password);
      if (match) {
        const userData = userRes.toJSON();
        delete userData.password;
        res.status(200).send(userData);
      } else {
        res.status(200).send({
          error: "Invalid password",
        });
      }
    } else {
      res.status(400).send("Invalid username or password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post("/available-username", async (req, res) => {
  const { username } = req.body;
  const userObj: any = {};
  if (validateEmail(username)) {
    userObj.email = username;
  } else if (validateMobile(username)) {
    userObj.mobile = username;
  }

  if (!userObj.email && !userObj.mobile) {
    res.status(400).send({
      error: "Invalid username",
      isAvailable: false,
    });
  }
  try {
    const userRes = await User.findOne(userObj);
    if (userRes) {
      res.status(200).send({
        isAvailable: false,
        data: userRes,
      });
    } else {
      res.status(400).send({
        isAvailable: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
      isAvailable: false,
    });
  }
});

export default router;
