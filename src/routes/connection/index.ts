import { Router } from "express";

import addConnection from "./create";
import fetchConnection from "./fetchConnection";
import updateConnection from "./update";

const router = Router();

router.get("/connections", fetchConnection);
router.post("/add-connection", addConnection);
router.put("/update-connection/:_id", updateConnection);

export default router;
