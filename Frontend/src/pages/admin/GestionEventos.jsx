import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GestionEventos = () => {
  const { usuario } = useAuth();
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: 'Torneo Primavera',
      fecha: '2025-05-15',
      hora: '09:00',
      descripcion: 'Torneo por equipos en categorías júnior y adulto',
      imagen: '/src/assets/images/torneos.jpg'
    },
    {
      id: 2,
      titulo: 'Clase Magistral',
      fecha: '2025-05-20',
      hora: '17:00',
      descripcion: 'Clase especial con entrenador profesional',
      imagen: '/src/assets/images/clases.jpg'
    }
  ]);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    descripcion: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoEvento = {
      id: Date.now(),
      ...formData,
      imagen: '/src/assets/images/eventos-default.jpg'
    };
    setEventos([...eventos, nuevoEvento]);
    setFormData({
      titulo: '',
      fecha: '',
      hora: '',
      descripcion: ''
    });
  };

  const handleEliminarEvento = (id) => {
    setEventos(eventos.filter(evento => evento.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Gestión de Eventos</h1>

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
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white h-32"
                required
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-lime-900 rounded-lg hover:bg-yellow-400 transition-colors w-full"
              >
                Crear Evento
              </button>
            </div>
          </form>
        </div>

        {/* Lista de eventos */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Eventos Programados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventos.map(evento => (
              <div key={evento.id} className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={evento.imagen} 
                    alt={evento.titulo} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 p-2">
                    <button
                      onClick={() => handleEliminarEvento(evento.id)}
                      className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{evento.titulo}</h3>
                  <div className="flex items-center text-white/70 text-sm mb-2">
                    <span className="mr-3">{evento.fecha}</span>
                    <span>{evento.hora}</span>
                  </div>
                  <p className="text-white/80">{evento.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionEventos;