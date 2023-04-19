const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.protect, offerController.getAllOffers)
  .post(authController.protect, offerController.createOffer);
router
  .route("/:id")
  .patch(authController.protect, offerController.updateOffer)
  .delete(authController.protect, offerController.deleteOffer)
  .get(authController.protect, offerController.getOneOffer);
router
  .route("/:id/accept")
  .patch(authController.protect, offerController.acceptOffer);
router
  .route("/:id/reject")
  .patch(authController.protect, offerController.rejectOffer);
module.exports = router;
