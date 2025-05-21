import axios from 'axios';

// Crear instancia de axios con la configuración base
const API = axios.create({
  baseURL: 'http://localhost/ClubRaqueta/Backend/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

/**
 * Función para iniciar sesión de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const loginUsuario = async (email, password) => {
  try {
    const response = await API.post('auth.php', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
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
 * @param {Object} datos - Datos de la reserva (usuario_id, instalacion_id, fecha, hora_inicio, hora_fin)
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const crearReserva = async (datos) => {
  try {
    const response = await API.post('reservas.php?action=create', datos);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { success: false, error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Obtiene las reservas de un usuario
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const obtenerReservas = async (usuarioId) => {
  try {
    const response = await API.get(`reservas.php?action=listar&id=${usuarioId}`);
    return response.data;
  } catch (error) {
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
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const cancelarReserva = async (reservaId) => {
  try {
    const response = await API.delete(`reservas.php?action=cancelar&id=${reservaId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { success: false, error: 'Error en la conexión con el servidor' };
    }
  }
};

/**
 * Obtiene todas las instalaciones disponibles
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const obtenerInstalaciones = async () => {
  try {
    const response = await API.get('instalaciones.php?action=listar');
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { success: false, error: 'Error al obtener instalaciones' };
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
    const response = await API.get(`instalaciones.php?action=detalle&id=${instalacionId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw { success: false, error: 'Error al obtener detalle de instalación' };
    }
  }
};

export default API;
