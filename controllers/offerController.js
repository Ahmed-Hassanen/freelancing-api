const Offer = require("../models/offerModel");

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    const filters = req.query;
    const filteredOffers = offers.filter((offer) => {
      let isValid = true;
      for (key in filters) {
        isValid = isValid && offer[key] == filters[key];
      }
      return isValid;
    });
    res.status(201).json({
      status: "success",
      length: filteredOffers.length,
      data: filteredOffers,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getOneOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        status: "fail",
        message: "ofer not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        offer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
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
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!offer) {
      return res.status(404).json({
        status: "fail",
        message: "Offer not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        offer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({
        status: "fail",
        message: "Offer not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Offer deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
