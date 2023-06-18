const express = require("express");
const multer = require("multer");
const db = require("../models");
const Photo = db.photos;
const router = express.Router();
const fs = require("fs");
const auth = require("../middleware/authentication");

const upload = multer({
  dest: "./uploads",
}); /*uploads will be saved here*/

/*picture is name of the key that contains the file*/
router.post("/", auth, upload.single("picture"), async (req, res) => {
  console.log(req.user.id);
  //podijelit array filetype (na image i npr jpg) te uzet jpg
  let fileType = req.file.mimetype.split("/")[1];
  //novo ime datoteke
  let newFileName = req.file.filename + Date.now() + "." + fileType;
  //promjena imena datoteke koju smo uploadali
  const info = {
    name: newFileName,
    userid: req.user.id,
  };

  fs.rename(
    `./uploads/${req.file.filename}`,
    `./uploads/${newFileName}`,
    function () {
      console.log("callback");
    }
  );
  const oldPhoto = await Photo.findOne({ where: { userid: req.user.id } });
  if (oldPhoto) await oldPhoto.destroy();

  const savedPhotoName = Photo.create(info);
  res.send("200");
});

module.exports = router;
