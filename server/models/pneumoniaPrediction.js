const mongoose = require('mongoose');

const PneumoniaPredictionSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  prediction: {
    type: String,
    enum: ['Pneumonia', 'Normal'],
    required: true
  },
  predictedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PneumoniaPrediction', PneumoniaPredictionSchema);
