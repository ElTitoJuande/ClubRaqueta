import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { obtenerEventosAdmin, crearEventoAdmin, eliminarEventoAdmin, actualizarEventoAdmin } from '../../services/eventosService';

const GestionEventos = () => {
  const { usuario } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    fecha_fin: '',
    hora_fin: '',
    descripcion: '',
    ubicacion: 'Club Raqueta',
    tipo_evento: 'general',
    plazas: 0,
    imagen: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

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
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      // Manejo de archivos (imágenes)
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        
        // Crear una URL para previsualizar la imagen
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        fileReader.readAsDataURL(file);
      }
    } else {
      // Manejo de otros campos del formulario
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const resetForm = () => {
    setFormData({
      titulo: '',
      fecha: '',
      hora: '',
      fecha_fin: '',
      hora_fin: '',
      descripcion: '',
      ubicacion: 'Club Raqueta',
      tipo_evento: 'general',
      plazas: 0,
      imagen: ''
    });
    setEditMode(false);
    setCurrentEventId(null);
    setSelectedFile(null);
    setPreviewImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Validar la fecha y hora
      const fechaActual = new Date();
      const fechaEvento = new Date(formData.fecha + 'T' + formData.hora);
      
      // Solo validamos que la fecha no sea pasada si estamos creando un evento nuevo
      // o si estamos editando pero hemos cambiado la fecha
      if (!editMode && fechaEvento < fechaActual) {
        throw new Error('La fecha y hora del evento no puede ser anterior a la fecha actual');
      }
      
      // Validar que la fecha de fin no sea anterior a la de inicio
      if (formData.fecha_fin && formData.hora_fin) {
        const fechaFinEvento = new Date(formData.fecha_fin + 'T' + formData.hora_fin);
        if (fechaFinEvento < fechaEvento) {
          throw new Error('La fecha y hora de finalización no puede ser anterior a la de inicio');
        }
      } else {
        // Si no se proporciona fecha u hora de fin, usar las de inicio
        formData.fecha_fin = formData.fecha;
        formData.hora_fin = formData.hora;
      }

      // Validar que las plazas sean un número no negativo
      const plazas = parseInt(formData.plazas);
      if (isNaN(plazas) || plazas < 0) {
        throw new Error('Las plazas deben ser un número no negativo');
      }
      formData.plazas = plazas;
      
      // Si hay una imagen seleccionada, aquí se manejaría la subida
      // Nota: Este es un ejemplo, la implementación real podría requerir un servicio para subir archivos
      if (selectedFile) {
        formData.imagen = previewImage; // En un caso real, esto sería la URL después de subir la imagen
      }
      
      let resultado;
      let mensaje;
      
      if (editMode) {
        // Actualizar el evento existente
        const eventoActualizado = { ...formData, id: currentEventId };
        resultado = await actualizarEventoAdmin(eventoActualizado);
        
        if (resultado.success) {
          // Actualizar el evento en el estado local
          setEventos(eventos.map(evento => 
            evento.id === currentEventId ? { ...eventoActualizado, id: currentEventId } : evento
          ));
          mensaje = 'Evento actualizado exitosamente';
        }
      } else {
        // Crear un nuevo evento
        const nuevoEvento = await crearEventoAdmin(formData);
        setEventos([...eventos, nuevoEvento]);
        mensaje = 'Evento creado exitosamente';
      }
      
      // Resetear el formulario
      resetForm();
      setError(null);
      
      // Mostrar mensaje de éxito (podría implementarse un estado para mensajes de éxito)
      alert(mensaje);
    } catch (err) {
      console.error('Error al procesar evento:', err);
      setError(err.message || 'No se pudo procesar el evento. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminarEvento = async (id) => {
    if (!window.confirm('¿Está seguro que desea eliminar este evento?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      await eliminarEventoAdmin(id);
      setEventos(eventos.filter(evento => evento.id !== id));
      setError(null);
      
      // Si estamos editando el evento que se está eliminando, resetear el formulario
      if (editMode && currentEventId === id) {
        resetForm();
      }
    } catch (err) {
      console.error('Error al eliminar evento:', err);
      setError('No se pudo eliminar el evento. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditarEvento = (evento) => {
    // Formatear las fechas para el formato requerido por el input type="date"
    const formatearFecha = (fechaString) => {
      if (!fechaString) return '';
      const fecha = new Date(fechaString);
      return fecha.toISOString().split('T')[0];
    };
    
    setFormData({
      titulo: evento.titulo || '',
      fecha: formatearFecha(evento.fecha),
      hora: evento.hora || '',
      fecha_fin: formatearFecha(evento.fecha_fin) || formatearFecha(evento.fecha),
      hora_fin: evento.hora_fin || evento.hora || '',
      descripcion: evento.descripcion || '',
      ubicacion: evento.ubicacion || 'Club Raqueta',
      tipo_evento: evento.tipo_evento || 'general',
      plazas: evento.plazas || 0,
      imagen: evento.imagen || ''
    });
    
    // Si el evento tiene una imagen, mostrarla en la previsualización
    if (evento.imagen && evento.imagen !== '/src/assets/images/eventos-default.jpg') {
      setPreviewImage(evento.imagen);
    } else {
      setPreviewImage('');
    }
    
    setEditMode(true);
    setCurrentEventId(evento.id);
    
    // Hacer scroll hacia arriba para que el usuario vea el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {/* Formulario para crear o editar evento */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{editMode ? 'Editar Evento' : 'Crear Nuevo Evento'}</h2>
            {editMode && (
              <button 
                onClick={resetForm}
                className="text-white/70 hover:text-white text-sm flex items-center"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancelar edición
              </button>
            )}
          </div>
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
                Ubicación
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div className="md:col-span-2 mb-2">
              <h3 className="font-medium text-white border-b border-white/20 pb-1 mb-3">Fecha y Hora</h3>
            </div>

            <div>
              <label className="block text-white mb-2">
                Fecha de Inicio
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
                Hora de Inicio
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

            <div>
              <label className="block text-white mb-2">
                Fecha de Finalización
              </label>
              <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                placeholder="Igual a la fecha de inicio si se omite"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Hora de Finalización
              </label>
              <input
                type="time"
                name="hora_fin"
                value={formData.hora_fin}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                placeholder="Igual a la hora de inicio si se omite"
              />
            </div>

            <div className="md:col-span-2 mb-2">
              <h3 className="font-medium text-white border-b border-white/20 pb-1 mb-3">Detalles del Evento</h3>
            </div>

            <div>
              <label className="block text-white mb-2">
                Tipo de Evento
              </label>
              <select
                name="tipo_evento"
                value={formData.tipo_evento}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              >
                <option value="general">General</option>
                <option value="torneo">Torneo</option>
                <option value="clase">Clase</option>
                <option value="social">Evento Social</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">
                Plazas Disponibles
              </label>
              <input
                type="number"
                name="plazas"
                value={formData.plazas}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                min="0"
                placeholder="0 = sin límite"
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

            {/* Subida de imagen */}
            <div className="md:col-span-2 mb-2">
              <h3 className="font-medium text-white border-b border-white/20 pb-1 mb-3">Imagen del Evento</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-white mb-2">
                Imagen (opcional)
              </label>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <input
                  type="file"
                  name="imagen"
                  onChange={handleChange}
                  accept="image/*"
                  className="text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-yellow-500/50 file:text-white hover:file:bg-yellow-500/70"
                />
                {previewImage && (
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                    <img 
                      src={previewImage} 
                      alt="Vista previa" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewImage('');
                      }}
                      className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className="text-white/70 text-xs mt-2">Formatos recomendados: JPG, PNG. Tamaño máximo: 2MB</p>
            </div>

            <div className="md:col-span-2 mt-4">
              <button 
                type="submit" 
                className="bg-yellow-500 text-lime-900 px-6 py-2 rounded-lg hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (editMode ? 'Actualizando...' : 'Creando...') : (editMode ? 'Actualizar Evento' : 'Crear Evento')}
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
                    <span className="inline-block px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full">
                      {evento.tipo_evento ? evento.tipo_evento.charAt(0).toUpperCase() + evento.tipo_evento.slice(1) : 'General'}
                    </span>
                  </div>
                  
                  {/* Fechas y horarios */}
                  <div className="mt-3 mb-3 text-gray-300 text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Inicio: </span>
                      <span className="ml-1">
                        {new Date(evento.fecha + 'T' + evento.hora).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    {(evento.fecha_fin && evento.hora_fin && (evento.fecha_fin !== evento.fecha || evento.hora_fin !== evento.hora)) && (
                      <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Fin: </span>
                        <span className="ml-1">
                          {new Date(evento.fecha_fin + 'T' + evento.hora_fin).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Ubicación */}
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {evento.ubicacion || 'Club Raqueta'}
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-gray-400 text-sm mb-3 pb-2 border-b border-white/10">{evento.descripcion}</p>
                  
                  {/* Plazas disponibles */}
                  <div className="flex items-center text-sm mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-yellow-400">
                      {evento.plazas > 0 ? `Plazas: ${evento.plazas_disponibles || evento.plazas} / ${evento.plazas}` : 'Sin límite de plazas'}
                    </span>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button 
                      onClick={() => handleEditarEvento(evento)}
                      className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded hover:bg-yellow-600/40 transition-all"
                      disabled={isLoading}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleEliminarEvento(evento.id)}
                      className="bg-red-600/20 text-red-400 px-3 py-1 rounded hover:bg-red-600/40 transition-all"
                      disabled={isLoading}
                    >
                      Eliminar
                    </button>
                  </div>
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