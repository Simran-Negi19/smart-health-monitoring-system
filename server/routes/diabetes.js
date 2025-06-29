const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');
const DiabetesPrediction = require('../models/diabetesPrediction'); // Using common model


router.post('/predict-diabetes', async (req, res) => {
  console.log('Received body:', req.body);
  console.log('➡️ Predict diabetes route hit'); // Add this line

  const inputData = [
    Number(req.body.pregnancies),
    Number(req.body.glucose),
    Number(req.body.bloodPressure),
    Number(req.body.skinThickness),
    Number(req.body.insulin),
    Number(req.body.bmi),
    Number(req.body.diabetesPedigreeFunction),
    Number(req.body.age),
  ]; // Should be an array of 8 numbers
  
  if (!inputData || inputData.length !== 8) {
    return res.status(400).json({ result: 'Invalid input. Provide 8 numerical values.' });
  }

  const path = require('path');
  const pythonScriptPath = path.join(__dirname, '..', '..', 'diab_model', 'predict_diabetes.py');
  


  execFile('python', [pythonScriptPath, ...inputData.map(String)], async (error, stdout, stderr) => {
    if (error) {
      console.error('Python error:', stderr);
      return res.status(500).json({ result: 'Prediction failed.' });
    }

    const predictionResult = stdout.trim();

    // Save prediction to MongoDB
    try {
      await DiabetesPrediction.create({
        prediction: predictionResult,
        inputData
      });
    } catch (dbError) {
      console.error('MongoDB error:', dbError);
    }

    return res.json({ result: predictionResult });
  });
});

module.exports = router;
