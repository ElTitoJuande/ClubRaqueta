import React from 'react';

// Utility functions for eventos components

// Formatear fecha para mostrar
export const formatearFecha = (fecha, hora) => {
  const fechaObj = new Date(fecha + 'T' + hora);
  return new Intl.DateTimeFormat('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(fechaObj);
};

// Calcular días restantes hasta el evento
export const calcularDiasRestantes = (fechaInicio) => {
  const hoy = new Date();
  const fechaEvento = new Date(fechaInicio);
  const diferencia = fechaEvento - hoy;
  const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  return dias;
};

// Renderizar contador regresivo si queda menos de una semana
export const renderizarContador = (evento) => {
  const diasRestantes = calcularDiasRestantes(evento.fecha_inicio);
  
  if (diasRestantes <= 7 && diasRestantes > 0) {
    return (
      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 animate-pulse">
        {diasRestantes === 1 ? '¡Mañana!' : `En ${diasRestantes} días`}
      </div>
    );
  }
  return null;
};

// Función para filtrar eventos según los filtros activos
export const filtrarEventos = (eventos, filtroActivo, filtroMes) => {
  return eventos.filter(evento => {
    // Filtrar por tipo
    const pasaFiltroTipo = filtroActivo === 'todos' || evento.tipo_evento === filtroActivo;
    
    // Filtrar por mes
    const fechaEvento = new Date(evento.fecha_inicio);
    const mesEvento = fechaEvento.toLocaleString('es-ES', { month: 'long' });
    const pasaFiltroMes = filtroMes === 'todos' || mesEvento === filtroMes;
    
    return pasaFiltroTipo && pasaFiltroMes;
  });
};
