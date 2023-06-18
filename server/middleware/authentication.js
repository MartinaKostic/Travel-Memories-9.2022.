const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = payload;
      next();
    } catch (err) {
      return res.send(
        "Verification failed, token not valid, authorization denied"
      );
    }
  } else {
    return res.send("No token");
  }
}
module.exports = auth;
