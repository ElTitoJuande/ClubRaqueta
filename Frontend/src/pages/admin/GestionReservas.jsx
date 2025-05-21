import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerReservas, cancelarReserva } from '../../services/api';

const GestionReservas = () => {
  const { usuario } = useAuth();
  const [listaReservas, setListaReservas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroInstalacion, setFiltroInstalacion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Cargar reservas cuando el componente se monta
  useEffect(() => {
    const cargarTodasLasReservas = async () => {
      if (usuario && usuario.rol === 'ADMIN') {
        setCargando(true);
        try {
          // Para un admin, queremos cargar todas las reservas
          // Como el endpoint actual solo trae por usuario, usamos un usuario admin
          const todasReservas = await obtenerReservas(usuario.id);
          setListaReservas(todasReservas);
          setError('');
        } catch (err) {
          console.error('Error al cargar reservas:', err);
          setError('Error al cargar las reservas. Por favor, intenta nuevamente.');
        } finally {
          setCargando(false);
        }
      }
    };
    
    cargarTodasLasReservas();
  }, [usuario]);
  
  // Verificar permisos de administrador
  if (!usuario || usuario.rol !== 'ADMIN') {
    return <Navigate to="/login" />;
  }

  const handleCancelarReserva = async (reservaId) => {
    setError('');
    setSuccess('');
    setCargando(true);
    
    try {
      const resultado = await cancelarReserva(reservaId);
      if (resultado.success) {
        // Recargar las reservas para tener datos actualizados
        const todasReservas = await obtenerReservas(usuario.id);
        setListaReservas(todasReservas);
        setSuccess('Reserva cancelada correctamente');
      } else {
        setError(resultado.error || 'Error al cancelar la reserva');
      }
    } catch (err) {
      console.error('Error al cancelar reserva:', err);
      setError(err.error || 'Error al cancelar la reserva');
    } finally {
      setCargando(false);
    }
  };

  const reservasFiltradas = listaReservas.filter(reserva => {
    let cumpleFiltroFecha = true;
    let cumpleFiltroInstalacion = true;

    if (filtroFecha) {
      cumpleFiltroFecha = reserva.fecha === filtroFecha;
    }
    
    if (filtroInstalacion) {
      cumpleFiltroInstalacion = reserva.instalacion.includes(filtroInstalacion);
    }

    return cumpleFiltroFecha && cumpleFiltroInstalacion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Gestión de Reservas</h1>

        {/* Filtros */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Filtros</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-white p-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-white mb-2">Fecha</label>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Instalación</label>
              <select
                value={filtroInstalacion}
                onChange={(e) => setFiltroInstalacion(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="">Todas</option>
                <option value="Tenis">Pistas de Tenis</option>
                <option value="Pádel">Pistas de Pádel</option>
                <option value="Gimnasio">Gimnasio</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFiltroFecha('');
                  setFiltroInstalacion('');
                }}
                className="px-4 py-2 bg-yellow-500 text-lime-900 rounded-lg hover:bg-yellow-400 transition-colors w-full"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de reservas */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Reservas</h2>
          
          {reservasFiltradas.length === 0 ? (
            <p className="text-white/80 text-center py-8">No hay reservas que coincidan con los filtros.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-4 py-2 text-white">ID</th>
                    <th className="px-4 py-2 text-white">Usuario</th>
                    <th className="px-4 py-2 text-white">Instalación</th>
                    <th className="px-4 py-2 text-white">Recurso</th>
                    <th className="px-4 py-2 text-white">Fecha</th>
                    <th className="px-4 py-2 text-white">Hora</th>
                    <th className="px-4 py-2 text-white">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {reservasFiltradas.map(reserva => {
                    return (
                      <tr key={reserva.id} className="hover:bg-white/10">
                        <td className="px-4 py-2 text-white">{reserva.id}</td>
                        <td className="px-4 py-2 text-white">{reserva.usuario_nombre || 'Usuario ' + reserva.usuario_id}</td>
                        <td className="px-4 py-2 text-white">{reserva.instalacion}</td>
                        <td className="px-4 py-2 text-white">-</td>
                        <td className="px-4 py-2 text-white">{reserva.fecha}</td>
                        <td className="px-4 py-2 text-white">{reserva.hora_inicio} - {reserva.hora_fin}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleCancelarReserva(reserva.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                            disabled={cargando}
                          >
                            {cargando ? 'Procesando...' : 'Cancelar'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionReservas;