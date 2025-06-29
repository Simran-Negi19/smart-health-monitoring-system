import React, { useState } from 'react';
import axios from 'axios';

const DiabetesForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/predict-diabetes', {
        pregnancies: Number(formData.pregnancies),
        glucose: Number(formData.glucose),
        bloodPressure: Number(formData.bloodPressure),
        skinThickness: Number(formData.skinThickness),
        insulin: Number(formData.insulin),
        bmi: Number(formData.bmi),
        diabetesPedigreeFunction: Number(formData.diabetesPedigreeFunction),
        age: Number(formData.age)
      });
      onResult(response.data.result);
    } catch (err) {
      console.error(err);
      onResult('Error: Could not get prediction');
    }
  };

  const decimalFields = ['insulin', 'bmi', 'diabetesPedigreeFunction'];
  
  const placeholders = {
    pregnancies: 'e.g. 0 - 17',
    glucose: 'e.g. 0 - 200',
    bloodPressure: 'e.g. 0 - 122',
    skinThickness: 'e.g. 0 - 100',
    insulin: 'e.g. 0 - 850',
    bmi: 'e.g. 0.0 - 67.1',
    diabetesPedigreeFunction: 'e.g. 0.078 - 2.42',
    age: 'e.g. 21 - 81',
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-7 space-y-6 transition-transform duration-300 ease-in-out hover:scale-105"
    >
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col space-y-2">
          <label className="font-regular text-gray-700 capitalize">{key}</label>
          <input
            type="number"
            name={key}
            value={value}
            onChange={handleChange}
            required
            step={decimalFields.includes(key) ? 'any' : '1'}
            placeholder={placeholders[key]}
            className="text-gray-900 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-green-500 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-600 transition disabled:opacity-50 poppins-bold"
      >
        Predict Diabetes
      </button>
    </form>
  );
};

export default DiabetesForm;
