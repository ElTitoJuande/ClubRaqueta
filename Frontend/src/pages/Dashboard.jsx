import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (usuario) {
      if (usuario.rol === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (usuario.rol === 'SOCIO') {
        navigate('/socios/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [usuario, navigate]);

  return <div>Redireccionando...</div>;
};

export default Dashboard;
