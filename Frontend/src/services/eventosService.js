import API from './api';

// Eventos mock para desarrollo (se usarán si la API falla o no está disponible)
const eventosMock = [
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
];

/**
 * Obtiene la lista de eventos desde el backend
 * @returns {Promise<Array>} - Lista de eventos
 */
export const obtenerEventosAdmin = async () => {
  try {
    // Obtener eventos desde la API
    const response = await API.get('api/eventos.php');
    
    // Verificar si se recibieron datos
    if (response.data && Array.isArray(response.data)) {
      // Transformar el formato de datos del backend al formato esperado por el frontend
      return response.data.map(evento => ({
        id: evento.id,
        titulo: evento.titulo,
        fecha: evento.fecha_inicio, // Usamos fecha_inicio como fecha principal
        hora: evento.hora_inicio, // Usamos hora_inicio como hora principal
        descripcion: evento.descripcion,
        imagen: evento.imagen || '/src/assets/images/eventos-default.jpg',
        // Datos adicionales que podemos necesitar
        fecha_fin: evento.fecha_fin,
        hora_fin: evento.hora_fin,
        tipo_evento: evento.tipo_evento,
        ubicacion: evento.ubicacion,
        estado: evento.estado,
        plazas: evento.plazas,
        plazas_disponibles: evento.plazas_disponibles
      }));
    }
    
    console.warn('No se recibieron datos de eventos, usando fallback');
    return eventosMock;
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    // Fallback a datos de ejemplo en caso de error
    console.warn('Usando datos de ejemplo debido al error');
    return eventosMock;
  }
};

/**
 * Crea un nuevo evento
 * @param {Object} evento - Datos del evento a crear
 * @returns {Promise<Object>} - Evento creado
 */
export const crearEventoAdmin = async (evento) => {
  try {
    // Transformar datos del formato del frontend al formato esperado por el backend
    const eventoParaBackend = {
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha_inicio: evento.fecha, // Frontend tiene 'fecha', backend espera 'fecha_inicio'
      hora_inicio: evento.hora,   // Frontend tiene 'hora', backend espera 'hora_inicio'
      fecha_fin: evento.fecha_fin || evento.fecha, // Si no hay fecha_fin, usar la misma fecha
      hora_fin: evento.hora_fin || evento.hora,    // Si no hay hora_fin, usar la misma hora
      imagen: evento.imagen || '/src/assets/images/eventos-default.jpg',
      tipo_evento: evento.tipo_evento || 'general', // Valor por defecto
      ubicacion: evento.ubicacion || 'Club Raqueta', // Valor por defecto
      plazas: evento.plazas || 0, // Valor por defecto (0 = sin límite)
      estado: 'activo' // Por defecto, el evento está activo
    };
    
    // Enviar datos a la API
    const response = await API.post('api/eventos.php', eventoParaBackend);
    
    if (response.data && response.data.id) {
      // Crear objeto de evento con el ID generado y los datos originales
      const nuevoEvento = {
        id: response.data.id,
        ...evento,
        imagen: evento.imagen || '/src/assets/images/eventos-default.jpg'
      };
      return nuevoEvento;
    } else {
      throw new Error('No se recibió un ID válido para el evento creado');
    }
  } catch (error) {
    console.error('Error al crear evento:', error);
    throw error;
  }
};

/**
 * Elimina un evento por su ID
 * @param {number} id - ID del evento a eliminar
 * @returns {Promise<Object>} - Respuesta de la operación
 */
export const eliminarEventoAdmin = async (id) => {
  try {
    // Preparar los datos para enviar en formato JSON
    const datos = { id: id };
    
    // En DELETE el cuerpo de la solicitud se puede enviar de esta manera con axios
    const response = await API.delete('api/eventos.php', { data: datos });
    
    // Verificar la respuesta
    if (response.data && response.data.mensaje) {
      return { success: true, mensaje: response.data.mensaje };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
};

/**
 * Actualiza un evento existente
 * @param {Object} evento - Datos del evento a actualizar (debe incluir id)
 * @returns {Promise<Object>} - Respuesta de la operación
 */
export const actualizarEventoAdmin = async (evento) => {
  try {
    if (!evento.id) {
      throw new Error('El ID del evento es requerido para la actualización');
    }
    
    // Transformar datos del formato del frontend al formato esperado por el backend
    const eventoParaBackend = {
      id: evento.id,
      titulo: evento.titulo,
      descripcion: evento.descripcion,
      fecha_inicio: evento.fecha, // Frontend tiene 'fecha', backend espera 'fecha_inicio'
      hora_inicio: evento.hora,   // Frontend tiene 'hora', backend espera 'hora_inicio'
      fecha_fin: evento.fecha_fin || evento.fecha, // Si no hay fecha_fin, usar la misma fecha
      hora_fin: evento.hora_fin || evento.hora,    // Si no hay hora_fin, usar la misma hora
      imagen: evento.imagen || '/src/assets/images/eventos-default.jpg',
      tipo_evento: evento.tipo_evento || 'general',
      ubicacion: evento.ubicacion || 'Club Raqueta',
      plazas: evento.plazas || 0,
      estado: evento.estado || 'activo'
    };
    
    // Enviar datos a la API
    const response = await API.put('api/eventos.php', eventoParaBackend);
    
    // Verificar la respuesta
    if (response.data && response.data.mensaje) {
      return { success: true, mensaje: response.data.mensaje, id: evento.id };
    } else {
      throw new Error('No se recibió una respuesta válida del servidor');
    }
  } catch (error) {
    console.error('Error al actualizar evento:', error);
    throw error;
  }
};
