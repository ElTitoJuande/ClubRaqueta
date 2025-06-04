import React from 'react';

const ServicioCard = ({ servicio, onClick, index }) => {
  return (
    <button
      type="button"
      className="group w-full text-left focus:outline-none"
      onClick={() => onClick(index)}
      aria-label={`Más información sobre ${servicio.titulo}`}
    >
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl transition-all hover:bg-white/20 hover:shadow-xl hover:scale-105 duration-300 border border-white/20">
        <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
          <img
            src={servicio.imagen}
            alt={servicio.titulo}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">{servicio.titulo}</h3>
        <p className="text-white/80 mb-4">{servicio.descripcion}</p>
        <div className="flex items-center text-yellow-400">
          <span className="mr-2">Saber más</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ServicioCard;
