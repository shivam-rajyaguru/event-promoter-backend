const express = require("express");
const router = express.Router();
const addBrand = require("../controller/brand");

router.route("/addBrand").post(addBrand);
// router.route("/addBrandSecond").post(addBrandSecond);

module.exports = router;
