import axios from 'axios';

// Crear instancia de axios con la configuración base
// Usamos baseURL relativa para aprovechar el proxy de Vite durante el desarrollo
const API = axios.create({
  baseURL: '/ClubRaqueta/Backend/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false,
  timeout: 10000, // Timeout de 10 segundos para detectar problemas de conexión más rápido
});

// Añadir un interceptor para manejar errores
API.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en petición API:', error);
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Respuesta del servidor:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
    } else {
      // Algo ocurrió al configurar la petición
      console.error('Error de configuración de la petición:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Función para iniciar sesión de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const loginUsuario = async (email, password) => {
  try {
    // Usar el endpoint login.php en la raíz del proyecto que tiene encabezados CORS correctos
    const response = await fetch('http://localhost/ClubRaqueta/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    
    if (data && data.success && data.usuario) {
      return data.usuario;
    } else {
      throw data || { error: 'Error al iniciar sesión' };
    }
  } catch (error) {
    console.error('Error completo:', error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.error) {
      throw error;
    } else {
      throw { error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Guarda los datos del usuario en localStorage
 * @param {Object} userData - Datos del usuario a guardar
 */
export const guardarUsuario = (userData) => {
  localStorage.setItem('usuario', JSON.stringify(userData));
};

/**
 * Obtiene los datos del usuario desde localStorage
 * @returns {Object|null} - Datos del usuario o null si no existe
 */
export const obtenerUsuario = () => {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
};

/**
 * Elimina los datos del usuario de localStorage
 */
export const cerrarSesion = () => {
  localStorage.removeItem('usuario');
};

/**
 * Crea una nueva reserva
 * @param {Object} datos - Datos de la reserva (usuarioId, instalacionId, fecha, horaInicio, horaFin)
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const crearReserva = async (datos) => {
  try {
    console.log('Datos enviados para crear reserva:', datos);
    
    // Normalizar los nombres de los campos para el backend
    const datosParaEnviar = {
      usuarioId: datos.usuario_id || datos.usuarioId,
      instalacionId: datos.instalacion_id || datos.instalacionId,
      fecha: datos.fecha,
      horaInicio: datos.hora_inicio || datos.horaInicio,
      horaFin: datos.hora_fin || datos.horaFin
    };
    
    console.log('Datos normalizados:', datosParaEnviar);
    
    // Realizar la petición al servidor
    const response = await API.post('api/reservas.php', datosParaEnviar);
    console.log('Respuesta del servidor (crear):', response.data);
    return response.data;
  } catch (error) {
    console.error('Error completo al crear reserva:', error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.message === 'Network Error') {
      console.error('Error de red al conectar con el servidor');
      throw { success: false, error: 'Error de conexión con el servidor. Verifica tu conexión a internet y que el servidor esté activo.' };
    } else {
      throw { success: false, error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Obtiene las reservas de un usuario o todas las reservas (para administradores)
 * @param {number|string} usuarioId - ID del usuario o 'all' para todas las reservas
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const obtenerReservas = async (usuarioId) => {
  try {
    // Si el usuarioId es 'all', no incluimos el parámetro usuario_id
    // El backend devolverá todas las reservas cuando no hay usuario_id
    const url = usuarioId === 'all' 
      ? 'api/reservas.php' 
      : `api/reservas.php?usuario_id=${usuarioId}`;
      
    console.log('Obteniendo reservas:', url);
    const response = await API.get(url);
    console.log('Respuesta del servidor:', response.data);
    
    if (response.data && response.data.success && response.data.reservas) {
      // Normalizar los nombres de las propiedades para que coincidan con lo que espera el frontend
      return response.data.reservas.map(reserva => ({
        id: reserva.id,
        usuarioId: reserva.usuarioId || reserva.usuario_id,
        usuarioNombre: reserva.usuarioNombre || reserva.usuario_nombre,
        instalacionId: reserva.instalacionId || reserva.instalacion_id,
        instalacionNombre: reserva.instalacionNombre || reserva.instalacion_nombre,
        fecha: reserva.fecha,
        horaInicio: reserva.horaInicio || reserva.hora_inicio,
        horaFin: reserva.horaFin || reserva.hora_fin,
        fechaCreacion: reserva.fechaCreacion || reserva.fecha_creacion
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error completo al obtener reservas:', error);
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { success: false, error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Cancela una reserva
 * @param {number} reservaId - ID de la reserva
 * @param {number} usuarioId - ID del usuario que cancelá la reserva
 * @param {boolean} esAdmin - Si el usuario es administrador
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const cancelarReserva = async (reservaId, usuarioId, esAdmin = false) => {
  try {
    console.log('Cancelando reserva:', { reservaId, usuarioId, esAdmin });
    // Verificar que todos los parámetros estén presentes
    if (!reservaId) {
      throw { success: false, error: 'ID de reserva no proporcionado' };
    }
    
    if (!usuarioId && !esAdmin) {
      throw { success: false, error: 'ID de usuario no proporcionado' };
    }
    
    // Convertir esAdmin a string para asegurarse de que se envía correctamente en la URL
    const esAdminParam = esAdmin ? 'true' : 'false';
    
    // Construir la URL con todos los parámetros necesarios
    const url = `api/reservas.php?id=${reservaId}&usuario_id=${usuarioId || 0}&es_admin=${esAdminParam}`;
    console.log('URL para cancelar reserva:', url);
    
    const response = await API.delete(url);
    console.log('Respuesta del servidor (cancelar):', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error completo al cancelar reserva:', error);
    
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.success === false) {
      throw error;
    } else {
      throw { success: false, error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Obtiene todas las instalaciones disponibles
 * @returns {Promise<Array>} - Promesa con el array de instalaciones
 */
export const obtenerInstalaciones = async () => {
  try {
    console.log('Obteniendo instalaciones');
    const response = await API.get('api/instalaciones.php');
    console.log('Respuesta de instalaciones:', response.data);
    
    if (response.data && response.data.success && Array.isArray(response.data.instalaciones)) {
      // Normalizar los nombres de las propiedades para el frontend
      // Añadir propiedades adicionales que pueda necesitar el componente Reservas.jsx
      return response.data.instalaciones.map(instalacion => ({
        id: instalacion.id,
        nombre: instalacion.nombre,
        tipo: instalacion.tipo || 'general',
        descripcion: instalacion.descripcion || '',
        capacidad: instalacion.capacidad || 4,
        duracion_reserva: instalacion.duracion_reserva || 60,
        hora_apertura: instalacion.hora_apertura || '09:00',
        hora_cierre: instalacion.hora_cierre || '21:00',
        requiere_socio: instalacion.requiere_socio || false
      }));
    }
    
    // Si la respuesta no tiene el formato esperado, devolvemos un array vacío
    // pero también lanzamos un error para que se muestre al usuario
    console.error('La respuesta no tiene el formato esperado:', response.data);
    throw { success: false, error: 'No se pudieron cargar las instalaciones desde el servidor' };
  } catch (error) {
    console.error('Error completo al obtener instalaciones:', error);
    // Lanzamos el error para que el componente pueda mostrarlo
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.success === false) {
      throw error;
    } else {
      throw { success: false, error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Obtiene el detalle de una instalación específica
 * @param {number} instalacionId - ID de la instalación
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const obtenerDetalleInstalacion = async (instalacionId) => {
  try {
    // Por ahora usamos el endpoint general y filtramos el resultado
    const response = await API.get('api/instalaciones.php');
    if (response.data && response.data.success && response.data.instalaciones) {
      const instalacion = response.data.instalaciones.find(i => i.id === instalacionId);
      if (instalacion) {
        return { success: true, instalacion };
      } else {
        throw { success: false, error: 'Instalación no encontrada' };
      }
    } else {
      throw response.data || { success: false, error: 'Error al obtener instalaciones' };
    }
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.success === false) {
      throw error;
    } else {
      throw { success: false, error: 'Error al obtener detalle de instalación' };
    }
  }
};

export default API;
