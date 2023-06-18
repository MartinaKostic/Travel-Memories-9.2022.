const express = require("express");
const multer = require("multer");
const db = require("../models");
const Post = db.posts;
const User = db.users;
const Postphoto = db.postphotos;
const UserPhotos = db.photos;
const router = express.Router();
const auth = require("../middleware/authentication");

router.get("/", async (req, res) => {
  const allUsersAndPosts = await User.findAll({
    where: {},
    include: [
      {
        model: UserPhotos,
        where: {},
      },
      {
        model: Post,
        include: [Postphoto],
        where: {},
      },
    ],
  });

  res.send(allUsersAndPosts);
});

module.exports = router;
