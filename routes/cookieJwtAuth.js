const jwt = require("jsonwebtoken");

exports.cookieJWTAuth = (req, res, next) => {
  const token = req.headers.access_token;
  try {
    const user = jwt.verify(token, process.env.SECRET);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
