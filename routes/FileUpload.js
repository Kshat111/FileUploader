// define all the API routes here
const express = require("express");
const router = express.Router();

// import all the handlers from controllers
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload");

// route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;