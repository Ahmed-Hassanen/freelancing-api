const Offer = require("../models/offerModel");

exports.createOffer = async (req, res) => {
  try {
    const newOffer = await Offer.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        offer: newOffer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
