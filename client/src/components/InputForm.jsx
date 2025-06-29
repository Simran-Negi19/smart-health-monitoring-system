import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CholesterolChart from './CholesterolChart';

import HeartRateChart from './HeartRateChart';

import { HeartPulse, User, Activity, Gauge, Thermometer, SmilePlus } from "lucide-react";

function InputForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const initialFormData = {
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
     // Age: 1 - 120
  if (formData.age < 1 || formData.age > 120) newErrors.age = "Age must be between 1 and 120";

  // Sex: should be 0 or 1 (0 = female, 1 = male)
  if (formData.sex !== '0' && formData.sex !== '1') newErrors.sex = "Sex must be 0 (Female) or 1 (Male)";

  // Chest pain type (cp): typically 0-3
  if (formData.cp < 0 || formData.cp > 3) newErrors.cp = "Chest pain type must be between 0 and 3";

  // Resting Blood Pressure (trestbps): 50 - 250
  if (formData.trestbps < 50 || formData.trestbps > 250) newErrors.trestbps = "Invalid Blood Pressure";

  // Cholesterol (chol): 100 - 700
  if (formData.chol < 100 || formData.chol > 700) newErrors.chol = "Invalid Cholesterol";

  // Fasting Blood Sugar (fbs): 0 or 1
  if (formData.fbs !== '0' && formData.fbs !== '1') newErrors.fbs = "Fasting blood sugar must be 0 or 1";

  // Resting ECG (restecg): 0-2
  if (formData.restecg < 0 || formData.restecg > 2) newErrors.restecg = "Resting ECG must be between 0 and 2";

  // Max Heart Rate (thalach): 60 - 220
  if (formData.thalach < 60 || formData.thalach > 220) newErrors.thalach = "Invalid Max Heart Rate";

  // Exercise Induced Angina (exang): 0 or 1
  if (formData.exang !== '0' && formData.exang !== '1') newErrors.exang = "Exercise angina must be 0 or 1";

  // ST depression (oldpeak): 0 - 10
  if (formData.oldpeak < 0 || formData.oldpeak > 10) newErrors.oldpeak = "Invalid ST Depression";

  // Slope of the ST segment (slope): 0 - 2
  if (formData.slope < 0 || formData.slope > 2) newErrors.slope = "Slope must be between 0 and 2";

  // Number of major vessels (ca): 0 - 3
  if (formData.ca < 0 || formData.ca > 3) newErrors.ca = "Number of vessels must be between 0 and 3";

  // Thalassemia (thal): usually 0-3 or 1-3 depending on model
  if (formData.thal < 0 || formData.thal > 3) newErrors.thal = "Thal must be between 0 and 3";


    setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
     // Show popup if there are errors
  if (Object.keys(newErrors).length > 0) {
    const errorMessages = Object.values(newErrors).join('\n');
    window.alert(`Please fix the following errors:\n${errorMessages}`);
    return false;
  }

  return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const input = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
      );

      console.log("Sending data to backend:", input);

      const response = await axios.post("/predict", input);
      const prediction = response.data.prediction;
      navigate('/result', { state: { prediction: response.data.prediction,
        formData:formData
       } });
    } catch (error) {
      console.error("Prediction failed:", error);
      navigate('/result', { state: { prediction: "Prediction failed" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100 p-4">
      <div className="bg-white transition-transform duration-300 ease-in-out hover:scale-105 rounded-2xl shadow-xl p-8 w-full max-w-4xl border border-gray-100 flex flex-col">
        <div className="flex items-center justify-center mb-6 text-blue-600 ">
          <HeartPulse className="h-8 w-8 mr-2 " />
          <h2 className="text-3xl poppins-bold">Heart Disease Prediction</h2>
        </div>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col mb-3">
            <div className="flex flex-row items-center mb-1">
            <User className="w-4 h-3.5 mr-1 text-gray-600" />
            <label className="text-gray-600 poppins-medium text-sm">
               Age
            </label>
            </div>
            <input
              type="number"
              placeholder="1-120"
              name="age"
              value={formData.age}
              onChange={handleChange}
               className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
              required
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div className="flex flex-col mb-3">
            <div className=" flex flex-row items-center mb-1">
            <label className="text-gray-600 poppins-medium text-sm">Sex </label>
            </div>
           
            <input
              type="number"
              name="sex"
              placeholder="0 = female, 1 = male"
              value={formData.sex}
              onChange={handleChange}
               className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
              required
            />
            {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}

          </div>

          <div className="flex flex-col mb-3">
            <div  className=" flex flex-row items-center mb-1"> 
              <label className="text-gray-600 poppins-medium text-sm">Chest Pain Type </label>
              </div>
           
            <input
              type="number"
              name="cp"
              placeholder="0-3"
              value={formData.cp}
              onChange={handleChange}
               className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
              required
            />
            {errors.cp && <p className="text-red-500 text-sm">{errors.cp}</p>}
          </div>

        
          <div className="flex flex-col mb-3">
            <div  className=" flex flex-row items-center mb-1">
            <Gauge className="w-4 h-3.5 mr-1 text-gray-600" />
            <label className="text-gray-600 poppins-medium text-sm">
              Resting BP
            </label>
            </div>
           
            <input
              type="number"
              name="trestbps"
              placeholder="90-200"
              value={formData.trestbps}
              onChange={handleChange}
               className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
              required
            />
            {errors.trestbps && <p className="text-red-500 text-sm">{errors.trestbps}</p>}
          </div>

          <div className="flex flex-col mb-3">
            <div className=" flex flex-row items-center mb-1">
            <label className="text-gray-600 poppins-medium text-sm">Cholesterol</label>
            </div>
            <input
              type="number"
              name="chol"
              placeholder="100-600"
              value={formData.chol}
              onChange={handleChange}
               className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
              required
            />
            {errors.chol && <p className="text-red-500 text-sm">{errors.chol}</p>}
          </div>

          <div className="flex flex-col mb-3">
            <div className=" flex flex-row items-center mb-1">
            <label className="text-gray-600 poppins-medium text-sm">Fasting Blood Sugar </label>
            </div>
            <input
              type="number"
              name="fbs"
              placeholder="0 or 1"
              value={formData.fbs}
              onChange={handleChange}
               className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
              required
            />
            {errors.fbs && <p className="text-red-500 text-sm">{errors.fbs}</p>}
          </div>

          <div className="flex flex-col mb-3">
            <div className="flex flex-row items-center mb-1">
  <label className="text-gray-600 poppins-medium text-sm">Resting ECG </label>
  </div>
  <input
    type="number"
    name="restecg"
    placeholder="0-2"
    value={formData.restecg}
    onChange={handleChange}
    className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.restecg && <p className="text-red-500 text-sm">{errors.restecg}</p>}
</div>

<div className="flex flex-col mb-3">
  <div className="flex flex-row items-center mb-1">
  <Activity className="w-4 h-3.5 mr-1 text-gray-600" /> 
  <label className="text-gray-600 poppins-medium text-sm">
   Max Heart Rate Achieved
  </label>
  </div>
  <input
    type="number"
    name="thalach"
    placeholder="60-220"
    value={formData.thalach}
    onChange={handleChange}
    className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.thalach && <p className="text-red-500 text-sm">{errors.thalach}</p>}
</div>

<div className="flex flex-col mb-3">
<div className="flex flex-row items-center mb-1">
  <label className="text-gray-600 poppins-medium text-sm">Exercise Induced Angina </label>
  </div>
  <input
    type="number"
    name="exang"
    placeholder="0 or 1"
    value={formData.exang}
    onChange={handleChange}
     className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.exang && <p className="text-red-500 text-sm">{errors.exang}</p>}
</div>

<div className="flex flex-col mb-3">
<div className="flex flex-row items-center mb-1">
<Thermometer className="w-4 h-3.5 mr-1 text-gray-600"/>
  <label className="text-gray-600 poppins-medium text-sm">
     ST Depression
  </label>
  </div>
  <input
    type="text"
    name="oldpeak"
    placeholder="0.0-7.0"
    value={formData.oldpeak}
    onChange={handleChange}
     className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.oldpeak && <p className="text-red-500 text-sm">{errors.oldpeak}</p>}
</div>

<div className="flex flex-col mb-3">
<div className="flex flex-row items-center mb-1">
  <label className="text-gray-600 poppins-medium text-sm">Slope </label>
  </div>
  <input
    type="number"
    name="slope"
    placeholder="0-2"
    value={formData.slope}
    onChange={handleChange}
    className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.slope && <p className="text-red-500 text-sm">{errors.slope}</p>}
</div>

<div className="flex flex-col mb-3">
<div className="flex flex-row items-center mb-1">
  <label className="text-gray-600 poppins-medium text-sm">Number of Major Vessels</label>
  </div>
  <input
    type="number"
    name="ca"
    placeholder="0-3"
    value={formData.ca}
    onChange={handleChange}
     className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.ca && <p className="text-red-500 text-sm">{errors.ca}</p>}
</div>

<div className="flex flex-col mb-3">
<div className="flex flex-row items-center mb-1">
<SmilePlus className="w-4 h-3.5 mr-1 text-gray-600"/>
  <label className="text-gray-600 poppins-medium text-sm">
    Thal 
  </label>
  </div>
  <input
    type="number"
    name="thal"
    placeholder="0-3"
    value={formData.thal}
    onChange={handleChange}
     className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500"
    required
  />
  {errors.thal && <p className="text-red-500 text-sm">{errors.thal}</p>}
</div>


          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-teal-600 transition disabled:opacity-50 poppins-bold"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Submit Prediction"}
            </button>
          </div>


          {formData.chol && formData.age && (
  <CholesterolChart age={formData.age} chol={formData.chol} />
)}

{formData.thalach && formData.age && (
  <HeartRateChart age={formData.age} thalach={formData.thalach} />
)}

          <div  className="md:col-span-2 mt-4">
            
          <button
  type="button"
  onClick={() => {
  setFormData(initialFormData);
  setErrors({});
  }}
  className="bg-gradient-to-r from-gray-900 to-gray-900 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-gray-950 hover:to-gray-950 transition disabled:opacity-50 poppins-bold"
>
  Reset
</button>
          </div>
         

        </form>
      </div>
    </div>
  );
}

export default InputForm;
