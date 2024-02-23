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
} = require("../controller/loginRegister");

/**Post method **/
router.route("/login").post(login); //login user
router.route("/authenticate").post(); //authenticate user
router.route("/register").post(register); //register user

/** Get method**/

router.route("/username/:username").get(getUser); //get user
router.route("/generateOTP").get(generateOTP); // generate random otp
router.route("/verifyOTP").get(verifyOTP); // verify otp
router.route("/createResetSession").get(createResetSession); // reset all the variable

/** PUT method **/

router.route("/resetPassword").put(resetPassword); //use to reset passeword

module.exports = router;
