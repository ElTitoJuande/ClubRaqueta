import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';

// Lista de servicios para mostrar en las tarjetas
export const serviciosList = [
  {
    titulo: "Clases Particulares",
    descripcion: "Entrenamiento personalizado con nuestros profesionales cualificados.",
    imagen: "/src/assets/images/chica-drive.JPG",
    enlace: "/contacto"
  },
  {
    titulo: "Clases Grupales",
    descripcion: "Aprende y diviértete en grupo con otros jugadores de tu nivel.",
    imagen: "/src/assets/images/clases.JPG",
    enlace: "/contacto"
  },
  {
    titulo: "Alquiler de Pistas",
    descripcion: "Reserva nuestras pistas de tenis de alta calidad.",
    imagen: "/src/assets/images/pista1-2.jpg",
    enlace: "/reservas"
  },
  {
    titulo: "Torneos",
    descripcion: "Participa en nuestros emocionantes torneos mensuales.",
    imagen: "/src/assets/images/premios.jpg",
    enlace: "/contacto"
  },
  {
    titulo: "Instalaciones",
    descripcion: "Disfruta de nuestras modernas instalaciones deportivas.",
    imagen: "/src/assets/images/panoramica_club.jpg",
    enlace: "/contacto"
  },
  {
    titulo: "Escuela de Tenis",
    descripcion: "Formación integral para todas las edades y niveles.",
    imagen: "/src/assets/images/niños-premios.JPG",
    enlace: "/contacto"
  }
];

// Imágenes para galerías
export const instalacionesImgs = [
  '/src/assets/images/panoramica_club.jpg',
  '/src/assets/images/pista1-vistas.JPG',
  '/src/assets/images/ClubRaqueta_restaurante.jpeg',
  '/src/assets/images/ClubRaqueta_gimnasio.jpg',
  '/src/assets/images/socios.jpg',
];

export const escuelaImgs = [
  '/src/assets/images/niños-premios.JPG',
  '/src/assets/images/cto-niños-premios.JPG',
  '/src/assets/images/chico-drive2.JPG',
  '/src/assets/images/chica-drive.JPG',
];

// Contenido de modales
export const modalesList = [
  {
    titulo: 'Información sobre Clases Particulares',
    icono: '🎾',
    contenido: (
      <>
        <p className="mb-2">Entrenamiento individualizado con atención profesional.</p>
        <div className="mb-2">
          <strong>Horarios disponibles:</strong>
          <ul className="list-disc ml-6 text-sm">
            <li>Lunes a Viernes: 9:00 – 13:00 / 17:00 – 21:00</li>
            <li>Sábados: 10:00 – 14:00</li>
          </ul>
        </div>
        <div>
          <strong>Profesores disponibles:</strong>
          <ul className="list-disc ml-6 text-sm">
            <li>Marta Ruiz – Especialista en técnica individual.</li>
            <li>Pedro Torres – Exjugador profesional, enfoque en competición.</li>
            <li>Ana Beltrán – Preparación física aplicada al tenis.</li>
          </ul>
        </div>
      </>
    ),
    imagenes: ['/src/assets/images/chica-drive.JPG'],
  },
  {
    titulo: 'Detalles de Clases Grupales',
    icono: '👥',
    contenido: (
      <>
        <p className="mb-2">Clases en grupos reducidos por niveles.</p>
        <div className="mb-2">
          <strong>Niveles disponibles:</strong> Iniciación, Intermedio, Competición.
        </div>
        <div className="mb-2">
          <strong>Horarios:</strong>
          <ul className="list-disc ml-6 text-sm">
            <li>Martes y Jueves: 18:00 – 20:00</li>
            <li>Sábados: 11:00 – 13:00</li>
          </ul>
        </div>
        <div>
          <strong>Profesores:</strong> Mismo staff que clases particulares, con metodologías adaptadas al grupo.
        </div>
      </>
    ),
    imagenes: ['/src/assets/images/clases.JPG'],
  },
  {
    titulo: 'Alquiler de Pistas & Ventajas para Socios',
    icono: '🏟️',
    contenido: (
      <>
        <div className="mb-2">
          <strong>Tipos de pista:</strong> Tenis (tierra batida, rápida), Pádel (cubiertas e interiores).
        </div>
        <div className="mb-2">
          <strong>Precio por hora:</strong> 6€ no socios, gratis socios.
        </div>
        <div className="mb-2">
          <strong>Ventajas de hacerse socio:</strong>
          <ul className="list-disc ml-6 text-sm">
            <li>Precio reducido</li>
            <li>Preferencia de reserva</li>
            <li>Acceso a eventos exclusivos</li>
            <li>Descuentos en la tienda del club</li>
          </ul>
        </div>
      </>
    ),
    imagenes: ['/src/assets/images/pista1-2.jpg'],
    boton: (
      <Button className="bg-yellow-500 text-lime-900 hover:bg-yellow-400 hover:text-lime-600 px-4 py-2 rounded-lg font-semibold" onClick={() => window.location.href = '/contacto'}>
        Contacta con nosotros
      </Button>
    ),
  },
  {
    titulo: 'Torneos del Club – ¡Compite y Gana!',
    icono: '🏆',
    contenido: (
      <>
        <div className="mb-2">
          <strong>Participación:</strong> Abierta para socios e invitados.
        </div>
        <div className="mb-2">
          <strong>Torneos mensuales:</strong> Categorías infantil, juvenil y absoluta.
        </div>
        <div className="mb-2">
          <strong>Jugadores destacados:</strong>
          <ul className="list-disc ml-6 text-sm">
            <li>Laura Romero – Campeona de Andalucía Sub18.</li>
            <li>David Cruz – Participante en el circuito nacional Sub16.</li>
          </ul>
        </div>
        <div>
          <strong>Eventos relacionados:</strong> Clínicas, exhibiciones, premios anuales.
        </div>
      </>
    ),
    imagenes: ['/src/assets/images/premios.jpg'],
    boton: (
      <Link to="/eventos">
        <Button className="bg-yellow-500 text-lime-900 hover:bg-yellow-400 hover:text-lime-600 px-4 py-2 rounded-lg font-semibold">
          Ver próximos eventos
        </Button>
      </Link>
    ),
  },
  {
    titulo: 'Conoce Nuestras Instalaciones',
    icono: '🏠',
    contenido: (
      <>
        <p>Club situado en plena naturaleza con instalaciones de primer nivel.</p>
      </>
    ),
    imagenes: instalacionesImgs,
    maxWidth: 'max-w-3xl',
  },
  {
    titulo: 'Escuela de Tenis – Formación para todas las edades',
    icono: '🎓',
    contenido: (
      <>
        <div className="mb-2">
          <strong>Enfoque formativo:</strong> Técnica, táctica y valores del deporte.
        </div>
        <div>
          <strong>Grupos por edades:</strong> Mini-tenis, infantil, juvenil.
        </div>
      </>
    ),
    imagenes: escuelaImgs,
    maxWidth: 'max-w-2xl',
  },
];
