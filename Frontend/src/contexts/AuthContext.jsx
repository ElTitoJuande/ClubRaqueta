import React, { createContext, useState, useContext } from 'react';
import { usuarios, ROLES } from '../data/db';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const savedUser = localStorage.getItem('clubRaquetaUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const login = (email, password) => {
    const user = usuarios.find(u => u.email === email && u.password === password);
    if (user) {
      setUsuario(user);
      localStorage.setItem('clubRaquetaUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Credenciales inválidas' };
  };
  
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('clubRaquetaUser');
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
    roles: ROLES
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
