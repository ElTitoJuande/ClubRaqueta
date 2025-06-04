import React from 'react';
import { Link } from 'react-router-dom';

// Component to handle various display states (loading, error, empty)
const EventosEstados = ({ cargando, error, eventosVacios }) => {
  if (cargando) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-white mb-2">¡Ups! Algo salió mal</h2>
        <p className="text-white/70 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-yellow-500 text-lime-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all inline-block"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }
  
  if (eventosVacios) {
    return (
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center">
        <div className="text-yellow-400 text-5xl mb-4">🎾</div>
        <h2 className="text-xl font-semibold text-white mb-2">Actualmente no hay eventos programados</h2>
        <p className="text-white/70 mb-4">Vuelve pronto para descubrir nuevas actividades</p>
        <Link 
          to="/"
          className="bg-yellow-500 text-lime-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all inline-block"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }
  
  return null;
};

export default EventosEstados;
