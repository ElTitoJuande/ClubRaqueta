import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../contexts/AuthContext';
import { agregarReserva, obtenerReservasUsuario } from '../data/db';
import '../styles/reservas.css';

const INSTALACIONES = {
  TENIS: {
    nombre: 'Pistas de Tenis',
    recursos: ['Pista 1', 'Pista 2', 'Pista 3'],
    duracionReserva: 60,
    horaInicio: 9,
    horaFin: 22,
    requiereSocio: true
  },
  PADEL: {
    nombre: 'Pistas de Pádel',
    recursos: ['Pista 1', 'Pista 2'],
    duracionReserva: 60,
    horaInicio: 9,
    horaFin: 22,
    requiereSocio: true
  },
  MULTIDEPORTE: {
    nombre: 'Pista Multideporte',
    recursos: ['Pista Multideporte'],
    duracionReserva: 60,
    horaInicio: 9,
    horaFin: 22,
    requiereSocio: true
  },
  SQUASH: {
    nombre: 'Pista de Squash',
    recursos: ['Pista de Squash'],
    duracionReserva: 60,
    horaInicio: 9,
    horaFin: 22,
    requiereSocio: true
  },
  GIMNASIO: {
    nombre: 'Gimnasio',
    recursos: ['Zona 1', 'Zona 2', 'Zona 3'],
    duracionReserva: 90,
    horaInicio: 7,
    horaFin: 22,
    requiereSocio: true
  },
  RESTAURANTE: {
    nombre: 'Restaurante',
    recursos: Array.from({ length: 30 }, (_, i) => `Mesa ${i + 1}`),
    duracionReserva: 90,
    horaInicio: 13,
    horaFin: 23,
    requiereSocio: false
  },
};

const Reservas = () => {
  const { usuario, puedeReservar } = useAuth();
  const [instalacionSeleccionada, setInstalacionSeleccionada] = useState('TENIS');
  const [semanaActual, setSemanaActual] = useState(startOfWeek(new Date(), { locale: es }));
  const [reservaActual, setReservaActual] = useState(null);
  const [error, setError] = useState('');
  const [misReservas, setMisReservas] = useState([]);

  // Cargar reservas del usuario al montar el componente
  React.useEffect(() => {
    if (usuario) {
      const reservasUsuario = obtenerReservasUsuario(usuario.id);
      setMisReservas(reservasUsuario);
    }
  }, [usuario]);

  const generarHoras = (instalacion) => {
    const horas = [];
    const { horaInicio, horaFin, duracionReserva } = INSTALACIONES[instalacion];
    for (let hora = horaInicio; hora < horaFin; hora++) {
      for (let minuto = 0; minuto < 60; minuto += duracionReserva) {
        horas.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
      }
    }
    return horas;
  };

  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(semanaActual, i));

  const handleReservaClick = (dia, hora, recurso) => {
    if (!usuario) {
      setError('Debes iniciar sesión para hacer una reserva');
      return;
    }

    if (!puedeReservar(instalacionSeleccionada)) {
      setError('No tienes permisos para reservar esta instalación');
      return;
    }

    setReservaActual({
      instalacion: INSTALACIONES[instalacionSeleccionada].nombre,
      recurso,
      fecha: format(dia, 'yyyy-MM-dd'),
      hora,
      usuarioId: usuario.id
    });
  };

  const confirmarReserva = () => {
    const resultado = agregarReserva(reservaActual);
    if (resultado.success) {
      setMisReservas([...misReservas, resultado.reserva]);
      setReservaActual(null);
      setError('');
    } else {
      setError(resultado.error);
    }
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 text-white p-6">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Acceso Requerido</h1>
          <p className="mb-6">Debes iniciar sesión para acceder al sistema de reservas.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-yellow-500 text-lime-900 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 text-white p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sistema de Reservas</h1>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Info del usuario */}
        <div className="mb-6 p-4 bg-white/10 rounded-lg">
          <p className="font-semibold">Usuario: {usuario.nombre}</p>
          <p>Rol: {usuario.rol}</p>
        </div>
        
        {/* Selector de instalación */}
        <div className="mb-8">
          <select
            value={instalacionSeleccionada}
            onChange={(e) => setInstalacionSeleccionada(e.target.value)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white"
          >
            {Object.entries(INSTALACIONES).map(([key, { nombre, requiereSocio }]) => {
              if (!requiereSocio || usuario.rol !== 'INVITADO') {
                return (
                  <option key={key} value={key} className="bg-lime-800">
                    {nombre}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>

        {/* Navegación de semanas */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setSemanaActual(prev => addDays(prev, -7))}
            className="px-4 py-2 bg-yellow-500 text-lime-900 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Semana anterior
          </button>
          <span className="text-xl font-semibold">
            {format(semanaActual, "'Semana del' d 'de' MMMM", { locale: es })}
          </span>
          <button
            onClick={() => setSemanaActual(prev => addDays(prev, 7))}
            className="px-4 py-2 bg-yellow-500 text-lime-900 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Semana siguiente
          </button>
        </div>

        {/* Mis Reservas */}
        {misReservas.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Mis Reservas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {misReservas.map((reserva) => (
                <div key={reserva.id} className="p-4 bg-white/10 rounded-lg">
                  <p className="font-semibold">{reserva.instalacion}</p>
                  <p>{reserva.recurso}</p>
                  <p>Fecha: {format(new Date(reserva.fecha), 'dd/MM/yyyy')}</p>
                  <p>Hora: {reserva.hora}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendario de reservas */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            {/* Cabecera de días */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className="font-semibold p-2">Hora</div>
              {diasSemana.map((dia) => (
                <div key={dia.toString()} className="font-semibold p-2 text-center">
                  {format(dia, 'EEEE d', { locale: es })}
                </div>
              ))}
            </div>

            {/* Cuadrícula de reservas */}
            <div className="space-y-1">
              {generarHoras(instalacionSeleccionada).map((hora) => (
                <div key={hora} className="grid grid-cols-8 gap-2">
                  <div className="p-2 font-medium">{hora}</div>
                  {diasSemana.map((dia) => (
                    <div key={`${dia}-${hora}`} className="grid gap-1">
                      {INSTALACIONES[instalacionSeleccionada].recursos.map((recurso) => (
                        <button
                          key={`${dia}-${hora}-${recurso}`}
                          onClick={() => handleReservaClick(dia, hora, recurso)}
                          disabled={!puedeReservar(instalacionSeleccionada)}
                          className={`p-2 text-sm rounded transition-colors text-center ${
                            puedeReservar(instalacionSeleccionada)
                              ? 'bg-white/10 hover:bg-white/20'
                              : 'bg-white/5 cursor-not-allowed'
                          }`}
                        >
                          {recurso}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de reserva */}
        {reservaActual && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-lime-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Confirmar Reserva</h2>
              <div className="space-y-2 mb-6">
                <p><strong>Instalación:</strong> {reservaActual.instalacion}</p>
                <p><strong>Recurso:</strong> {reservaActual.recurso}</p>
                <p><strong>Fecha:</strong> {format(new Date(reservaActual.fecha), 'dd/MM/yyyy')}</p>
                <p><strong>Hora:</strong> {reservaActual.hora}</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setReservaActual(null)}
                  className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarReserva}
                  className="px-4 py-2 bg-yellow-500 text-lime-900 rounded hover:bg-yellow-400 transition-colors"
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservas;
