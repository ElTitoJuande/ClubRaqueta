import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900">
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-24">
          <h1 className="text-3xl font-bold text-white mb-8">Panel de Administración</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/admin/gestion-socios" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Gestión de Socios</h2>
                <p className="text-white/80">Administrar usuarios y socios</p>
              </div>
            </Link>

            <Link to="/admin/gestion-reservas" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Gestión de Reservas</h2>
                <p className="text-white/80">Ver y gestionar todas las reservas</p>
              </div>
            </Link>

            <Link to="/admin/gestion-eventos" className="bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Gestión de Eventos</h2>
                <p className="text-white/80">Crear y gestionar eventos</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;