import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeartPulse, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import HealthStatsBarChart from '../components/HealthStatsBarChart';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prediction = location.state?.prediction;

  const handleBack = () => navigate('/');

  const isPositive = prediction === 1 || prediction === "1";
  const isNegative = prediction === 0 || prediction === "0";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-100 to-blue-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl ">
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <HeartPulse className="w-8 h-8 mr-2" />
          <h2 className="text-2xl font-bold">Prediction Result</h2>
        </div>

        {prediction === "Prediction failed" ? (
          <div className="text-red-500 text-center font-semibold mb-4">
            Prediction failed. Please try again.
          </div>
        ) : (
          <div className="text-center">
            {isPositive ? (
              <div className="flex flex-col items-center text-red-600">
                <XCircle className="w-16 h-16 mb-4" />
                <p className="text-lg font-semibold">High Risk of Heart Disease</p>
                <p className='poppins-medium text-red-500'>Consult a physician for detailed diagnostics.</p>

                {location.state?.formData && (
      <HealthStatsBarChart formData={location.state.formData} />
    )}
              </div>
            ) : isNegative ? (
              <div className="flex flex-col items-center text-green-600">
                <CheckCircle className="w-16 h-16 mb-4" />
                <p className="text-lg font-semibold">No Heart Disease Detected</p>

                {location.state?.formData && (
      <HealthStatsBarChart formData={location.state.formData} />
    )}
              </div>
            ) : (
              <p className="text-gray-700 poppins-regular ">Result: {prediction}</p>
            )}
          </div>
        )}

        <button
          onClick={handleBack}
          className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-teal-600 transition"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Another Prediction
        </button>
      </div>

      
      <div   onClick={() => navigate('/history')} className='cursor-pointer text-center text-blue-500 p-3 mt-8 text-xl poppins-bold rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all bg-blue-200'>Prediction History</div>
    </div>
  );
};

export default Result;
