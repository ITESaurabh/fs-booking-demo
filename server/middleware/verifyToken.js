const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  token = authorization.substring(7, authorization.length);

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    // console.log(token);
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log("DEC", decoded);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      success: false,
      message: "Token is not valid",
    });
  }
  return next();
};

module.exports = verifyToken;
