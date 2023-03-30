const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

router
  .route("/")
  .get(offerController.getAllOffers)
  .post(offerController.createOffer);

module.exports = router;
