require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(400).send({ error: "Invalid Credentials" });
  }
  try {
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isCorrectPassword) {
      const accessToken = jwt.sign(
        user.toJSON(), // ne slat lozinku, slat neki unique identifier
        process.env.ACCESS_TOKEN_SECRET
      );
      return res
        .status(200)
        .json({ accessToken: accessToken, message: "Success", user: user });
    } else {
      return res.status(403).send("Not allowed");
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;
