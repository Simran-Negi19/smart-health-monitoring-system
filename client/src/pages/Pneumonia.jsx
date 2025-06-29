import React, { useState } from 'react';

const Pneumonia = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/predict-pneumonia', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResult('Prediction failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white flex flex-col items-center justify-center px-4 py-10 ">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl transition-transform duration-300 ease-in-out hover:scale-105">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-teal-600 mb-8">Pneumonia Detection</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition hover:border-teal-500"
          />
           <p className="mt-2 text-sm text-blue-600 font-medium">
    {image ? `Selected file: ${image.name}` : 'Choose a file'}
  </p>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-200 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800">Result: 
              <span className={`ml-2 font-bold ${result === 'Pneumonia' ? 'text-red-600' : 'text-green-600'}`}>
                {result}
              </span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pneumonia;
