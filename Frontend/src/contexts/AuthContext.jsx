import React, { createContext, useState, useContext } from 'react';
import { loginUsuario, guardarUsuario, obtenerUsuario, cerrarSesion, actualizarPerfil } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    return obtenerUsuario();
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = async (email, password) => {
    setIsLoading(true);
    setError('');
    
    try {
      const userData = await loginUsuario(email, password);
      setUsuario(userData);
      guardarUsuario(userData);
      setIsLoading(false);
      console.log('Login exitoso:', userData);
      return { success: true, user: userData };
    } catch (err) {
      setIsLoading(false);
      setError(err.error || 'Error al iniciar sesión');
      console.error('Error de login:', err);
      return { success: false, error: err.error || 'Error al iniciar sesión' };
    }
  };
  
  const logout = () => {
    setUsuario(null);
    cerrarSesion();
  };

  const puedeReservar = (instalacion) => {
    if (!usuario) return false;
    
    if (usuario.rol === 'ADMIN') return true;
    if (usuario.rol === 'SOCIO') return true;
    if (usuario.rol === 'INVITADO' && instalacion === 'RESTAURANTE') return true;
    
    return false;
  };

  const actualizarUsuario = async (datosUsuario) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Asegurar que el ID del usuario está incluido en los datos
      const datosCompletos = { ...datosUsuario, id: usuario.id };
      console.log('Enviando datos para actualizar:', datosCompletos);
      
      const response = await actualizarPerfil(datosCompletos);
      console.log('Respuesta completa de actualizarPerfil:', response);
      
      if (response && response.success) {
        // Actualizar el estado del usuario y guardarlo en localStorage
        // Usar los datos devueltos por el servidor o los datos enviados si no hay datos devueltos
        const usuarioActualizado = { 
          ...usuario, 
          ...datosUsuario,
          // Si hay datos de usuario en la respuesta, usarlos también
          ...(response.usuario ? response.usuario : {})
        };
        
        console.log('Usuario actualizado:', usuarioActualizado);
        setUsuario(usuarioActualizado);
        guardarUsuario(usuarioActualizado);
        setIsLoading(false);
        return { success: true, message: 'Perfil actualizado correctamente' };
      } else {
        setIsLoading(false);
        const mensajeError = response && response.error ? response.error : 'Error al actualizar el perfil';
        setError(mensajeError);
        console.error('Error en la respuesta:', response);
        return { success: false, message: mensajeError };
      }
    } catch (err) {
      setIsLoading(false);
      const mensajeError = err && err.error ? err.error : 'Error al actualizar el perfil';
      setError(mensajeError);
      console.error('Error completo al actualizar perfil:', err);
      return { success: false, message: mensajeError };
    }
  };

  const value = {
    usuario,
    login,
    logout,
    actualizarUsuario,
    puedeReservar,
    isLoading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
