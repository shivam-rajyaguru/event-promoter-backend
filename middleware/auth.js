const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodetoken = jwt.verify(token, "hellothisismysecretkey");

    req.user = decodetoken;
    next();
  } catch (error) {
    return res.status(501).json({ error });
  }
};

const localvariable = (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
module.exports = { auth, localvariable };
