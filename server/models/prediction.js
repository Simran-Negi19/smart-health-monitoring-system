const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  features: {
    type: [Number],
    required: true,
  },
  prediction: {
    type: Number,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prediction", predictionSchema);
