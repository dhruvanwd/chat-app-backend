import { Router } from "express";
import { validateUsername } from "./validateUsername";
import signup from "./signup";
import login from "./login";
import availableUsername from "./available-username";
import genOtp from "./gen-otp";
import changePassword from "./change-password";
import updateProfile from "./update-profile";

const router = Router();

router.post("/signup", validateUsername, signup);

router.post("/login", validateUsername, login);

router.post("/available-username", validateUsername, availableUsername);

router.post("/gen-otp", validateUsername, genOtp);

router.post("/change-password", validateUsername, changePassword);

router.put("/update-profile/:_id", updateProfile);

export default router;
