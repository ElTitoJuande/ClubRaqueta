import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const SocioDashboard = () => {
  const { usuario } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900">
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-20">
          <h1 className="text-3xl font-bold text-white mb-8">Bienvenido, {usuario.nombre}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/socios/mis-reservas" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Mis Reservas</h2>
                <p className="text-white/80">Ver y gestionar tus reservas</p>
              </div>
            </Link>

            <Link to="/socios/perfil" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Perfil</h2>
                <p className="text-white/80">Actualizar tus datos personales</p>
              </div>
            </Link>

            <Link to="/reservas" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Nueva Reserva</h2>
                <p className="text-white/80">Realizar una nueva reserva</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocioDashboard;