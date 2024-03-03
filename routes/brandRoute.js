const express = require("express");
const router = express.Router();
const addBrand = require("../controller/brand");

router.route("/addBrand").post(addBrand);

module.exports = router;
