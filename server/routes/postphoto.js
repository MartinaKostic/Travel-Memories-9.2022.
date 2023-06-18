const express = require("express");
const router = express.Router();
const db = require("../models");
const auth = require("../middleware/authentication");
const User = db.users;
const Postphoto = db.postphotos;
const Post = db.posts;

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const pictures = await Postphoto.findAll({
    where: {
      userid: id,
    },
  }).then((pictures) => {
    console.log("PICTURES", pictures);
    return res.send(pictures);
  });
});

module.exports = router;
