// Base URL para las peticiones API
const API_URL = 'http://localhost/ClubRaqueta/Backend/api';

// Definición de roles y sus permisos
export const ROLES = {
  ADMIN: {
    nombre: 'Administrador',
    permisos: ['TODAS_LAS_INSTALACIONES', 'GESTIONAR_USUARIOS', 'GESTIONAR_RESERVAS']
  },
  SOCIO: {
    nombre: 'Socio',
    permisos: ['TODAS_LAS_INSTALACIONES']
  },
  INVITADO: {
    nombre: 'Invitado',
    permisos: ['SOLO_RESTAURANTE']
  }
};

// =========================
// FUNCIONES DE AUTENTICACIÓN
// =========================

// Función para iniciar sesión
export const iniciarSesion = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// =========================
// FUNCIONES DE USUARIOS
// =========================

// Función para obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const response = await fetch(`${API_URL}/usuarios.php`);
    const data = await response.json();
    return { success: true, usuarios: data };
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return { success: false, error: 'Error al cargar los usuarios' };
  }
};

// Función para registrar un nuevo usuario
export const registrarUsuario = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/usuarios.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// Función para actualizar un usuario existente
export const actualizarUsuario = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/usuarios.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// =========================
// FUNCIONES DE INSTALACIONES
// =========================

// Función para obtener todas las instalaciones
export const obtenerInstalaciones = async () => {
  try {
    const response = await fetch(`${API_URL}/instalaciones.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener instalaciones:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// =========================
// FUNCIONES DE RESERVAS
// =========================

// Función para obtener todas las reservas (solo para administradores)
export const obtenerTodasReservas = async () => {
  try {
    const response = await fetch(`${API_URL}/reservas.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// Función para obtener las reservas de un usuario
export const obtenerReservasUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`${API_URL}/reservas.php?usuario_id=${usuarioId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener reservas del usuario:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// Función para crear una nueva reserva
export const crearReserva = async (reservaData) => {
  try {
    const response = await fetch(`${API_URL}/reservas.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear reserva:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};

// Función para validar disponibilidad (utiliza el mismo endpoint de creación)
export const validarDisponibilidad = async (nuevaReserva) => {
  try {
    // Esta función no hace un POST real, solo comprueba la respuesta del servidor
    const response = await fetch(`${API_URL}/reservas.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...nuevaReserva,
        validacionSolo: true // Esta bandera le indica al servidor que solo validamos
      }),
    });
    
    const data = await response.json();
    return { disponible: data.success };
  } catch (error) {
    console.error('Error al validar disponibilidad:', error);
    return { disponible: false, error: 'Error en la conexión con el servidor' };
  }
};

// Función para cancelar una reserva
export const cancelarReserva = async (reservaId, usuarioId, esAdmin = false) => {
  try {
    const response = await fetch(`${API_URL}/reservas.php?id=${reservaId}&usuario_id=${usuarioId}&es_admin=${esAdmin}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cancelar reserva:', error);
    return { success: false, error: 'Error en la conexión con el servidor' };
  }
};
