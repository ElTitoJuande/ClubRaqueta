import React, { useState, useEffect } from 'react';
import '../styles/animations.css';

// Importar componentes
import EventoCard from '../components/eventos/EventoCard';
import EventoModal from '../components/eventos/EventoModal';
import EventosFiltros from '../components/eventos/EventosFiltros';
import EventosEstados from '../components/eventos/EventosEstados';

// Importar utilidades
import { formatearFecha, renderizarContador, filtrarEventos } from '../components/eventos/EventosUtils.jsx';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [tiposFiltro, setTiposFiltro] = useState([]);
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [mesesDisponibles, setMesesDisponibles] = useState([]);
  const [filtroMes, setFiltroMes] = useState('todos');
  const [inscrito, setInscrito] = useState(false);
  const [inscribiendo, setInscribiendo] = useState(false);
  const [inscripcionExitosa, setInscripcionExitosa] = useState(false);
  
  useEffect(() => {
    // Reset inscription status when modal closes
    if (!eventoSeleccionado) {
      setInscribiendo(false);
      setInscripcionExitosa(false);
    }
  }, [eventoSeleccionado]);

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        // URL de backend corregida
        const response = await fetch('http://localhost/ClubRaqueta/Backend/api/eventos.php');
        if (!response.ok) {
          throw new Error('Error al cargar los eventos');
        }
        const data = await response.json();
        setEventos(data);
        
        // Extraer tipos únicos de eventos para el filtro
        const tipos = [...new Set(data.map(evento => evento.tipo_evento))];
        setTiposFiltro(tipos);
        
        // Extraer meses únicos para el filtro
        const meses = [...new Set(data.map(evento => {
          const fecha = new Date(evento.fecha_inicio);
          return fecha.toLocaleString('es-ES', { month: 'long' });
        }))];
        setMesesDisponibles(meses);
        
        setCargando(false);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
        setCargando(false);
        
        // Extraer tipos únicos de eventos para el filtro (datos de muestra)
        const tiposMuestra = [...new Set(['torneo', 'clinica', 'gala'])];
        setTiposFiltro(tiposMuestra);
        
        // Extraer meses únicos para el filtro (datos de muestra)
        const mesesMuestra = [...new Set(['junio', 'julio', 'agosto'])];
        setMesesDisponibles(mesesMuestra);
      }
    };
    
    obtenerEventos();
  }, []);
  
  const handleAbrirModal = (evento) => {
    setEventoSeleccionado(evento);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  };
  
  const handleCerrarModal = () => {
    setEventoSeleccionado(null);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };
  
  const handleFiltrarPorTipo = (tipo) => {
    setFiltroActivo(tipo);
  };
  
  const handleFiltrarPorMes = (mes) => {
    setFiltroMes(mes);
  };
  
  const handleInscripcion = () => {
    setInscribiendo(true);
    // Simulación de proceso de inscripción
    setTimeout(() => {
      setInscribiendo(false);
      setInscripcionExitosa(true);
      setInscrito(true);
    }, 1500);
  };
  
  const handleCancelarInscripcion = () => {
    setInscribiendo(true);
    // Simulación de proceso de cancelación
    setTimeout(() => {
      setInscribiendo(false);
      setInscrito(false);
    }, 1000);
  };
  
  // Filtrar eventos usando la función importada
  const eventosFiltrados = filtrarEventos(eventos, filtroActivo, filtroMes);
  
  // Usamos las funciones importadas de EventosUtils.js

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto animate-[fadeIn_1s_ease-out_forwards] text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Eventos</h1>
        <p className="text-xl text-white/80 mb-8">Descubre todas las actividades y eventos que organizamos en nuestro club</p>
        
        {/* Filtros */}
        <EventosFiltros 
          tiposFiltro={tiposFiltro}
          filtroActivo={filtroActivo}
          mesesDisponibles={mesesDisponibles}
          filtroMes={filtroMes}
          onFiltrarPorTipo={handleFiltrarPorTipo}
          onFiltrarPorMes={handleFiltrarPorMes}
        />
        
        {/* Contenido principal */}
        <EventosEstados 
          cargando={cargando} 
          error={error} 
          eventosVacios={!cargando && !error && eventosFiltrados.length === 0} 
        />
        
        {!cargando && !error && eventosFiltrados.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map(evento => (
              <EventoCard 
                key={evento.id}
                evento={evento}
                formatearFecha={formatearFecha}
                renderizarContador={renderizarContador}
                onClick={handleAbrirModal}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de detalles del evento */}
      {eventoSeleccionado && (
        <EventoModal 
          evento={eventoSeleccionado} 
          onClose={handleCerrarModal} 
          formatearFecha={formatearFecha} 
          inscrito={inscrito} 
          inscribiendo={inscribiendo} 
          inscripcionExitosa={inscripcionExitosa} 
          onInscripcion={handleInscripcion} 
          onCancelarInscripcion={handleCancelarInscripcion} 
        />
      )}
    </div>
  );
};

export default Eventos;
