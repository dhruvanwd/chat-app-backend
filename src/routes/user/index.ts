import { Router } from "express";
import { validateEmail, validateMobile } from "../../utils";
import { User } from "../../schema/user";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { validateUsername } from "./validateUsername";

const router = Router();

router.post("/signup", validateUsername, async (req, res) => {
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
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: error.message,
    });
  }
});

router.post("/login", validateUsername, async (req, res) => {
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
});

router.post("/available-username", validateUsername, async (req, res) => {
  const { userObj } = req.body;

  try {
    const userRes = await User.findOne(userObj);
    if (userRes) {
      res.status(200).send({
        isAvailable: false,
      });
    } else {
      res.status(200).send({
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

router.post("/gen-otp", validateUsername, async (req, res) => {
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
});

router.post("/change-password", validateUsername, async (req, res) => {
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
});

router.put("/update-profile/:_id", async (req, res) => {
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
});

export default router;
