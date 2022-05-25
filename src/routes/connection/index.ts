import { Router } from "express";
import { validateUsername } from "../user/validateUsername";

import addConnection from "./create";
import createGroup from "./createGroup";
import fetchConnection from "./fetchConnection";
import updateConnection from "./update";

const router = Router();



router.post("/group", createGroup)
router.get("/connections", fetchConnection);
router.post("/connection", validateUsername, addConnection);
router.put("/connection/:_id", updateConnection);

export default router;
