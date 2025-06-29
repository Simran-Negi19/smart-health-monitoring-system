import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaLungs, FaNotesMedical } from 'react-icons/fa';

const SelectionPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      label: 'Heart Disease Detection',
      path: '/',
      icon: <FaHeartbeat className="text-red-500 text-5xl mb-4" />,
      color: 'from-red-100 to-red-200',
    },
    {
      label: 'Pneumonia Detection',
      path: '/pneumonia',
      icon: <FaLungs className="text-blue-500 text-5xl mb-4" />,
      color: 'from-blue-100 to-blue-200',
    },
    {
      label: 'Diabetes Detection',
      path: '/diabetes',
      icon: <FaNotesMedical className="text-green-500 text-5xl mb-4" />,
      color: 'from-green-100 to-green-200',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-emerald-100 px-4 py-12">
      <h1 className="text-4xl poppins-bold text-teal-700 mb-10 text-center drop-shadow-md">
        Choose a Prediction Service
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl">
        {services.map((service, idx) => (
          <div
            key={idx}
            onClick={() => navigate(service.path)}
            className={`cursor-pointer bg-gradient-to-br ${service.color} p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center text-center`}
          >
            {service.icon}
            <h2 className="text-xl font-semibold text-gray-800">{service.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionPage;
