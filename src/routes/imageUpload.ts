import { Router } from "express";
const multer = require("multer");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req: any, file: File, cb: Function) {
    cb(null, "./public");
  },
  filename: function (req: any, file: any, cb: Function) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
    });
  }
});

export default router;
