import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usuarios, registrarUsuario } from '../../data/db';

const GestionSocios = () => {
  const { usuario } = useAuth();
  const [listaSocios, setListaSocios] = useState(usuarios);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'SOCIO',
    telefono: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const resultado = registrarUsuario(formData);
    if (resultado.success) {
      setListaSocios([...listaSocios, resultado.usuario]);
      setFormData({
        nombre: '',
        email: '',
        password: '',
        rol: 'SOCIO',
        telefono: ''
      });
      setSuccess('Usuario registrado correctamente');
    } else {
      setError(resultado.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Gestión de Socios</h1>
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 bg-lime-900 hover:bg-lime-800 text-yellow-500 rounded-lg transition-colors"
          >
            Volver al Dashboard
          </Link>
        </div>

        {/* Formulario para agregar nuevo socio */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Agregar Nuevo Usuario</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-white p-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-white mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">
                Rol
              </label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
              >
                <option value="SOCIO">Socio</option>
                <option value="INVITADO">Invitado</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-lime-900 rounded-lg hover:bg-yellow-400 transition-colors w-full"
              >
                Agregar Usuario
              </button>
            </div>
          </form>
        </div>

        {/* Lista de socios */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Usuarios Registrados</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-4 py-2 text-white">ID</th>
                  <th className="px-4 py-2 text-white">Nombre</th>
                  <th className="px-4 py-2 text-white">Email</th>
                  <th className="px-4 py-2 text-white">Rol</th>
                  <th className="px-4 py-2 text-white">Teléfono</th>
                  <th className="px-4 py-2 text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {listaSocios.map(socio => (
                  <tr key={socio.id} className="hover:bg-white/10">
                    <td className="px-4 py-2 text-white">{socio.id}</td>
                    <td className="px-4 py-2 text-white">{socio.nombre}</td>
                    <td className="px-4 py-2 text-white">{socio.email}</td>
                    <td className="px-4 py-2 text-white">{socio.rol}</td>
                    <td className="px-4 py-2 text-white">{socio.telefono}</td>
                    <td className="px-4 py-2">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400 mr-2">
                        Editar
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionSocios;