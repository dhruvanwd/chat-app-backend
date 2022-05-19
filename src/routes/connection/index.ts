import { Router } from "express";
import addContact from "./create";
import updateContact from "./update";

const router = Router();

router.post("/add-contact", addContact);
router.put("/update-contact/:_id", updateContact);

export default router;
