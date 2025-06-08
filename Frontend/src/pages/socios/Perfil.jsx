import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const { usuario, actualizarUsuario } = useAuth();
  const [formData, setFormData] = useState({
    nombre: usuario.nombre || '',
    email: usuario.email || '',
    telefono: usuario.telefono || '',
    dni: usuario.dni || ''
  });

  console.log('Usuario actual:', usuario);
  console.log('DNI en usuario:', usuario?.dni);
  console.log('FormData inicial:', formData);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await actualizarUsuario(formData);
      if (response.success) {
        setSuccess('Perfil actualizado correctamente');
      } else {
        setError(response.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      setError('Error al actualizar el perfil');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mt-20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Mi Perfil</h1>
            <div className="bg-yellow-500/20 px-4 py-2 rounded-lg">
              <span className="text-white font-medium">ID de Socio: </span>
              <span className="text-white font-bold">{usuario.id}</span>
            </div>
          </div>

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-white mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                required
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-white mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label htmlFor="dni" className="block text-white mb-2">
                DNI
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-yellow-500"
                placeholder="Ejemplo: 12345678X"
              />
            </div>



            <button
              type="submit"
              className="w-full bg-yellow-500 text-lime-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Actualizar Perfil
            </button>
          </form>

          <div className="mt-8">
            <Link
              to="/socios/dashboard"
              className="w-full bg-yellow-500 text-lime-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;