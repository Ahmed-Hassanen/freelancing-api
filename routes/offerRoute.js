const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

router
  .route("/")
  .post(offerController.createOffer);

module.exports = router;
