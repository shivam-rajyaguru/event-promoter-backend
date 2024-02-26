const express = require("express");
const router = new express.Router();
const {
  login,
  register,
  getUser,
  generateOTP,
  verifyOTP,
  createResetSession,
  resetPassword,
  verifyUser,
  updateUser,
} = require("../controller/loginRegister");
const { auth, localvariable } = require("../middleware/auth");
const registeredMail = require("../controller/mailer");

/**Post method **/
router.route("/login").post(verifyUser, login); //login user
router.route("/authenticate").post(verifyUser, (req, res) => res.end()); //authenticate user
router.route("/registermail").post(registeredMail); //registerd mail
router.route("/register").post(register); //register user

/** Get method**/

router.route("/username/:email").get(getUser); //get user
router.route("/generateOTP").get(verifyUser, localvariable, generateOTP); // generate random otp
router.route("/verifyOTP").get(verifyOTP); // verify otp
router.route("/createResetSession").get(createResetSession); // reset all the variable

/** PUT method **/
router.route("/updateuser").put(auth, updateUser);
router.route("/resetPassword").put(verifyUser, resetPassword); //use to reset passeword

module.exports = router;
