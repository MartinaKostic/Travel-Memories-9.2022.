require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.users;
const Photo = db.photos;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const info = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = await User.create(info);

    const photoInfo = {
      name: "default.jpg",
      userid: newUser.dataValues.id,
    };
    await Photo.create(photoInfo);

    const accessToken = jwt.sign(
      newUser.toJSON(),
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({
      accessToken: accessToken,
      message: "Success",
      user: newUser,
    });
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
