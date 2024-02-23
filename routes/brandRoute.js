const express = require("express");
const router = express.Router();
const addBrand = require("../controller/brand");

router.route("/addbrand").post(addBrand);
module.exports = router;
