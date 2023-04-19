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
exports.acceptOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, {status: 'accepted'}, {
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

exports.rejectOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, {status: 'rejected'}, {
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



