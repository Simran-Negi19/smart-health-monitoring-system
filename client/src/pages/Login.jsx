import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/selection');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/selection');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md transition-transform duration-300 ease-in-out hover:scale-105">
        <h2 className="text-3xl mb-4 poppins-bold text-center text-gray-900">Login</h2>
        {error && <p className="text-red-500 poppins-medium mb-1.5">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500 mb-6"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="text-gray-900 w-full px-4 py-2 border border-gray-300 rounded-xl 
            focus:outline-none focus:ring-0 focus:ring-gray-500 
            focus:border-gray-500 shadow-sm focus:shadow-md 
            placeholder-gray-500 mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-600 transition disabled:opacity-50 poppins-bold"
        >
          Login
        </button>

        {/* OR and Signup Button */}
        <div className="text-center mt-4">
          <p className="text-gray-500 mb-2">or</p>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full bg-gradient-to-r from-green-500 to-green-500 text-white py-2 px-4 rounded-lg font-semibold shadow-lg hover:from-green-600 hover:to-green-600 transition disabled:opacity-50 poppins-bold"
          >
            Signup
          </button>
        </div>

        <div className="text-right mb-4">
  <button
    type="button"
    onClick={() => navigate('/forgot-password')}
    className="text-blue-600 hover:underline text-sm poppins-regular mt-11 w-full text-center"
  >
    Forgot Password?
  </button>
</div>

      </form>
    </div>
  );
}

export default Login;
