const express = require("express");
const router = express.Router();
const db = require("../models");
const fs = require("fs");
const auth = require("../middleware/authentication");
const Post = db.posts;
const Postphoto = db.postphotos;
const multer = require("multer");

const upload = multer({
  dest: "./uploads",
});

router.post("/", auth, upload.array("pictures"), async (req, res) => {
  console.log("post", req.body);
  console.log("files", req.files);

  const postinfo = {
    location: req.body.location,
    title: req.body.title,
    description: req.body.description,
    lat: req.body.lat,
    lng: req.body.lng,
    userid: req.user.id,
    isprivate: req.body.isprivate,
  };

  const PostInfo = await Post.create(postinfo);

  console.log("postinfo:", PostInfo.dataValues.id);
  const postId = PostInfo.dataValues.id;
  const isPrivate = PostInfo.dataValues.isprivate;

  for (let i = 0; i < req.files.length; i++) {
    let fileType = req.files[i].mimetype.split("/");
    let newFileName = req.files[i].filename + Date.now() + "." + fileType[1];
    const Photoinfo = {
      name: newFileName,
      userid: req.user.id,
      postid: postId,
      isprivate: isPrivate,
    };
    fs.rename(
      `./uploads/${req.files[i].filename}`,
      `./uploads/${newFileName}`,
      function () {
        console.log("callback function rename");
      }
    );
    const SavePictures = await Postphoto.create(Photoinfo);
  }
  return res.status(200).json({});
});

module.exports = router;
