const express = require("express");
require('dotenv').config();


const connectDB = require("./config/db");
connectDB();

const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require('./routes/auth');


const app = express();
app.use(express.json()); // Middleware to parse JSON(req.body)
app.use(cors());
//app.use(bodyParser.json());
const predictRoute = require("./routes/predict");
// app.use("/api/predict", predictRoute);
app.use("/predict", predictRoute);
const historyRoutes = require("./routes/history");
app.use("/history", historyRoutes);

app.use('/api/auth', authRoutes);

const pneumoniaRoute = require('./routes/pneumonia');
app.use('/api', pneumoniaRoute);


const diabetesRoutes = require('./routes/diabetes');
app.use('/api', diabetesRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
