const express = require("express");

const { PythonShell } = require("python-shell");
const path = require("path");

const router = express.Router();
const Prediction = require("../models/prediction");

const multer = require('multer');
const { execFile } = require('child_process');
const fs = require('fs');

router.post("/", (req, res) => {
  console.log("Request body keys:", Object.keys(req.body));
  console.log("Received request:", req.body);
  console.log("AGE:", req.body.age);
  //error-->const input = req.body.features;
    // ✅ FIXED: Create input array from individual fields
    const input = [
      req.body.age,
      req.body.sex,
      req.body.cp,
      req.body.trestbps,
      req.body.chol,
      req.body.fbs,
      req.body.restecg,
      req.body.thalach,
      req.body.exang,
      req.body.oldpeak,
      req.body.slope,
      req.body.ca,
      req.body.thal,
    ];

  console.log("Sending to Python:", JSON.stringify(input));

  const options = {
    mode: "text",
    pythonOptions: ["-u"],
    scriptPath: path.join(__dirname, "../../ml_model"),
    args: [JSON.stringify(input)],
  };

  console.log("Running Python script...");

  let output = "";

  const pyshell = new PythonShell("predict.py", options);

  pyshell.on("message", (message) => {
    console.log("Python output:", message);
    output = message;
  });

  pyshell.end((err) => {
    console.log("Python process finished");
    if (err) {
      console.error("Python error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ prediction: output });
    // Save to MongoDB
const newPrediction = new Prediction({
  features: input,
  prediction: parseInt(output),
});

newPrediction.save()
  .then(() => console.log("Prediction saved to database"))
  .catch((err) => console.error("Failed to save prediction:", err));

  });
});

// Setup Multer for image upload
const upload = multer({ dest: 'uploads/' });

router.post('/predict-pneumonia', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  execFile('python', ['xray_model/train.py', imagePath], (error, stdout, stderr) => {
    // Delete the uploaded file after prediction
    fs.unlinkSync(imagePath);

    if (error) {
      console.error('Error running Python script:', stderr);
      return res.status(500).json({ result: 'Error in prediction' });
    }

    return res.json({ result: stdout.trim() });
  });
});

module.exports = router;
