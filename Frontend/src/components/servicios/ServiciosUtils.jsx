// ServiciosUtils.jsx - Definición de datos para servicios y modales

// Lista de servicios para mostrar en las tarjetas
export const serviciosList = [
  {
    id: 'clases-particulares',
    titulo: "Clases Particulares",
    descripcion: "Entrenamiento personalizado con nuestros profesionales cualificados.",
    imagen: "/src/assets/images/chica-drive.JPG",
    enlace: "/contacto"
  },
  {
    id: 'clases-grupales',
    titulo: "Clases Grupales",
    descripcion: "Aprende y diviértete en grupo con otros jugadores de tu nivel.",
    imagen: "/src/assets/images/clases.JPG",
    enlace: "/contacto"
  },
  {
    id: 'alquiler-pistas',
    titulo: "Alquiler de Pistas",
    descripcion: "Reserva nuestras pistas de tenis de alta calidad.",
    imagen: "/src/assets/images/pista1-2.jpg",
    enlace: "/reservas"
  },
  {
    id: 'torneos',
    titulo: "Torneos",
    descripcion: "Participa en nuestros emocionantes torneos mensuales.",
    imagen: "/src/assets/images/premios.jpg",
    enlace: "/contacto"
  },
  {
    id: 'instalaciones',
    titulo: "Instalaciones",
    descripcion: "Disfruta de nuestras modernas instalaciones deportivas.",
    imagen: "/src/assets/images/panoramica_club.jpg",
    enlace: "/contacto"
  },
  {
    id: 'escuela-tenis',
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

// Contenido de modales (formato Markdown para mayor flexibilidad)
export const modalesList = [
  {
    id: 'clases-particulares',
    titulo: 'Información sobre Clases Particulares',
    icono: '🎾',
    cuerpoMd: `
Entrenamiento individualizado con atención profesional.

**Horarios disponibles:**
* Lunes a Viernes: 9:00 – 13:00 / 17:00 – 21:00
* Sábados: 10:00 – 14:00

**Profesores disponibles:**
* Marta Ruiz – Especialista en técnica individual.
* Pedro Torres – Exjugador profesional, enfoque en competición.
* Ana Beltrán – Preparación física aplicada al tenis.
    `,
    imagenes: ['/src/assets/images/chica-drive.JPG'],
  },
  {
    id: 'clases-grupales',
    titulo: 'Detalles de Clases Grupales',
    icono: '👥',
    cuerpoMd: `
Clases en grupos reducidos por niveles.

**Niveles disponibles:** Iniciación, Intermedio, Competición.

**Horarios:**
* Martes y Jueves: 18:00 – 20:00
* Sábados: 11:00 – 13:00

**Profesores:** Mismo staff que clases particulares, con metodologías adaptadas al grupo.
    `,
    imagenes: ['/src/assets/images/clases.JPG'],
  },
  {
    id: 'alquiler-pistas',
    titulo: 'Alquiler de Pistas & Ventajas para Socios',
    icono: '🏟️',
    cuerpoMd: `
**Tipos de pista:** Tenis (tierra batida, rápida), Pádel (cubiertas e interiores).

**Precio por hora:** 6€ no socios, gratis socios.

**Ventajas de hacerse socio:**
* Precio reducido
* Preferencia de reserva
* Acceso a eventos exclusivos
* Descuentos en la tienda del club
    `,
    imagenes: ['/src/assets/images/pista1-2.jpg'],
    cta: {
      texto: 'Contacta con nosotros',
      url: '/contacto',
      esInterno: false
    }
  },
  {
    id: 'torneos',
    titulo: 'Torneos del Club – ¡Compite y Gana!',
    icono: '🏆',
    cuerpoMd: `
**Participación:** Abierta para socios e invitados.

**Torneos mensuales:** Categorías infantil, juvenil y absoluta.

**Jugadores destacados:**
* Laura Romero – Campeona de Andalucía Sub18.
* David Cruz – Participante en el circuito nacional Sub16.

**Eventos relacionados:** Clínicas, exhibiciones, premios anuales.
    `,
    imagenes: ['/src/assets/images/premios.jpg'],
    cta: {
      texto: 'Ver próximos eventos',
      url: '/eventos',
      esInterno: true
    }
  },
  {
    id: 'instalaciones',
    titulo: 'Conoce Nuestras Instalaciones',
    icono: '🏠',
    cuerpoMd: `
Club situado en plena naturaleza con instalaciones de primer nivel.
    `,
    imagenes: instalacionesImgs,
    maxWidth: 'max-w-3xl',
  },
  {
    id: 'escuela-tenis',
    titulo: 'Escuela de Tenis – Formación para todas las edades',
    icono: '🎓',
    cuerpoMd: `
**Enfoque formativo:** Técnica, táctica y valores del deporte.

**Grupos por edades:** Mini-tenis, infantil, juvenil.
    `,
    imagenes: escuelaImgs,
    maxWidth: 'max-w-2xl',
  },
];
