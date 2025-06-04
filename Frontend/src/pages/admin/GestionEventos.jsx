import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerEventosAdmin, crearEventoAdmin, eliminarEventoAdmin } from '../../services/eventosService';

const GestionEventos = () => {
  const { usuario } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    descripcion: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar eventos al iniciar
  useEffect(() => {
    const cargarEventos = async () => {
      setIsLoading(true);
      try {
        const eventosData = await obtenerEventosAdmin();
        setEventos(eventosData);
        setError(null);
      } catch (err) {
        console.error('Error al cargar eventos:', err);
        setError('No se pudieron cargar los eventos. Intente nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    if (usuario && usuario.rol === 'ADMIN') {
      cargarEventos();
    }
  }, [usuario]);

  // Verificar permisos de administrador
  if (!usuario || usuario.rol !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Acceso Denegado</h2>
          <p className="mb-6">No tienes permisos para acceder a esta sección.</p>
          <Link
            to="/"
            className="bg-yellow-500 text-lime-900 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-all inline-block"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const nuevoEvento = await crearEventoAdmin(formData);
      setEventos([...eventos, nuevoEvento]);
      setFormData({
        titulo: '',
        fecha: '',
        hora: '',
        descripcion: ''
      });
      setError(null);
    } catch (err) {
      console.error('Error al crear evento:', err);
      setError('No se pudo crear el evento. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminarEvento = async (id) => {
    setIsLoading(true);
    try {
      await eliminarEventoAdmin(id);
      setEventos(eventos.filter(evento => evento.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error al eliminar evento:', err);
      setError('No se pudo eliminar el evento. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Gestión de Eventos</h1>

        {/* Mensajes de error o carga */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        {isLoading && (
          <div className="bg-white/10 backdrop-blur-lg p-4 rounded-lg mb-6 text-white text-center">
            Cargando...
          </div>
        )}

        {/* Formulario para crear evento */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Crear Nuevo Evento</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-2">
                Título
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Hora
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="bg-yellow-500 text-lime-900 px-6 py-2 rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Creando...' : 'Crear Evento'}
              </button>
            </div>
          </form>
        </div>

        {/* Listado de eventos */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Eventos Actuales</h2>
          
          {eventos.length === 0 ? (
            <p className="text-white/70 text-center py-8">No hay eventos creados.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventos.map(evento => (
                <div key={evento.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-white">{evento.titulo}</h3>
                    <button
                      onClick={() => handleEliminarEvento(evento.id)} 
                      className="text-red-400 hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-white/70 text-sm mt-1">
                    {new Date(evento.fecha + 'T' + evento.hora).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-white/90 mt-2">{evento.descripcion}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionEventos;