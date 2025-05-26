import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import logo from '../assets/images/ClubRaqueta.png';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-lime-800/95 backdrop-blur-sm shadow-lg py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Club Raqueta Rute"
              className={`transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'
                }`}
            />
          </div>

          <Navbar />
          <div className="hidden md:flex items-center space-x-5">
            <div className="hidden md:flex items-center space-x-5">
              {!usuario && (
                <Link to="/login" className="text-white hover:text-yellow-400 transition-colors">
                  Iniciar Sesión
                </Link>
              )}
              {usuario && (
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-5">
              {!usuario && (
                <Link to="/reservas" className="bg-yellow-500 text-lime-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 font-medium shadow-lg">
                  Reservar Pista
                </Link>
              )}
              {usuario && (
                <Link to={usuario.rol === 'ADMIN' ? '/admin/dashboard' : '/socios/dashboard'} className="bg-yellow-500 text-lime-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 font-medium shadow-lg">
                  Ir al Dashboard
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;