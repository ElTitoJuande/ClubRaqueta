import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const handleBack = () => {
    if (usuario && usuario.rol === 'ADMIN') {
      navigate('/admin/dashboard');
    } else if (usuario && usuario.rol === 'SOCIO') {
      navigate('/socios/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="px-4 py-2 bg-lime-900 hover:bg-lime-800 text-yellow-500 rounded-lg transition-colors"
    >
      Volver al Dashboard
    </button>
  );
};

export default BackButton;
