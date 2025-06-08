import React, { useState, useEffect, useMemo } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../contexts/AuthContext';
import { crearReserva, obtenerReservas, cancelarReserva, obtenerInstalaciones } from '../services/api';
import '../styles/reservas.css';

// Las instalaciones ahora se cargan dinámicamente desde el backend

const Reservas = () => {
  const { usuario, puedeReservar } = useAuth();
  const [instalaciones, setInstalaciones] = useState({});
  const [listaInstalaciones, setListaInstalaciones] = useState([]);
  const [instalacionSeleccionada, setInstalacionSeleccionada] = useState('');
  const [semanaActual, setSemanaActual] = useState(startOfWeek(new Date(), { locale: es }));
  const [reservaActual, setReservaActual] = useState(null);
  const [error, setError] = useState('');
  const [misReservas, setMisReservas] = useState([]);
  const [todasLasReservas, setTodasLasReservas] = useState([]);
  const [mostrarTodasReservas, setMostrarTodasReservas] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cargandoInstalaciones, setCargandoInstalaciones] = useState(true);

  // Cargar instalaciones al montar el componente
  useEffect(() => {
    async function cargarInstalaciones() {
      setCargandoInstalaciones(true);
      setError('');
      
      try {
        const listaInstalacionesResponse = await obtenerInstalaciones();
        
        // Verificar que la respuesta no esté vacía
        if (!listaInstalacionesResponse || !Array.isArray(listaInstalacionesResponse) || listaInstalacionesResponse.length === 0) {
          setError('No se pudieron cargar las instalaciones desde el servidor. Contacta con el administrador.');
          setCargandoInstalaciones(false);
          return;
        }
        
        // Transformar la lista de instalaciones al formato que espera el componente
        const instalacionesObj = {};
        
        listaInstalacionesResponse.forEach(instalacion => {
          if (!instalacion || !instalacion.nombre) return;
          
          // Crear clave para la instalación a partir del tipo o nombre
          const key = (instalacion.tipo || instalacion.nombre)
            .toUpperCase()
            .replace(/ /g, '_')
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos
          
          // Para todas las instalaciones, mostramos solo una opción
          const recursos = [instalacion.nombre];
          
          instalacionesObj[key] = {
            id: parseInt(instalacion.id),
            nombre: instalacion.nombre,
            recursos: recursos,
            duracionReserva: parseInt(instalacion.duracion_reserva),
            horaInicio: parseInt(instalacion.hora_apertura?.split(':')[0]),
            horaFin: parseInt(instalacion.hora_cierre?.split(':')[0]),
            requiereSocio: instalacion.requiere_socio === 1 || instalacion.requiere_socio === true
          };
        });
        
        // Verificar que tengamos al menos una instalación
        if (Object.keys(instalacionesObj).length === 0) {
          setError('No se encontraron instalaciones disponibles en la base de datos');
        } else {
          setInstalaciones(instalacionesObj);
          setListaInstalaciones(listaInstalacionesResponse);
          
          // Seleccionar la primera instalación por defecto
          const primeraKey = Object.keys(instalacionesObj)[0];
          setInstalacionSeleccionada(primeraKey);
        }
        
        setError('');
      } catch (err) {
        // Error al cargar instalaciones
        setError('Error al cargar las instalaciones. Por favor, intenta nuevamente.');
      } finally {
        setCargandoInstalaciones(false);
      }
    }
    
    cargarInstalaciones();
  }, []);
  
  // Función auxiliar para determinar si una reserva está activa o es futura
  const esReservaActivaOFutura = (reserva) => {
    // Fecha y hora actual
    const ahora = new Date();
    
    // Combinar fecha de reserva con hora de finalización
    const [horasFin, minutosFin, segundosFin = 0] = reserva.horaFin.split(':').map(Number);
    
    // Crear un objeto Date con la fecha y hora de finalización de la reserva
    const fechaHoraFinReserva = new Date(reserva.fecha);
    fechaHoraFinReserva.setHours(horasFin, minutosFin, segundosFin);
    
    // La reserva es activa o futura si su fecha/hora de finalización
    // es igual o posterior a la fecha/hora actual
    return fechaHoraFinReserva >= ahora;
  };

  // Definir las dependencias del efecto como una variable para evitar warning del linter
  const actualizarReservasDeps = useMemo(() => {
    return { usuarioId: usuario?.id, mostrarTodasReservas };
  }, [usuario?.id, mostrarTodasReservas]);
  
  // Cargar reservas cuando se monta el componente o cambia el usuario o el toggle
  useEffect(() => {
    async function cargarReservas() {
      if (usuario && usuario.id) {
        setCargando(true);
        try {
          await actualizarReservas();
          setError('');
        } catch (err) {
          setError('Error al cargar tus reservas. Por favor, intenta nuevamente.');
        } finally {
          setCargando(false);
        }
      }
    }
    
    cargarReservas();
    // Usamos el objeto memoizado como dependencia para controlar cuándo se debe ejecutar el efecto
  }, [actualizarReservasDeps]);

  // Memoizamos generarHoras para evitar recálculos innecesarios
  const generarHoras = useMemo(() => {
    if (!instalaciones[instalacionSeleccionada]) return [];
    
    const horas = [];
    const { horaInicio, horaFin, duracionReserva } = instalaciones[instalacionSeleccionada];
    for (let hora = horaInicio; hora < horaFin; hora++) {
      for (let minuto = 0; minuto < 60; minuto += duracionReserva) {
        horas.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
      }
    }
    return horas;
  }, [instalacionSeleccionada, instalaciones]);

  // Memoizamos el cálculo de los días de la semana para que solo se recalcule cuando cambia semanaActual
  const diasSemana = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(semanaActual, i));
  }, [semanaActual]);

  // Comprobar si una celda (día + hora) ya está reservada - OPTIMIZADO
  const estaReservada = (dia, hora, recurso) => {
    if (!todasLasReservas || !todasLasReservas.length) return false;
    
    // Convertir el día a formato yyyy-MM-dd para comparar con las reservas
    const fechaFormateada = format(dia, 'yyyy-MM-dd');
    
    // Lógica simplificada: verificar fecha y hora
    return todasLasReservas.some(reserva => 
      reserva.fecha === fechaFormateada && reserva.horaInicio === hora
    );
  };
  
  // Función para comprobar si una reserva pertenece al usuario actual - OPTIMIZADO
  const esReservaPropia = (dia, hora, recurso) => {
    if (!todasLasReservas || !todasLasReservas.length || !usuario) return false;
    
    const fechaFormateada = format(dia, 'yyyy-MM-dd');
    
    // Verificar fecha, hora y el ID del usuario
    return todasLasReservas.some(reserva => 
      reserva.fecha === fechaFormateada && 
      reserva.horaInicio === hora && 
      parseInt(reserva.usuarioId) === parseInt(usuario.id)
    );
  };
  
  // Obtener info de la reserva para mostrarla en el tooltip - OPTIMIZADO
  const getInfoReserva = (dia, hora, recurso) => {
    if (!todasLasReservas?.length || !usuario) return '';
    
    const fechaFormateada = format(dia, 'yyyy-MM-dd');
    const instalacionActual = instalaciones[instalacionSeleccionada]?.nombre || '';
    
    // Usamos find para buscar la primera reserva que coincida con los criterios
    const reserva = todasLasReservas.find(r => 
      r.fecha === fechaFormateada && 
      r.horaInicio === hora && 
      r.recurso === recurso && 
      r.instalacionNombre === instalacionActual
    );
    
    // Devolvemos información dependiendo de si la reserva existe y si es del usuario actual
    return reserva 
      ? (parseInt(reserva.usuarioId) === parseInt(usuario.id) ? 'Tu reserva' : 'Reservado') 
      : '';
  };
  
  // Comprobar si una celda (día + hora) es del pasado - OPTIMIZADO
  const esHoraPasada = (dia, hora) => {
    const ahora = new Date();
    const fechaHora = new Date(dia);
    
    // Extraer horas y minutos como números directamente
    const [h, m] = hora.split(':').map(Number);
    fechaHora.setHours(h, m, 0);
    
    // Es del pasado si la fecha/hora es anterior a la actual
    return fechaHora < ahora;
  };

  const handleReservaClick = (dia, hora, recurso) => {
    // No permitir reservas de horas pasadas o ya reservadas
    if (esHoraPasada(dia, hora)) {
      setError('No se pueden reservar horas pasadas');
      return;
    }
    
    if (estaReservada(dia, hora, recurso)) {
      setError('Esta hora ya está reservada');
      return;
    }
    
    if (!usuario) {
      setError('Debes iniciar sesión para hacer una reserva');
      return;
    }

    if (!puedeReservar(instalacionSeleccionada)) {
      setError('No tienes permisos para reservar esta instalación');
      return;
    }

    setReservaActual({
      instalacion: instalaciones[instalacionSeleccionada]?.nombre || 'Instalación',
      recurso,
      fecha: format(dia, 'yyyy-MM-dd'),
      hora,
      usuarioId: usuario.id
    });
  };
  
  // Toggle para mostrar/ocultar reservas pasadas
  const toggleMostrarTodasReservas = async () => {
    const nuevoEstado = !mostrarTodasReservas;
    // Actualizar el estado primero para que el efecto async use el valor correcto
    setMostrarTodasReservas(nuevoEstado);
    
    // Las reservas se actualizarán automáticamente por el useEffect que depende de mostrarTodasReservas
  };
  
  // Función para normalizar datos de reserva
  const normalizarReserva = (reserva) => ({
    id: reserva.id,
    instalacionId: reserva.instalacionId || reserva.instalacion_id,
    instalacionNombre: reserva.instalacionNombre || reserva.instalacion_nombre || reserva.instalacion,
    fecha: reserva.fecha,
    horaInicio: reserva.horaInicio || reserva.hora_inicio,
    horaFin: reserva.horaFin || reserva.hora_fin,
    recurso: reserva.recurso || reserva.instalacionRecurso || reserva.instalacionNombre,
    usuarioId: reserva.usuarioId || reserva.usuario_id
  });

  // Función auxiliar para actualizar las reservas después de una operación
  const actualizarReservas = async () => {
    // Cargar todas las reservas del sistema para la ocupación
    const todasReservasRespuesta = await obtenerReservas('all');
    const todasNormalizadas = todasReservasRespuesta.map(normalizarReserva);
    
    // Guardar todas las reservas para mostrar ocupación
    setTodasLasReservas(todasNormalizadas);
    
    // Cargar las reservas del usuario actual
    const misReservasRespuesta = await obtenerReservas(usuario.id);
    const misReservasNormalizadas = misReservasRespuesta.map(normalizarReserva);
    
    // Aplicar el filtro según el estado actual del toggle
    const reservasFiltradas = mostrarTodasReservas ? 
      misReservasNormalizadas : 
      misReservasNormalizadas.filter(esReservaActivaOFutura);
    
    setMisReservas(reservasFiltradas);
  };

  const confirmarReserva = async () => {
    setCargando(true);
    setError(''); // Limpiar error previo
    
    try {
      // Mapear los datos al formato que espera el backend
      const datosReserva = {
        usuario_id: usuario.id,
        instalacion_id: instalaciones[instalacionSeleccionada].id,
        fecha: reservaActual.fecha,
        hora_inicio: reservaActual.hora,
        hora_fin: calcularHoraFin(reservaActual.hora, instalaciones[instalacionSeleccionada].duracionReserva)
      };
      
      const resultado = await crearReserva(datosReserva);
      
      if (resultado.success) {
        await actualizarReservas();
        setReservaActual(null);
      } else {
        setError(resultado.error || 'Error al crear la reserva');
      }
    } catch (err) {
      setError(err.message || 'Error al crear la reserva. Por favor, intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const handleCancelarReserva = async (reservaId) => {
    setCargando(true);
    setError(''); // Limpiar error previo
    
    try {
      const esAdmin = usuario && usuario.rol === 'ADMIN';
      const resultado = await cancelarReserva(reservaId, usuario.id, esAdmin);
      
      if (resultado && resultado.success) {
        await actualizarReservas();
      } else {
        setError((resultado && resultado.error) || 'Error al cancelar la reserva');
      }
    } catch (err) {
      setError(err.message || 'Error al cancelar la reserva. Por favor, intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const cambiarSemana = (suma) => {
    setSemanaActual(prevSemana => addDays(prevSemana, suma * 7));
  };

  const calcularHoraFin = (horaInicio, duracionMinutos) => {
    const [horas, minutos] = horaInicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracionMinutos;
    const nuevasHoras = Math.floor(totalMinutos / 60);
    const nuevosMinutos = totalMinutos % 60;
    return `${nuevasHoras.toString().padStart(2, '0')}:${nuevosMinutos.toString().padStart(2, '0')}`;
  };
  
  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 text-white p-6 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Sistema de Reservas</h1>
          <p className="text-xl mb-8">Debes iniciar sesión para acceder al sistema de reservas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 text-white p-6 pt-24">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sistema de Reservas</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        
        {cargandoInstalaciones && (
          <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-lg mb-6 text-center">
            Cargando instalaciones...
          </div>
        )}

        {/* Info del usuario */}
        <div className="mb-6 p-4 bg-white/10 rounded-lg">
          <p className="font-semibold">Usuario: {usuario.nombre}</p>
          <p>Rol: {usuario.rol}</p>
        </div>

        {/* Selector de instalación */}
        <div className="mb-8">
          <select
            value={instalacionSeleccionada}
            onChange={(e) => setInstalacionSeleccionada(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
            disabled={cargandoInstalaciones}
          >
            {Object.entries(instalaciones).map(([key, { nombre, requiereSocio }]) => {
              if (!requiereSocio || usuario.rol !== 'INVITADO') {
                return (
                  <option key={key} value={key} className="bg-lime-800">
                    {nombre}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        {/* Navegador de semanas */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => cambiarSemana(-1)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Semana anterior
          </button>
          <h2 className="text-xl font-semibold">
            Semana del {format(semanaActual, 'd', { locale: es })} de {format(semanaActual, 'MMMM', { locale: es })}
          </h2>
          <button 
            onClick={() => cambiarSemana(1)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            Semana siguiente
          </button>
        </div>

        {/* Mis Reservas */}
        {(misReservas.length > 0 || todasLasReservas.length > 0) && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Mis Reservas</h2>
              
              {/* Toggle para mostrar reservas pasadas */}
              <div className="flex items-center">
                <span className="mr-2 text-sm">
                  {mostrarTodasReservas ? 'Todas las reservas' : 'Solo activas/futuras'}
                </span>
                <button 
                  onClick={toggleMostrarTodasReservas}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${mostrarTodasReservas ? 'bg-yellow-500' : 'bg-white/20'}`}
                  role="switch"
                  aria-checked={mostrarTodasReservas}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${mostrarTodasReservas ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misReservas.map((reserva) => (
                <div key={reserva.id} className="p-4 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg">
                  <p className="font-semibold text-xl mb-2">{reserva.instalacionNombre}</p>
                  <p><span className="font-medium">Fecha:</span> {format(new Date(reserva.fecha), 'dd/MM/yyyy')}</p>
                  <p><span className="font-medium">Hora:</span> {reserva.horaInicio} - {reserva.horaFin}</p>
                  {reserva.recurso && <p><span className="font-medium">Recurso:</span> {reserva.recurso}</p>}
                  <button 
                    onClick={() => handleCancelarReserva(reserva.id)}
                    className="mt-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={cargando}
                  >
                    {cargando ? 'Procesando...' : 'Cancelar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendario de reservas */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Cabecera de días */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="font-semibold p-2">Hora</div>
              {diasSemana.map((dia) => (
                <div key={dia.toString()} className="font-semibold p-2 text-center">
                  {format(dia, 'EEEE d', { locale: es })}
                </div>
              ))}
            </div>

            {/* Cuadrícula de reservas */}
            {instalacionSeleccionada && instalaciones[instalacionSeleccionada] && (
              <div className="space-y-1">
                {generarHoras.map((hora) => (
                  <div key={hora} className="grid grid-cols-8 gap-2">
                    <div className="p-2 font-medium">{hora}</div>
                    {diasSemana.map((dia) => (
                      <div key={`${dia}-${hora}`} className="grid gap-1">
                        {instalaciones[instalacionSeleccionada].recursos.map((recurso) => {
                          // Verifica si esta celda está reservada - VERSIÓN SIMPLIFICADA
                          const fechaFormateada = format(dia, 'yyyy-MM-dd');
                          const estaOcupada = todasLasReservas ? todasLasReservas.some(r => 
                            r.fecha === fechaFormateada && r.horaInicio === hora
                          ) : false;
                          
                          // Verifica si la reserva es del usuario actual
                          const esMiReserva = todasLasReservas && usuario ? todasLasReservas.some(r => 
                            r.fecha === fechaFormateada && 
                            r.horaInicio === hora && 
                            parseInt(r.usuarioId) === parseInt(usuario.id)
                          ) : false;
                          
                          // Las celdas con horarios pasados se muestran atenuadas
                          const horaPasada = esHoraPasada(dia, hora);
                          
                          return (
                            <button
                              key={`${dia}-${hora}-${recurso}`}
                              onClick={() => handleReservaClick(dia, hora, recurso)}
                              disabled={!puedeReservar(instalacionSeleccionada) || horaPasada || estaOcupada}
                              className={`
                                relative p-2 text-sm rounded transition-colors text-center 
                                ${horaPasada ? 'opacity-50 bg-gray-700' : ''}
                                ${!horaPasada && estaOcupada 
                                  ? esMiReserva 
                                    ? 'bg-green-700 border-2 border-green-400' /* Mi reserva */
                                    : 'bg-red-700 border-2 border-red-400' /* Reservada por otro */
                                  : 'bg-white/10 hover:bg-white/20' /* Disponible */}
                                ${!puedeReservar(instalacionSeleccionada) ? 'bg-white/5 cursor-not-allowed' : ''}
                              `}
                              title={
                                horaPasada
                                  ? 'Hora pasada'
                                  : estaOcupada
                                    ? esMiReserva ? 'Tu reserva' : 'Reservado'
                                    : 'Disponible'
                              }
                            >
                              {/* Contenido del botón */}
                              <div className={`${estaOcupada && !horaPasada ? 'text-white font-bold' : ''}`}>
                                {recurso}
                                
                                {/* Decoración visual para horas ocupadas */}
                                {estaOcupada && !horaPasada && (
                                  <div className="mt-1 flex items-center justify-center">
                                    {esMiReserva ? (
                                      <span className="text-xs px-1.5 py-0.5 bg-green-500 text-white rounded-full">TU</span>
                                    ) : (
                                      <span className="text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full">OCUPADO</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal de reserva */}
        {reservaActual && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-lime-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Confirmar Reserva</h2>
              <div className="space-y-2 mb-6">
                <p><strong>Instalación:</strong> {reservaActual.instalacion}</p>
                <p><strong>Recurso:</strong> {reservaActual.recurso}</p>
                <p><strong>Fecha:</strong> {format(new Date(reservaActual.fecha), 'dd/MM/yyyy')}</p>
                <p><strong>Hora:</strong> {reservaActual.hora}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setReservaActual(null)}
                  className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarReserva}
                  className="px-4 py-2 bg-yellow-500 text-lime-900 rounded hover:bg-yellow-400 transition-colors"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservas;
