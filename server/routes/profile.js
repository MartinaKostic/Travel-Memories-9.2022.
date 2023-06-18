const express = require("express");
const multer = require("multer");
const db = require("../models");
const User = db.users;
const UserPhotos = db.photos;
const Post = db.posts;
const Postphoto = db.Postphoto;
const router = express.Router();
const auth = require("../middleware/authentication");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({
    where: {
      id: id,
    },
    include: { all: true, nested: true },
  });

  return res.send({ user });
});

module.exports = router;
