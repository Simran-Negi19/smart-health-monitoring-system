// src/pages/PredictionHistory.jsx
import React, { useEffect, useState } from "react";
import "./History.css"; // optional styling

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => setPredictions(data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div className="history-container">
      <h2 className="text-gray-800 poppins-bold text-center mb-4 mt-4 text-2xl">Prediction History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Prediction</th>
            <th>Age</th>
            <th>Sex</th>
            {/* Add more columns if needed */}
          </tr>
        </thead>
        <tbody>
          {predictions.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.prediction}</td>
              <td>{item.features[0]}</td>
              <td>{item.features[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionHistory;
