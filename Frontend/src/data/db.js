// Simulación de base de datos
export const usuarios = [
  {
    id: 1,
    nombre: 'Administrador',
    email: 'admin@clubraqueta.com',
    password: 'admin123', // En una aplicación real, esto estaría hasheado
    rol: 'ADMIN',
    telefono: '666777888'
  },
  {
    id: 2,
    nombre: 'Juan Pérez',
    email: 'juan@email.com',
    password: 'socio123',
    rol: 'SOCIO',
    numeroSocio: 'S001',
    telefono: '666111222'
  },
  {
    id: 3,
    nombre: 'Invitado',
    email: 'invitado@clubraqueta.com',
    password: 'invitado123',
    rol: 'INVITADO',
    telefono: '666333444'
  }
];

// Roles y sus permisos
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

// Función para validar si una reserva está disponible
export const validarDisponibilidad = (nuevaReserva) => {
  return !reservas.some(reserva => 
    reserva.fecha === nuevaReserva.fecha &&
    reserva.hora === nuevaReserva.hora &&
    reserva.recurso === nuevaReserva.recurso &&
    reserva.instalacion === nuevaReserva.instalacion
  );
};

// Función para obtener las reservas de un usuario
export const obtenerReservasUsuario = (usuarioId) => {
  return reservas.filter(reserva => reserva.usuarioId === usuarioId);
};

// Función para cancelar una reserva
export const cancelarReserva = (reservaId, usuarioId, esAdmin = false) => {
  const index = reservas.findIndex(r => r.id === reservaId);
  if (index === -1) return { success: false, error: 'Reserva no encontrada' };
  
  if (!esAdmin && reservas[index].usuarioId !== usuarioId) {
    return { success: false, error: 'No tienes permiso para cancelar esta reserva' };
  }
  
  reservas.splice(index, 1);
  return { success: true };
};

// Función para registrar un nuevo usuario
export const registrarUsuario = (userData) => {
  const existeEmail = usuarios.some(u => u.email === userData.email);
  if (existeEmail) {
    return { success: false, error: 'El email ya está registrado' };
  }

  const nuevoUsuario = {
    id: usuarios.length + 1,
    ...userData,
    rol: userData.rol || 'INVITADO',
    fechaRegistro: new Date().toISOString()
  };
  
  usuarios.push(nuevoUsuario);
  return { success: true, usuario: nuevoUsuario };
};
