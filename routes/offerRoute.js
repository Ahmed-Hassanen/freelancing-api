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
  .delete(offerController.deleteOffer)
  .get(offerController.getOneOffer);
router.patch("/:id/accept", offerController.acceptOffer);
router.patch("/:id/reject", offerController.rejectOffer);
module.exports = router;
