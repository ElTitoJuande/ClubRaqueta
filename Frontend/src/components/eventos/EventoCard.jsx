import React from 'react';
import { CalendarIcon, MapPinIcon, TagIcon, EyeIcon } from '@heroicons/react/24/outline';

const EventoCard = ({ evento, formatearFecha, renderizarContador, onClick }) => {
  return (
    <div 
      className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all cursor-pointer"
      onClick={() => onClick(evento)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={evento.imagen} 
          alt={evento.titulo} 
          className="w-full h-full object-cover"
        />
        {renderizarContador(evento)}
        <div className="absolute bottom-0 left-0 bg-yellow-500 text-lime-900 text-xs font-bold uppercase px-3 py-1 rounded-tr-lg capitalize flex items-center">
          <TagIcon className="w-3 h-3 mr-1" />
          {evento.tipo_evento}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{evento.titulo}</h3>
        <p className="text-white/70 text-sm mb-3 flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1 text-yellow-400" />
          {formatearFecha(evento.fecha_inicio, evento.hora_inicio)}
        </p>
        <p className="text-white/80 mb-4 line-clamp-3">{evento.descripcion}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-white/70">
            <MapPinIcon className="w-4 h-4 mr-1 text-yellow-400" />
            <span>{evento.ubicacion}</span>
          </div>
          <button className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
            Ver detalles
            <EyeIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventoCard;
