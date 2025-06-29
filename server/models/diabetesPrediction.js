const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  prediction: String,
  inputData: [Number], // Stores the 8 diabetes inputs
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('DiabetesPrediction', predictionSchema);
