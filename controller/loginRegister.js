/** post method **/
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/influenceRoute");

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
  res.send("getUser");
};

const generateOTP = async (req, res) => {
  res.send("generateOTP");
};

const verifyOTP = async (req, res) => {
  res.send("verifyOTP");
};

const createResetSession = async (req, res) => {
  res.send("createResetSession");
};

const resetPassword = async (req, res) => {
  res.send("resetPassword");
};

module.exports = {
  login,
  register,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
};
