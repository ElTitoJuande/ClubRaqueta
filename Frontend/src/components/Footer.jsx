import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/ClubRaqueta.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-lime-900 to-lime-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap text-left lg:text-left">

          {/* SECCIÓN PRINCIPAL DEL CLUB */}
          <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                alt="Club Raqueta Rute Logo"
                className="h-16 object-contain"
              />
              <h2 className="text-2xl font-bold text-white">Club Raqueta <span className="text-yellow-400">Rute</span></h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Disfruta de las mejores instalaciones de tenis y pádel en un ambiente exclusivo, con entrenadores profesionales y una comunidad apasionada por el deporte.
            </p>
            <div className="mt-6">
              <a href="#" className="inline-flex items-center text-lime-900 bg-yellow-500 hover:bg-yellow-400 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Únete al Club
              </a>
            </div>
          </div>

          {/* ENLACES RÁPIDOS */}
          <div className="w-full lg:w-2/12 px-4 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {['Sobre Nosotros', 'Reservas', 'Eventos y Torneos', 'Hazte Socio'].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === 'Sobre Nosotros' ? '/' : item === 'Reservas' ? '/reservas' : item === 'Eventos y Torneos' ? '/eventos' : '/contacto'}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-2 bg-yellow-400 rounded-full mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HORARIO DE ATENCIÓN */}
          <div className="w-full lg:w-2/12 px-4 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Horario
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></span>
            </h3>
            <div className="space-y-2">
              <p className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                <span>Lunes - Viernes: <br />8:00 AM - 10:00 PM</span>
              </p>
              <p className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">●</span>
                <span>Sábados - Domingos: <br />9:00 AM - 8:00 PM</span>
              </p>
            </div>
          </div>

          {/* SECCIÓN DE CONTACTO */}
          <div className="w-full lg:w-3/12 px-4">
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Contacto
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-yellow-400 rounded-full"></span>
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">📍</span>
                <span>Calle Emilia Pardo Bazán nº8, Granada</span>
              </p>
              <p className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">📞</span>
                <span>+34 958 123 456</span>
              </p>
              <p className="text-gray-300 flex items-start">
                <span className="text-yellow-400 mr-2">✉️</span>
                <span>info@clubraqueta.com</span>
              </p>
            </div>

            <div className="flex space-x-4 mt-6">
              {['facebook', 'instagram', 'twitter'].map((platform, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-lime-700 hover:bg-yellow-500 text-white hover:text-lime-900 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  aria-label={platform}
                >
                  <i className={`fab fa-${platform} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEPARADOR */}
        <hr className="my-8 border-lime-700" />

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div>
            &copy; {new Date().getFullYear()} Club Raqueta Rute. Todos los derechos reservados.
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors mx-2">Política de Privacidad</a>
            <span>|</span>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors mx-2">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;