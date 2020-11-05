let express = require("express");
let locationController = require("../controllers/locationController");
let router = express.Router();

router.get("/", locationController.getLocation);

module.exports = router;
