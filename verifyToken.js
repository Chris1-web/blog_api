const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  // check if header has authorization with correct token
  // get token from header
  const { authorization } = req.headers;
  if (authorization !== undefined) {
    const bearerToken = authorization.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, userData) => {
      if (err) {
        res.status(403).json({ err });
      } else {
        // store user in req.user to be accessible to route
        const user = {
          _id: userData._id,
          username: userData.username,
          blog: userData.blog,
        };
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
}

module.exports = verifyToken;
