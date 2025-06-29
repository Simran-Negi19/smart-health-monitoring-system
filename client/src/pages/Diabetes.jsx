import React, { useState } from 'react';
import DiabetesForm from '../components/DiabetesForm';
import { CheckCircle, XCircle } from 'lucide-react'; // Lucide icons (or use Heroicons/FontAwesome)

const Diabetes = () => {
  const [result, setResult] = useState('');

  // Determine card styling and extra info
  const getResultProps = () => {
    const resultLower = result.toLowerCase();
    if (resultLower === 'diabetic') {
      return {
        color: 'bg-red-100 border border-red-400 text-red-700',
        icon: <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />,
        message: 'Consult your doctor for a detailed diagnosis and next steps.',
      };
    } else if (resultLower === 'not diabetic') {
      return {
        color: 'bg-green-100 border border-green-400 text-green-700',
        icon: <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />,
        message: 'You seem healthy! Maintain a balanced diet and exercise.',
      };
    } else {
      return {
        color: 'bg-gray-100 border border-gray-300 text-gray-700',
        icon: null,
        message: '',
      };
    }
  };

  const { color, icon, message } = getResultProps();

  return (
    <div className="container">
      <h2 className='text-center poppins-bold text-5xl pt-9 text-teal-500'>Diabetes Prediction</h2>
      <DiabetesForm onResult={setResult} />

      {result && (
        <div className={`max-w-md mx-auto shadow-lg rounded-xl py-6 px-6 mt-7 text-center font-semibold transition-transform duration-300 ease-in-out ${color}`}>
          {icon}
          <h3 className='text-xl mb-2'>
            Prediction Result: <span className="capitalize">{result}</span>
          </h3>
          <p className="text-sm font-normal">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Diabetes;
