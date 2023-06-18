//use koristi middleware
//ako zelis sve dopustit mos stavit "*"
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const Sequelize = require("sequelize");
const Config = require("./config/database_config");
const db = require("./models");

const signupRoute = require("./routes/signup");
const signinRoute = require("./routes/signin");
const galleryRoute = require("./routes/gallery");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");
const postphotosRoute = require("./routes/postphoto");
const feedRoute = require("./routes/feed");

app.use(cors());
app.use(express.json());
//napravi uploads staticnim folderom- doda endpoint svemu u folderu-- mos onda na frontendu koristit
app.use("/uploads", express.static("uploads"));
//routes
app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/uploadFile", galleryRoute);
app.use("/user", profileRoute);
app.use("/post", postRoute);
app.use("/postphotos", postphotosRoute);
app.use("/feed", feedRoute);

//SEQUELIZE
db.sequelize.sync();

async function dbconnect() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
dbconnect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
