const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A project must have a title."],
  },
  description: {
    type: String,
    required: [true, "A project must have a title."],
  },
  client: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A project must belong to client ID."],
  },
  minBudget: {
    type: Number,
    required: [true, "A project must have a minimum budget."],
    min: [5, "minimum Budget must be above 5.0"],
  },
  maxBudget: {
    type: Number,
    required: [true, "A project must have a maximum budget."],
  },
  deliveryTime: {
    type: Number,
    required: [true, "A project must have a delivery time."],
    min: [1, " delivery time must be above 1.0 day"],
  },
  category: {
    type: String,
    enum: [
      "Business and advisory services",
      "Programming, developing websites and applications",
      "Engineering, architecture and interior design",
      "Design, video and audio",
      "Email marketing and sales",
      "Writing, editing, translation and languages",
      " Support, help and data entry",
      "Distance training and education",
    ],
    required: [true, "A project must have a category."],
  },
  createdAt: Date,
});
projectSchema.pre(/^find/, function (next) {
  this.populate({ path: "client", select: "-__v " });

  next();
});
projectSchema.pre("save", function (next) {
  this.createdAt = Date.now();
  next();
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
