import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerReservas, cancelarReserva, obtenerInstalaciones } from '../../services/api';
import { format } from 'date-fns';

const MisReservas = () => {
  const { usuario } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [instalaciones, setInstalaciones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({
    fecha: '',
    instalacion: '',
    estado: ''
  });
  
  // Verificar que el usuario es socio
  if (!usuario || usuario.rol !== 'SOCIO') {
    return <Navigate to="/login" />;
  }
  
  // Cargar reservas del usuario
  useEffect(() => {
    const cargarReservas = async () => {
      if (!usuario || !usuario.id) return;
      
      setCargando(true);
      setError('');
      
      try {
        const reservasData = await obtenerReservas(usuario.id);
        console.log('Reservas cargadas:', reservasData);
        setReservas(reservasData || []);
      } catch (err) {
        console.error('Error al cargar reservas:', err);
        setError('Error al cargar tus reservas. Por favor, intenta nuevamente.');
      } finally {
        setCargando(false);
      }
    };
    
    cargarReservas();
  }, [usuario]);
  
  // Cargar instalaciones para el filtro
  useEffect(() => {
    const cargarInstalaciones = async () => {
      try {
        const instalacionesData = await obtenerInstalaciones();
        setInstalaciones(instalacionesData || []);
      } catch (err) {
        console.error('Error al cargar instalaciones:', err);
      }
    };
    
    cargarInstalaciones();
  }, []);
  
  // Manejar cambios en los filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: value
    }));
  };
  
  // Filtrar reservas según los criterios seleccionados
  const reservasFiltradas = reservas.filter(reserva => {
    // Filtrar por fecha
    if (filtros.fecha && reserva.fecha !== filtros.fecha) {
      return false;
    }
    
    // Filtrar por instalación
    if (filtros.instalacion && reserva.instalacionId.toString() !== filtros.instalacion) {
      return false;
    }
    
    // Filtrar por estado (pendientes/historial)
    // Asumimos que las reservas futuras son "pendientes" y las pasadas son "historial"
    const fechaReserva = new Date(reserva.fecha + 'T' + reserva.horaInicio);
    const ahora = new Date();
    const esPendiente = fechaReserva > ahora;
    
    if (filtros.estado === 'pendiente' && !esPendiente) {
      return false;
    }
    
    if (filtros.estado === 'historial' && esPendiente) {
      return false;
    }
    
    return true;
  });
  
  // Separar reservas en pendientes e historial
  const obtenerReservasPendientes = () => {
    const ahora = new Date();
    return reservasFiltradas.filter(reserva => {
      const fechaReserva = new Date(reserva.fecha + 'T' + reserva.horaInicio);
      return fechaReserva > ahora;
    });
  };
  
  const obtenerHistorialReservas = () => {
    const ahora = new Date();
    return reservasFiltradas.filter(reserva => {
      const fechaReserva = new Date(reserva.fecha + 'T' + reserva.horaInicio);
      return fechaReserva <= ahora;
    });
  };
  
  // Manejar cancelación de reserva
  const handleCancelarReserva = async (reservaId) => {
    if (!reservaId || !usuario || !usuario.id) return;
    
    setCargando(true);
    setError('');
    
    try {
      const resultado = await cancelarReserva(reservaId, usuario.id);
      
      if (resultado.success) {
        // Recargar las reservas para actualizar la lista
        const reservasActualizadas = await obtenerReservas(usuario.id);
        setReservas(reservasActualizadas || []);
      } else {
        setError(resultado.error || 'Error al cancelar la reserva');
      }
    } catch (err) {
      console.error('Error al cancelar reserva:', err);
      setError(err.error || 'Error al cancelar la reserva. Por favor, intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };
  
  // Formatear fecha para mostrar
  const formatearFecha = (fechaStr) => {
    try {
      const fecha = new Date(fechaStr);
      return format(fecha, 'dd/MM/yyyy');
    } catch (err) {
      return fechaStr;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Mis Reservas</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg mb-6 text-center text-white">
            {error}
          </div>
        )}
        
        {cargando && (
          <div className="bg-blue-500/20 border border-blue-500 p-4 rounded-lg mb-6 text-center text-white">
            Cargando datos...
          </div>
        )}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white mb-2">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={filtros.fecha}
                onChange={handleFiltroChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Instalación</label>
              <select
                name="instalacion"
                value={filtros.instalacion}
                onChange={handleFiltroChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="">Todas</option>
                {instalaciones.map(instalacion => (
                  <option key={instalacion.id} value={instalacion.id}>
                    {instalacion.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Estado</label>
              <select
                name="estado"
                value={filtros.estado}
                onChange={handleFiltroChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendientes</option>
                <option value="historial">Historial</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Reservas Pendientes</h2>
          <div className="overflow-x-auto">
            {obtenerReservasPendientes().length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-4 py-2 text-white">Instalación</th>
                    <th className="px-4 py-2 text-white">Fecha</th>
                    <th className="px-4 py-2 text-white">Hora</th>
                    <th className="px-4 py-2 text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {obtenerReservasPendientes().map(reserva => (
                    <tr key={reserva.id} className="hover:bg-white/10">
                      <td className="px-4 py-2 text-white">{reserva.instalacionNombre}</td>
                      <td className="px-4 py-2 text-white">{formatearFecha(reserva.fecha)}</td>
                      <td className="px-4 py-2 text-white">{reserva.horaInicio} - {reserva.horaFin}</td>
                      <td className="px-4 py-2">
                        <button 
                          onClick={() => handleCancelarReserva(reserva.id)}
                          disabled={cargando}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                          {cargando ? 'Procesando...' : 'Cancelar'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-white py-4">
                No tienes reservas pendientes.  
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Historial de Reservas</h2>
          <div className="overflow-x-auto">
            {obtenerHistorialReservas().length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-4 py-2 text-white">Instalación</th>
                    <th className="px-4 py-2 text-white">Fecha</th>
                    <th className="px-4 py-2 text-white">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {obtenerHistorialReservas().map(reserva => (
                    <tr key={reserva.id} className="hover:bg-white/10">
                      <td className="px-4 py-2 text-white">{reserva.instalacionNombre}</td>
                      <td className="px-4 py-2 text-white">{formatearFecha(reserva.fecha)}</td>
                      <td className="px-4 py-2 text-white">{reserva.horaInicio} - {reserva.horaFin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-white py-4">
                No tienes historial de reservas.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisReservas;