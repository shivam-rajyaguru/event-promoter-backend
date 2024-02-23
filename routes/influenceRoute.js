const express = require("express");
const router = express.Router();
const { getAllInfluencer, addInfluence } = require("../controller/inflencer");

router.route("/").get(getAllInfluencer);
router.route("/addinfluence").post(addInfluence);

module.exports = router;
