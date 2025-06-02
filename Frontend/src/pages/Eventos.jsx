import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/animations.css';
import { CalendarIcon, MapPinIcon, TagIcon, CheckCircleIcon, EyeIcon, XCircleIcon, UserGroupIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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
  
  // Filtrar eventos según los filtros activos
  const eventosFiltrados = eventos.filter(evento => {
    // Filtrar por tipo
    const pasaFiltroTipo = filtroActivo === 'todos' || evento.tipo_evento === filtroActivo;
    
    // Filtrar por mes
    const fechaEvento = new Date(evento.fecha_inicio);
    const mesEvento = fechaEvento.toLocaleString('es-ES', { month: 'long' });
    const pasaFiltroMes = filtroMes === 'todos' || mesEvento === filtroMes;
    
    return pasaFiltroTipo && pasaFiltroMes;
  });
  
  // Formatear fecha para mostrar
  const formatearFecha = (fecha, hora) => {
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
  const calcularDiasRestantes = (fechaInicio) => {
    const hoy = new Date();
    const fechaEvento = new Date(fechaInicio);
    const diferencia = fechaEvento - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  };
  
  // Renderizar contador regresivo si queda menos de una semana
  const renderizarContador = (evento) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto animate-[fadeIn_1s_ease-out_forwards] text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Eventos</h1>
        <p className="text-xl text-white/80 mb-8">Descubre todas las actividades y eventos que organizamos en nuestro club</p>
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {/* Filtros de tipo de evento */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handleFiltrarPorTipo('todos')}
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
                onClick={() => handleFiltrarPorTipo(tipo)}
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
              onChange={(e) => handleFiltrarPorMes(e.target.value)}
              className="appearance-none bg-white/10 text-white hover:bg-white/20 px-4 py-2 pr-8 rounded-full text-sm font-medium transition-all cursor-pointer outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="todos">Todos los meses</option>
              {mesesDisponibles.map(mes => (
                <option key={mes} value={mes} className="bg-lime-800 capitalize">{mes}</option>
              ))}
            </select>
            <CalendarIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
          </div>
        </div>
        
        {/* Contenido principal */}
        {cargando && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        )}
        
        {!cargando && error && (
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
        )}
        
        {!cargando && !error && eventosFiltrados.length === 0 && (
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
        )}
        
        {!cargando && !error && eventosFiltrados.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventosFiltrados.map(evento => (
              <div 
                key={evento.id} 
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => handleAbrirModal(evento)}
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
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de detalles del evento */}
      {eventoSeleccionado && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out_forwards]">
          <div 
            className="bg-gradient-to-br from-lime-900 to-lime-800 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative animate-[scaleIn_0.3s_ease-out_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCerrarModal}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
            >
              ×
            </button>
            
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="relative h-64 md:h-full">
                  <img 
                    src={eventoSeleccionado.imagen} 
                    alt={eventoSeleccionado.titulo} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lime-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-500 text-lime-900 text-xs font-bold uppercase px-3 py-1 rounded-lg capitalize flex items-center">
                      <TagIcon className="w-3 h-3 mr-1" />
                      {eventoSeleccionado.tipo_evento}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{eventoSeleccionado.titulo}</h3>
                
                <div className="flex flex-wrap items-center text-white/70 text-sm mb-4">
                  <div className="flex items-center mr-4 mb-2">
                    <CalendarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>Inicio: {formatearFecha(eventoSeleccionado.fecha_inicio, eventoSeleccionado.hora_inicio)}</span>
                  </div>
                  {eventoSeleccionado.fecha_fin && (
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="h-4 w-4 mr-1 text-yellow-400" />
                      <span>Fin: {formatearFecha(eventoSeleccionado.fecha_fin, eventoSeleccionado.hora_fin)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-white/70 text-sm mb-4">
                  <MapPinIcon className="h-4 w-4 mr-1 text-yellow-400" />
                  <span>{eventoSeleccionado.ubicacion}</span>
                </div>
                
                <p className="text-white/90 mb-6">{eventoSeleccionado.descripcion_completa || eventoSeleccionado.descripcion}</p>
                
                {/* Información adicional opcional */}
                {eventoSeleccionado.instructor && (
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2 flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1 text-yellow-400" />
                      ¿Quién imparte el evento?
                    </h4>
                    <p className="text-white/80 text-sm">{eventoSeleccionado.instructor}</p>
                  </div>
                )}
                
                {eventoSeleccionado.material && (
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-medium mb-2">¿Qué traer?</h4>
                    <p className="text-white/80 text-sm">{eventoSeleccionado.material}</p>
                  </div>
                )}
                
                <div className="bg-white/5 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1 text-yellow-400" />
                      Plazas disponibles:
                    </span>
                    <span className={`font-bold ${eventoSeleccionado.plazas > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {eventoSeleccionado.plazas}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`${eventoSeleccionado.plazas > 0 ? 'bg-yellow-500' : 'bg-red-500'} h-2 rounded-full`}
                      style={{ width: `${Math.min(100, (1 - eventoSeleccionado.plazas / 100) * 100)}%` }}
                    ></div>
                  </div>
                  
                  {eventoSeleccionado.plazas === 0 && (
                    <div className="mt-2 text-center text-red-400 text-xs font-medium animate-pulse">
                      EVENTO COMPLETO
                    </div>
                  )}
                </div>
                
                {eventoSeleccionado.plazas > 0 ? (
                  inscrito ? (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={handleCancelarInscripcion}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${inscribiendo ? 'bg-white/20 text-white cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
                        disabled={inscribiendo}
                      >
                        {inscribiendo ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando...
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-5 w-5 mr-2" />
                            Cancelar inscripción
                          </>
                        )}
                      </button>
                      <button 
                        className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center mt-2"
                        onClick={handleCerrarModal}
                      >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Volver a eventos
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={handleInscripcion}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${inscribiendo ? 'bg-white/20 text-white cursor-not-allowed' : inscripcionExitosa ? 'bg-green-500 text-white' : 'bg-yellow-500 text-lime-900 hover:bg-yellow-400'}`}
                        disabled={inscribiendo}
                      >
                        {inscribiendo ? (
                          <>
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando inscripción...
                          </>
                        ) : inscripcionExitosa ? (
                          <>
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            ¡Inscripción completada!
                          </>
                        ) : (
                          <>
                            <CheckCircleIcon className="h-5 w-5 mr-2" />
                            Inscribirse al evento
                          </>
                        )}
                      </button>
                      <button 
                        className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center mt-2"
                        onClick={handleCerrarModal}
                      >
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Volver a eventos
                      </button>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col gap-2">
                    <button 
                      className="w-full bg-white/20 text-white/50 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                      disabled
                    >
                      <XCircleIcon className="h-5 w-5 mr-2" />
                      Evento completo
                    </button>
                    <button 
                      className="w-full bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors flex items-center justify-center mt-2"
                      onClick={handleCerrarModal}
                    >
                      <ArrowLeftIcon className="h-4 w-4 mr-2" />
                      Volver a eventos
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
