import React from 'react';
import { CalendarIcon, TagIcon } from '@heroicons/react/24/outline';

const EventosFiltros = ({ 
  tiposFiltro, 
  filtroActivo, 
  mesesDisponibles, 
  filtroMes, 
  onFiltrarPorTipo, 
  onFiltrarPorMes 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {/* Filtros de tipo de evento */}
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => onFiltrarPorTipo('todos')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center
            ${filtroActivo === 'todos' 
              ? 'bg-yellow-500 text-lime-900' 
              : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          <TagIcon className="w-4 h-4 mr-1" />
          Todos
        </button>
    
        {tiposFiltro.map(tipo => (
          <button 
            key={tipo}
            onClick={() => onFiltrarPorTipo(tipo)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize flex items-center
              ${filtroActivo === tipo 
                ? 'bg-yellow-500 text-lime-900' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <TagIcon className="w-4 h-4 mr-1" />
            {tipo}
          </button>
        ))}
      </div>
      
      {/* Filtro por mes */}
      <div className="relative">
        <select
          value={filtroMes}
          onChange={(e) => onFiltrarPorMes(e.target.value)}
          className="appearance-none bg-white/10 text-white hover:bg-white/20 px-4 py-2 pr-8 rounded-full text-sm font-medium transition-all cursor-pointer outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="todos" className="bg-lime-800">Todos los meses</option>
          {mesesDisponibles.map(mes => (
            <option key={mes} value={mes} className="bg-lime-800 capitalize">{mes}</option>
          ))}
        </select>
        <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
      </div>
    </div>
  );
};

export default EventosFiltros;
