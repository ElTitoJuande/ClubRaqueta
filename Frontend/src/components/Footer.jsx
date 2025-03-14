import React from "react";
import Image from "./Image"; // Asegúrate de que este componente esté correctamente importado

const Footer = () => {
  return (
    <footer className="relative bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          
          {/* 🔥 SECCIÓN PRINCIPAL DEL CLUB */}
          <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative h-12 w-12">
                <Image 
                  alt="Club Raqueta Rute Logo" 
                  src="/images/logo-club.png" 
                  className="object-contain"
                  fill
                />
              </div>
              <span className="text-2xl font-bold text-green-700">Club Raqueta Rute</span>
            </div>
            <p className="text-gray-600">
              Disfruta de las mejores instalaciones de tenis y pádel en un ambiente exclusivo, con entrenadores profesionales y una comunidad apasionada por el deporte.
            </p>
            <div className="mt-6">
              <a href="#" className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 font-semibold px-6 py-3 rounded-lg transition">
                Únete al Club
              </a>
            </div>
          </div>

          {/* 📌 ENLACES RÁPIDOS */}
          <div className="w-full lg:w-2/12 px-4 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-700">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-700">Reservas</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-700">Eventos y Torneos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-700">Hazte Socio</a></li>
            </ul>
          </div>

          {/* 📌 HORARIO DE ATENCIÓN */}
          <div className="w-full lg:w-2/12 px-4 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Horario</h3>
            <p className="text-gray-600">Lunes - Viernes: 8:00 AM - 10:00 PM</p>
            <p className="text-gray-600">Sábados - Domingos: 9:00 AM - 8:00 PM</p>
          </div>

          {/* 📌 SECCIÓN DE CONTACTO */}
          <div className="w-full lg:w-3/12 px-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
            <p className="text-gray-600">📍 Calle Emilia Pardo Bazán nº8, Granada</p>
            <p className="text-gray-600">📞 +34 958 123 456</p>
            <p className="text-gray-600">✉️ info@clubraqueta.com</p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-gray-500 hover:text-green-700">
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-700">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>

        </div>

        {/* 📌 SEPARADOR */}
        <hr className="my-6 border-gray-300" />

        {/* 📌 COPYRIGHT */}
        <div className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Club Raqueta Rute. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
