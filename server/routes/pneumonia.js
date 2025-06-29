const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { execFile } = require('child_process');
const fs = require('fs');
const PneumoniaPrediction = require('../models/pneumoniaPrediction');

const upload = multer({ dest: 'uploads/' });

router.post('/predict-pneumonia', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ result: 'No file uploaded' });
  }

  const imagePath = req.file.path;
  const pythonScriptPath = path.join(__dirname, '..', '..', 'xray_model', 'predict_pneumonia.py');

  execFile('python', [pythonScriptPath, imagePath], (error, stdout, stderr) => {
    fs.unlinkSync(imagePath);
  
    if (error) {
      console.error('Python error:', stderr);
      return res.status(500).json({ result: 'Error during prediction' });
    }
  
    const predictionResult = stdout.trim().includes('Pneumonia') ? 'Pneumonia' : 'Normal';
  
    // Save to MongoDB in an async function
    (async () => {
      try {
        await PneumoniaPrediction.create({
          fileName: req.file.originalname,
          prediction: predictionResult,
        });
      } catch (dbError) {
        console.error('MongoDB save error:', dbError);
      }
  
      return res.json({ result: predictionResult });
    })();
  });
});

module.exports = router;
