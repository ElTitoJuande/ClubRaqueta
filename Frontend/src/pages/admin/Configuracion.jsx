import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/BackButton';

const Configuracion = () => {
  const { usuario } = useAuth();

  // Verificar que el usuario es administrador
  if (!usuario || usuario.rol !== 'ADMIN') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Configuración del Sistema</h1>
          <BackButton />
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Configuración General</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-white mb-2">Título del Club</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                placeholder="Club Raqueta Rute"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Horario de Apertura</label>
              <input
                type="time"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Horario de Cierre</label>
              <input
                type="time"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-lime-900 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Guardar Cambios
            </button>
          </form>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Configuración de Instalaciones</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Pistas de Tenis</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                placeholder="Número de pistas"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Pistas de Pádel</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                placeholder="Número de pistas"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Gimnasio</label>
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                placeholder="Número de zonas"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
