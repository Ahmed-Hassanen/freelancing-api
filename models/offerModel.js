const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  letter: {
    type: String,
    required: [true, "An Offer must have a letter"],
  },
  freelancerId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "An Offer must have a Freelancer"],
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: [true, "An Offer must have a Project"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deliveryTime: {
    type: Date,
    required: [true, "An Offer must have a a delivery time"],
  },
  amountOfBid: {
    type: Number,
    required: [true, "An Offer must have a bid amount"],
  },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;