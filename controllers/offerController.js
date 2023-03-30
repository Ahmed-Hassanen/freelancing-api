const Offer = require("../models/offerModel");

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({
      status: "success",
      results: offers.length,
      data: {
        offers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

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
