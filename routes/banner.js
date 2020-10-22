let express = require("express");
let upload = require("../controllers/uploadController");
let bannerController = require("../controllers/bannerController");
let router = express.Router();

router.post("/", upload.fileUploads, upload.handleFileUpload);

router.get("/location", bannerController.getLocation);

router.get("/", bannerController.getBanners);

module.exports = router;
