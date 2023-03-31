const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

router
  .route("/")
  .get(offerController.getAllOffers)
  .post(offerController.createOffer);
  router
  .route("/:id")
  .patch(offerController.updateOffer)
  .delete(offerController.deleteOffer);

module.exports = router;
