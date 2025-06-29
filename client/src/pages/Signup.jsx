import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    // Redirect user if already logged in
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/selection'); // Redirect to home page if already logged in
      }
    }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      localStorage.setItem('token', res.data.token);
      alert('Signup successful!');
      navigate('/selection');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-105 ">
        <h2 className="text-3xl mb-4 poppins-bold text-center text-gray-900">Sign Up</h2>
        {error && <p className="text-red-500 poppins-medium mb-1.5">{error}</p>}
        <input type="text"  name="username" placeholder="Name" className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500 mb-6" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" name="email" className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500 mb-6" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"  name="password" className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500 mb-7" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-500 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-600 transition disabled:opacity-50 poppins-bold poppins-bold">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
