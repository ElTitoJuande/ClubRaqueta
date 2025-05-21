import React, { createContext, useState, useContext } from 'react';
import { loginUsuario, guardarUsuario, obtenerUsuario, cerrarSesion } from '../services/api';

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

  const value = {
    usuario,
    login,
    logout,
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
