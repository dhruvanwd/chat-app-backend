import { Router } from "express";
import { validateEmail, validateMobile } from "../utils";
import { User } from "../schema/user";

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
    const userRes = await User.create(userObj);
    res.status(200).send(userRes);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userObj: any = {
    password,
  };
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
      res.status(200).send(userRes);
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

export default router;
