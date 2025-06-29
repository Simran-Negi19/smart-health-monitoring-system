import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-teal-400 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-center md:relative text-white gap-4">
          
          {/* Heading - always centered */}
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Smart Health Monitor
          </h1>

          {/* Logout Button - right aligned only on large screens */}
          {isLoggedIn && (
            <div className="md:absolute md:right-0">
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-teal-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
