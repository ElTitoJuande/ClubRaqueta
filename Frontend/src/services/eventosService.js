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
    // Implementar cuando la API esté lista
    // const response = await API.get('/api/eventos');
    // return response.data;
    
    // Por ahora devolver datos de ejemplo
    return Promise.resolve(eventosMock);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    // Fallback a datos de ejemplo en caso de error
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
    // Implementar cuando la API esté lista
    // const response = await API.post('/api/eventos', evento);
    // return response.data;
    
    // Simular respuesta exitosa
    const nuevoEvento = {
      id: Date.now(),
      ...evento,
      imagen: evento.imagen || '/src/assets/images/eventos-default.jpg'
    };
    return Promise.resolve(nuevoEvento);
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
    // Implementar cuando la API esté lista
    // await API.delete(`/api/eventos/${id}`);
    
    // Simular respuesta exitosa
    return Promise.resolve({ success: true });
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
};
