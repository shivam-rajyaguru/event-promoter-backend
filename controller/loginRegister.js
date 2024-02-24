/** post method **/
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const verifyUser = async (req, res, next) => {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;

    let exist = await User.findOne({ email });
    if (!exist) {
      return res.status(404).json({ error: "Can't find User!" });
    }
    next();
    return;
  } catch (error) {
    return res.status(404).json({ error: "Authentication Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).json({ error: "Password does't match" });
            }
            const token = jwt.sign(
              {
                userId: user._id,
                email: user.email,
              },
              "hellothisismysecretkey",
              { expiresIn: "24h" }
            );

            return res.status(200).json({
              msg: "login succesfully",
              email: user.email,
              token,
            });
          })
          .catch((error) => {
            return res.status(500).json({ error: "Password do not match" });
          });
      })
      .catch((error) => {
        return res.status(500).json({ error: "Email not found" });
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;
    const existingUser = new Promise((resolve, reject) => {
      User.findOne({ username })
        .then(() => resolve())
        .catch((err) => reject(new Error(err)));
    });

    const existingEmail = new Promise((resolve, reject) => {
      User.findOne({ username })
        .then(() => resolve())
        .catch((err) => reject(new Error(err)))
        .catch((email) => reject({ err: "Pleade use unique Email" }));
    });

    Promise.all([existingUser, existingEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new User({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });
              user
                .save()
                .then((result) =>
                  res.status(201).json({ msg: "registered succefully" })
                )
                .catch((error) => {
                  res.status(500).json({ error });
                });
            })
            .catch((error) => {
              return res
                .status(500)
                .json({ error: "Enabled to hased password" });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

/** get method **/

const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) return res.status(500).json({ error: "Invalid username" });
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(501).json({ error: "Couldn't find the user" });
    }

    /*remove password from user*/
    /* mongoose return unnecesary data so convert in to json**/

    const { password, ...rest } = Object.assign({}, user.toJSON());
    return res.status(200).json(rest);
  } catch (error) {
    res.status(404).json({ error: "Can not find user data" });
  }
};

const generateOTP = async (req, res) => {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return res.status(201).json({ code: req.app.locals.OTP });
};

const verifyOTP = async (req, res) => {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).json({ msg: "Verify successfully" });
  }
  return res.status(404).json({ error: "Invalid OTP" });
};

const createResetSession = async (req, res) => {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).json({ msg: "access granted" });
  }
  return res.status(404).json({ err: "Session expired" });
};

const updateUser = async (req, res) => {
  // const id = req.query.id;
  const { userId } = req.user;
  try {
    const body = req.body;
    const updateUser = await User.updateOne({ _id: userId }, body);
    return res.status(201).json({ msg: "Record updated" });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const resetPassword = async (req, res) => {
  if (!req.app.locals.resetSession)
    return res.status(404).json({ error: "Session expired" });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const hasedPasssword = await bcrypt.hash(password, 10);
    const newUser = await User.updateOne(
      { email: user.email },
      { password: hasedPasssword }
    );
    req.app.locals.resetSession = false;
    return res.status(201).json({ msg: "Record updated" });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

module.exports = {
  login,
  register,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
  verifyUser,
  updateUser,
};
