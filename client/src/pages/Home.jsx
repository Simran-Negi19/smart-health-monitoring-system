import React from 'react';
import InputForm from '../components/InputForm';

const Home = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-r from-sky-100 to-emerald-100">
      
      <div className="w-full flex flex-col p-4">
        <h2 className=" text-2xl text-center text-teal-900 mb-6 poppins-medium 
        ">
          Enter Patient Details
        </h2>
        <InputForm />
      </div>
      
    </div>
  );
};

export default Home;
