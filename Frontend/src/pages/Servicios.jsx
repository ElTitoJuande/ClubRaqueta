import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/animations.css';

const Servicios = () => {
  const servicios = [
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

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className='relative min-h-[60vh] bg-gradient-to-br from-lime-800 via-lime-700 to-lime-900 overflow-hidden'>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-lime-300 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        {/* Tennis ball pattern overlay */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: 'url("/images/pattern.png")',
               backgroundSize: '200px',
               backgroundRepeat: 'repeat'
             }}>
        </div>

        <div className='relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full py-20'>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-[fadeIn_1s_ease-out_forwards]">
              Nuestros <span className="text-yellow-400">Servicios</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto animate-[fadeIn_1s_ease-out_0.3s_forwards]">
              Descubre todo lo que Club Raqueta Rute tiene para ofrecerte. 
              Desde clases personalizadas hasta torneos emocionantes, 
              tenemos todo lo que necesitas para mejorar tu juego.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className='py-16 bg-gradient-to-b from-lime-900 to-lime-800'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {servicios.map((servicio, index) => (
              <Link to={servicio.enlace} key={index} className="group">
                <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl transition-all hover:bg-white/20 hover:shadow-xl hover:scale-105 duration-300 border border-white/20">
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                    <img 
                      src={servicio.imagen} 
                      alt={servicio.titulo}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{servicio.titulo}</h3>
                  <p className="text-white/80 mb-4">{servicio.descripcion}</p>
                  <div className="flex items-center text-yellow-400">
                    <span className="mr-2">Saber más</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-b from-lime-800 to-lime-900'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y comienza a disfrutar de todos nuestros servicios premium.
          </p>
          <Link to="/contacto">
            <Button className="bg-yellow-500 text-lime-900 hover:bg-yellow-400 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all">
              Contacta con nosotros
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Servicios;
