import { Router } from "express";
const multer = require("multer");

const router = Router();

const storage = multer.diskStorage({
  destination: function (req: any, file: File, cb: Function) {
    cb(null, "./public");
  },
  filename: function (req: any, file: any, cb: Function) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    const fileNameChunk = file.originalname.split(".");
    const fileExt = fileNameChunk.pop();
    cb(null, fileNameChunk.join("") + "_" + uniqueSuffix + "." + fileExt);
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
      fileData: req.file
    });
  }
});

export default router;
