import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const MisReservas = () => {
  const { usuario } = useAuth();

  // Verificar que el usuario es socio
  if (!usuario || usuario.rol !== 'SOCIO') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Mis Reservas</h1>
        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white mb-2">Fecha</label>
              <input
                type="date"
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Instalación</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="">Todas</option>
                <option value="tenis">Pistas de Tenis</option>
                <option value="padel">Pistas de Pádel</option>
                <option value="gimnasio">Gimnasio</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Estado</label>
              <select
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Reservas Pendientes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-2 text-white">Instalación</th>
                  <th className="px-4 py-2 text-white">Fecha</th>
                  <th className="px-4 py-2 text-white">Hora</th>
                  <th className="px-4 py-2 text-white">Estado</th>
                  <th className="px-4 py-2 text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/10">
                  <td className="px-4 py-2 text-white">Pista de Pádel 1</td>
                  <td className="px-4 py-2 text-white">15/05/2025</td>
                  <td className="px-4 py-2 text-white">18:00</td>
                  <td className="px-4 py-2 text-white">Pendiente</td>
                  <td className="px-4 py-2">
                    <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400">
                      Cancelar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Historial de Reservas</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-2 text-white">Instalación</th>
                  <th className="px-4 py-2 text-white">Fecha</th>
                  <th className="px-4 py-2 text-white">Hora</th>
                  <th className="px-4 py-2 text-white">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-white/10">
                  <td className="px-4 py-2 text-white">Pista de Tenis 2</td>
                  <td className="px-4 py-2 text-white">10/05/2025</td>
                  <td className="px-4 py-2 text-white">19:00</td>
                  <td className="px-4 py-2 text-white">Confirmada</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisReservas;