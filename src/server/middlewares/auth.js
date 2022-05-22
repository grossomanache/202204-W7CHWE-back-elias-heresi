require("dotenv").config();
const jwt = require("jsonwebtoken");
const debug = require("debug")("trapperz:server:middlewares:auth");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization.includes("Bearer")) {
      throw new Error();
    }
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = id;
    debug("User authenticated correctly");
    next();
  } catch {
    const customError = new Error("Invalid authentication");
    customError.statusCode = 401;
    next(customError);
  }
};

module.exports = { auth };
